import Vue from 'vue'
import Vuex from 'vuex'
import content from "@/store/modules/content";
import params from "@/store/modules/params";
import chat from "@/store/modules/chat";
import auth from "@/store/modules/auth";
import notifications from "@/store/modules/notifications";

Vue.use(Vuex)

export default new Vuex.Store({
        strict: process.env.NODE_ENV === 'development',
        state: {
            timeZoneOffset: -new Date().getTimezoneOffset() / 60
        },
        mutations: {
            setToken(state, val) {
                state.token = val
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
            },
            setConnected(state, val) {
                state.connected = val
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
            notifications,
            auth
        }
    },
)
