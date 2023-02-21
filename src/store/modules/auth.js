import {
    CLEAR_AUTH_DATA, SET_AUTH_DATA,
    SET_EMAIL,
    SET_ID,
    SET_SESSION_REFRESHING,
    SET_ROLE,
    SET_SESSION_END,
    SET_TOKEN
} from "@/store/mutation-types";

export default {
    state: () => ({
        token: localStorage.getItem('token'),
        sessionEnd: 0,
        sessionRefreshing: false,
        email: localStorage.getItem('email'),
        id: localStorage.getItem('id'),
        role: localStorage.getItem('role'),
        name: localStorage.getItem('name'),
        surname: localStorage.getItem('surname')
    }),
    getters: {
        isLogin: state => !!state.token,
        isSessionRefreshing: state => state.sessionRefreshing,
        getRole: state => state.role,
        getId: state => state.id,
        getEmail: state => state.email,
        getToken: state => state.token,
        isSessionActive: (state, getters) => !!state.sessionEnd && state.sessionEnd > getters.getCurrentTime,
        getName: state => state.name,
        getSurname: state => state.surname,
        getFullName: state => `${state.name} ${state.surname}`,
    },
    mutations: {
        [SET_SESSION_END](state, v) {
            state.sessionEnd = v
        },
        [SET_SESSION_REFRESHING](state, v) {
            state.sessionRefreshing = v
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
}