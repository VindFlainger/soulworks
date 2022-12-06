import Vue from 'vue'
import Vuex from 'vuex'
import content from "@/store/content";
import params from "@/store/params";
import chat from "@/store/chat";

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
            loading: 0,
            width: 0,
            token: null,
            email: null,
            role: null,
            id: null,
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
            },
            setId(state, val) {
                state.id = val
                localStorage.setItem('id', val)
            }
        },
        actions: {
            setAuthData({state}) {
                const email = localStorage.getItem('email')
                const token = localStorage.getItem('token')
                const role = localStorage.getItem('role')
                const id = localStorage.getItem('id')
                state.email = email
                state.token = token
                state.role = role
                state.id = id
            },
        },
        modules: {
            content,
            params,
            chat,
        }
    },
)
