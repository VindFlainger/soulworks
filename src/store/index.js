import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
            loading: 0,
            width: 0,
            alerts: [{title: '', text: '', type: '', id: -1}], // don't even think about deleting this
            auth: false
        },
        getters: {
            mobile(state) {
                return state.width < 1264
            },
            token() {
                return localStorage.getItem('token')
            },
            email() {
                return localStorage.getItem('email')
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
                localStorage.setItem('token', val)
            },
            setEmail(state, val) {
                localStorage.setItem('email', val)
            },
            setAuth(state, val){
                state.auth = val
            }
        },
        actions: {
            addAlert({state}, val) {
                val.id = Date.now() // Not increasing by length (:v-for transition)
                state.alerts = [...state.alerts, val]

                setTimeout(() => {
                    state.alerts = state.alerts.filter(alert => alert.id !== val.id)
                }, val.time)
            }
        },
    },
)
