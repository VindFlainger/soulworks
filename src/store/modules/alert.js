import {REMOVE_ALERT, ADD_ALERT, SET_MUTE, REMOVE_MUTE} from "@/store/mutation-types";
import {addAlert, startAlertRemoving, stopAlertRemoving} from "@/store/action-types";

export default {
    state: {
        mute: Number.parseInt(localStorage.getItem('mute')) || 0,
        alerts: []
    },
    getters: {
        getAlerts: state => state.alerts,
        isMute: state => Date.now() < state.mute
    },
    mutations: {
        [REMOVE_ALERT](state, id) {
            state.alerts = state.alerts.filter(el => el.id !== id)
        },
        [ADD_ALERT](state, alert) {
            state.alerts.push(alert)
        },
        [SET_MUTE](state, time) {
            state.mute = Date.now() + time
            localStorage.setItem('mute', state.mute)
        },
        [REMOVE_MUTE](state) {
            state.mute = 0
            localStorage.removeItem('mute')
        }
    },
    actions: {
        [addAlert]({commit, getters}, {content, time = 5000, type = 'request', ignoreMute = false}) {
            if (getters.isMute && !ignoreMute) return 0

            const id = setTimeout(() => {
                commit(REMOVE_ALERT, id)
            }, time)

            commit(ADD_ALERT, {
                type,
                id,
                content
            })

            return id
        },
        // you can't call this function on explicitly started alert (no result)
        [stopAlertRemoving](context, alertId) {
            clearTimeout(alertId)
        },
        [startAlertRemoving]({commit}, {alertId, time = 2000}) {
            setTimeout(() => {
                commit(REMOVE_ALERT, alertId)
            }, time)
        },
    }
}