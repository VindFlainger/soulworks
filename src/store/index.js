import Vue from 'vue'
import Vuex from 'vuex'
import content from "@/store/content";
import params from "@/store/params";

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
            loading: 0,
            width: 0,
            alerts: [{title: '', text: '', type: '', id: -1}], // don't even think about deleting this
            token: null,
            email: null,
            role: null,
            sessionEnd: 0
        },
        getters: {
            mobile(state) {
                return state.width < 1264
            },
            isLogin(state) {
                return !!(state.token && state.email)
            }
        },
        mutations: {
            setLoading(state, val) {
                state.loading += val
            },
            setWidth(state, val) {
                state.width = val
            },
            setToken(state, val) {
                state.token = val
                console.log('here')
                localStorage.setItem('token', val)
            },
            setEmail(state, val) {
                state.email = val
                localStorage.setItem('email', val)
            },
            setRole(state, val) {
                state.role = val
                localStorage.setItem('role', val)
            }
        },
        actions: {
            addAlert({state}, val) {
                val.id = Date.now() // Not increasing by length (:v-for transition)
                state.alerts = [...state.alerts, val]

                setTimeout(() => {
                    state.alerts = state.alerts.filter(alert => alert.id !== val.id)
                }, val.time)
            },
            setAuthData({state}) {
                const email = localStorage.getItem('email')
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')

                state.email = email
                state.token = token
                state.role = role
            }
        },
        modules: {
            content: content,
            params: params
        }
    },
)
