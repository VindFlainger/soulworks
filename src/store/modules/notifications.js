import {default as axios} from "axios";

export default {
    namespaced: true,
    state: {
        notifications: [],
        displayingNotifications: [],
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
        getDisplayingNotifications: state => state.displayingNotifications
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
        APPEND_DISPLAYING_NOTIFICATION(state, notification) {
            state.displayingNotifications.push(notification)
        },
        REMOVE_DISPLAYING_NOTIFICATION(state, notificationId) {
            state.displayingNotifications = state.displayingNotifications.filter(el => el.id !== notificationId)
        }
    },
    actions: {
        getAuthedContent: {
            root: true,
            handler({commit, dispatch}) {
                axios.get('http://localhost:3000/any/notifications/getNewCount')
                    .then(resp => {
                        commit('SET_NEW_COUNT', resp.data)
                    })
                    .catch()
                dispatch('loadNotifications')
            },
        },
        loadNotifications({commit, getters}) {
            return new Promise((resolve, reject) => {
                if (getters.isLoading) return reject(false)

                commit('SET_LOADING', true)

                axios.get('http://localhost:3000/any/notifications/getNotifications', {
                    params: {
                        limit: getters.getLimit,
                        offset: getters.getNotificationsCount
                    }
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
            return axios.post('http://localhost:3000/any/notifications/setReadState', {
                notificationId
            })
                .then(commit('SET_NOTIFICATION_READ', notificationId))
        },
        addNewNotification({commit}, notification) {
            commit('PREPEND_NOTIFICATIONS', [notification])
            commit('APPEND_DISPLAYING_NOTIFICATION', notification)
            setTimeout(() => {
                    commit('REMOVE_DISPLAYING_NOTIFICATION', notification.id)
                }
                , 4000
            )
        }
    }
}