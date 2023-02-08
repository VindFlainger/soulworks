const axios = require('axios').default
import {
    CLEAR_AUTH_DATA, SET_AUTH_DATA,
    SET_EMAIL,
    SET_ID,
    SET_REFRESHING_SESSION,
    SET_ROLE,
    SET_SESSION_END,
    SET_TOKEN
} from "@/store/mutation-types";


export const notAllowedTokenError = new Error('token is not allowed')
export const sessionError = new Error('impossible to create session')


export default {
    state: () => ({
        token: localStorage.getItem('token'),
        sessionEnd: 0,
        refreshingSession: false,
        email: localStorage.getItem('email'),
        id: localStorage.getItem('id'),
        role: localStorage.getItem('role'),
        name: localStorage.getItem('name'),
        surname: localStorage.getItem('surname')
    }),
    getters: {
        isLogin: state => !!state.token,
        getRole: state => state.role,
        getId: state => state.id,
        getEmail: state => state.email,
        isSessionActive: state => !!state.sessionEnd && state.sessionEnd > Date.now(),
        getName: state => state.name,
        getSurname: state => state.surname,
        getFullName: state => `${state.name} ${state.surname}`,
    },
    mutations: {
        [SET_SESSION_END](state, v) {
            state.sessionEnd = v
        },
        [SET_REFRESHING_SESSION](state, v) {
            state.refreshingSession = v
        },
        [SET_TOKEN](state, v) {
            state.token = v
            localStorage.setItem('token', v)
        },
        [SET_EMAIL](state, v) {
            state.email = v
            localStorage.setItem('email', v)
        },
        [SET_ID](state, v) {
            state.id = v
            localStorage.setItem('id', v)
        },
        [SET_ROLE](state, v) {
            state.role = v
            localStorage.setItem('role', v)
        },
        [CLEAR_AUTH_DATA](state) {
            state.id = null
            state.token = null
            state.email = null
            state.role = null
            state.name = null
            state.surname = null
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('email')
            localStorage.removeItem('role')
            localStorage.removeItem('name')
            localStorage.removeItem('surname')
        },
        [SET_AUTH_DATA](state, {token, id, email, role, name, surname}) {
            state.token = token
            state.id = id
            state.email = email
            state.role = role
            state.name = name
            state.surname = surname
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            localStorage.setItem('email', email)
            localStorage.setItem('role', role)
            localStorage.setItem('name', name)
            localStorage.setItem('surname', surname)
        }
    },
    actions: {
        refreshSession({state, commit}) {
            commit('SET_REFRESHING_SESSION', true)
            return axios.post(`${process.env.VUE_APP_API_URL}/auth/session`, {
                token: state.token,
            })
                .then(() => {
                    commit('SET_SESSION_END', Date.now() + 1000 * 60 * (5 * 0.8))
                })
                .catch(err => {
                    if (err.response.data.code === 104) throw notAllowedTokenError
                    throw err
                })
                .finally(() => commit('SET_REFRESHING_SESSION', false))
        },
        authInterceptor({state, getters, dispatch}) {
            return new Promise((resolve, reject) => {
                if (getters.isSessionActive) resolve()
                else {
                    if (state.refreshingSession) {
                        const callback = () => {
                            if (!state.refreshingSession) {
                                getters.isSessionActive ? resolve() : reject(sessionError)
                            } else {
                                setTimeout(callback, 100)
                            }
                        }
                        setTimeout(callback, 100)
                    } else resolve(dispatch('refreshSession'))
                }
            })
        },
    }
}