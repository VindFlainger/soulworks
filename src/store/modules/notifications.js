import {axiosPipeline} from "../../../utils/axiosMiddlaware";

export default {
    namespaced: true,
    state: {
        notifications: [],
        newNotificationCount: 0,
        limit: 4,
        loading: false,
        lastLoaded: false
    },
    getters: {
        getNotifications: state => state.notifications,
        getLimit: state => state.limit,
        getNotificationsCount: state => state.notifications.length,
        getNewNotificationsCount: state => state.newNotificationCount,
        isLoading: state => state.loading,
        isLastLoaded: state => state.lastLoaded,
    },
    mutations: {
        APPEND_NOTIFICATIONS(state, notifications) {
            // protection from sequence failure connected with socket notifications

            const unic = notifications.filter(ntf => state.notifications.every($ntf => $ntf._id !== ntf._id))
            state.notifications.push(...unic)
            if (notifications.length < state.limit) state.lastLoaded = true
        },
        PREPEND_NOTIFICATIONS(state, notifications) {
            state.notifications.unshift(...notifications)
            state.newNotificationCount += notifications.length
        },
        SET_NEW_COUNT(state, count) {
            state.newNotificationCount = count
        },
        SET_LOADING(state, v) {
            state.loading = v
        },
        SET_NOTIFICATION_READ(state, notificationId) {
            const ntf = state.notifications.find(ntf => ntf._id === notificationId)
            if (ntf) {
                state.newNotificationCount--
                ntf.read = true
            }
        },
    },
    actions: {
        getAuthedContent: {
            root: true,
            handler({commit, dispatch}) {
                axiosPipeline.get('http://localhost:3000/any/notifications/getNewCount', {needAuth: true})
                    .then(resp => {
                        commit('SET_NEW_COUNT', resp.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                dispatch('loadNotifications')
            },
        },
        loadNotifications({commit, getters}) {
            return new Promise((resolve, reject) => {
                if (getters.isLoading) return reject(false)

                commit('SET_LOADING', true)

                axiosPipeline.get('http://localhost:3000/any/notifications/getNotifications', {
                    params: {
                        limit: getters.getLimit,
                        offset: getters.getNotificationsCount
                    },
                    needAuth: true
                })
                    .then(resp => {
                        commit('APPEND_NOTIFICATIONS', resp.data)
                        resolve()
                    })
                    .catch(err => reject(err))
                    .finally(commit('SET_LOADING', false))
            })
        },
        setNotificationRead({commit}, notificationId) {
            return axiosPipeline.post('http://localhost:3000/any/notifications/setReadState', {
                notificationId
            }, {needAuth: true})
                .then(commit('SET_NOTIFICATION_READ', notificationId))
        },
        addNewNotification({commit, dispatch}, notification) {
            commit('PREPEND_NOTIFICATIONS', [notification])
            dispatch('addAlert', {content: notification, type: 'notification'}, {root: true})
        }
    }
}