import store from "@/store";
import {CLEAR_AUTH_DATA, SET_SESSION_END, SET_SESSION_REFRESHING} from "@/store/mutation-types";
import {addAlert} from "@/store/action-types";
import vm from '@/main'

const axios = require('axios')

export const axiosPipeline = axios.create({
    // TODO: ONLY FOR DEV
    withCredentials: true,
    baseURL: 'http://localhost:3000'
})

export const axiosBase = axios.create({
    // TODO: ONLY FOR DEV
    withCredentials: true,
    baseURL: 'http://localhost:3000'
})

axiosPipeline.interceptors.request.use(async cfg => {
    return new Promise((resolve, reject) => {
        if (cfg.needAuth && !store.getters.isSessionActive) {
            if (store.getters.isSessionRefreshing) {
                const callback = () => {
                    if (!store.getters.isSessionRefreshing) {
                        if (store.getters.isSessionActive) resolve(cfg)
                        else reject()
                    } else {
                        setTimeout(callback, 100)
                    }
                }
                setTimeout(callback, 100)
            } else {
                store.commit(SET_SESSION_REFRESHING, true)

                axiosBase.post('auth/session', {
                    token: store.getters.getToken,
                })
                    .then(() => {
                        store.commit(SET_SESSION_END, Date.now() + 1000 * 60 * (5 * 0.8))
                        resolve(cfg)
                    })
                    .catch(err => reject(err))
                    .finally(() => store.commit(SET_SESSION_REFRESHING, false))
            }
        } else {
            resolve(cfg)
        }
    })
        .catch((err) => {
            if (err?.response) {
                if (err.response.data.code === 104) {
                    store.commit(CLEAR_AUTH_DATA)
                    if (!vm.$route.query.redirect) vm.$router.push({
                        name: 'home',
                        query: {redirect: vm.$route.fullPath}
                    })
                } else {
                    store.dispatch(addAlert, {
                        type: 'request',
                        ignoreMute: true,
                        content: {
                            type: 'error',
                            error: {
                                code: err.response.data.code,
                                message: err.response.data.message
                            }
                        }
                    })
                }
            }
        })
})


