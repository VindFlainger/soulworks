import {assign, Machine} from "xstate";
import {useMachine} from "xstate-vue2";

const machine = new Machine({
    id: 'content',
    initial: 'waiting',
    context: {
        retries: 0
    },
    states: {
        waiting: {
            on: {
                CONTENT_FETCH: 'fetching'
            }
        },
        fetching: {
            on: {
                CONTENT_RESOLVE: 'resolved',
                CONTENT_LOADED: 'loaded',
                CONTENT_REJECT: [
                    {
                        target: 'rejected',
                        cond: context => context.retries < 5
                    },
                    {
                        target: 'unavailable'
                    }
                ]
            }
        },
        rejected: {
            exit: assign(context => context.retries++),
            after: {
                3000: 'waiting',
            },
        },
        resolved: {
            on: {
                CONTENT_FETCH: 'fetching',
            },
            entry: assign(context => context.retries = 0)
        },
        unavailable: {
            entry: assign(context => context.retries = 0),
            on: {
                CONTENT_FETCH: 'fetching',
            }
        },
        loaded: {
            type: "final"
        }
    }
})

export default {
    setup() {
        const {state, send} = useMachine(machine)
        return {state, send}
    }
}