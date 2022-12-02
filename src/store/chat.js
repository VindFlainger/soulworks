const axios = require('axios').default
axios.defaults.withCredentials = true
import Vue from 'vue'
import socket from "../sockets/index";

export default {
    state: {
        chats: {}, newMessagesCount: 0, limit: 30 // only even variables!!!
    }, mutations: {
        incNewMessagesCount(state, val) {
            state.newMessagesCount += val ?? 1
        },
        decNewMessagesCount(state, val) {
            state.newMessagesCount -= val ?? 1
        },
        createChatIfNotExists(state, userId) {
            if (!state.chats[userId]) {
                Vue.set(state.chats, userId, {
                    historyMessages: [],
                    firstHistoryMessagesOffset: null,
                    lastHistoryMessagesOffset: null,
                    viewedOffset: null, // for marking MY messages read by SMB (used for performance to prevent getting read flags)
                    newMessages: [],    // storage for new messages received by sockets
                    firstNewOffset: null, // first  received by sockets message offset
                    loadingMessages: [], // temporary storage for sent by not confirmed messages
                    newMessagesCount: 0,
                })
            }
        },
        addUserNewMessage(state, [userId, message]) {
            if (state.chats[userId].firstNewOffset === null) {
                state.chats[userId].firstNewOffset = message.offset
            }
            state.chats[userId].newMessages.push(message)
            state.chats[userId].newMessagesCount++
        },
        addMyNewMessage(state, [userId, message]) {
            if (state.chats[userId].firstNewOffset === null) {
                state.chats[userId].firstNewOffset = message.offset
            }
            state.chats[userId].newMessages.push(message)
        },
        prependHistoryMessages(state, [userId, messages]) {
            if (messages.length) {
                state.chats[userId].firstHistoryMessagesOffset = messages[0].offset
                state.chats[userId].historyMessages.unshift(...messages)
            }
        },
        appendHistoryMessages(state, [userId, messages, resetRO]) {
            if (messages.length) {
                state.chats[userId].lastHistoryMessagesOffset = messages[messages.length - 1].offset
                state.chats[userId].historyMessages.push(...messages)

                if (resetRO) {
                    socket.emit('message:read', userId, state.chats[userId].lastHistoryMessagesOffset)
                }
            }
        },
        addHistoryMessages(state, [userId, messages]) {
            if (messages.length) {
                state.chats[userId].firstHistoryMessagesOffset = messages[0].offset
                state.chats[userId].lastHistoryMessagesOffset = messages[messages.length - 1].offset
                state.chats[userId].historyMessages.push(...messages)
            }
        },
        setViewedOffset(state, [userId, viewedOffset]) {
            state.chats[userId].viewedOffset = viewedOffset
        },
        appendLoadingMessage(state, [userId, message]) {
            state.chats[userId].loadingMessages.push(message)
        },
        delLoadingMessage(state, [userId, tmpId]) {
            state.chats[userId].loadingMessages = state.chats[userId].loadingMessages.filter(msg => msg.tmpId !== tmpId)
        }
    },
    actions: {
        getAuthedContent({commit}) {
            axios.get('http://localhost:3000/any/chats/allNewMessagesCount')
                .then(resp => {
                    commit('incNewMessagesCount', resp.data)
                })
        },
        addNewMessage({state, commit, rootState}, message) {
            const userId = message.to === rootState.id ? message.from : message.to
            const isMy = rootState.id === message.from
            commit('createChatIfNotExists', userId)

            if (!isMy) {
                commit('incNewMessagesCount')
                commit('addUserNewMessage', [message.from, message])
            } else {
                commit('addMyNewMessage', [message.to, message])
            }

            if (state.chats[userId].lastHistoryMessagesOffset < message.offset) {
                commit('appendHistoryMessages', [userId, [message], !isMy])
            }
        },
        addLoadingMessage({commit}, message) {
            const userId = message.to
            commit('createChatIfNotExists', userId)
            commit('appendLoadingMessage', [userId, message])
        },
        delLoadingMessage({commit}, message) {
            const userId = message.to
            commit('delLoadingMessage', [userId, message.tmpId])
        },
        // must be called only after loadHistory (init function)
        loadPreviousHistoryMessages({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                if (!state.chats[userId].historyMessages.length) return resolve()

                const historyOffset = state.chats[userId].firstHistoryMessagesOffset
                const limit = historyOffset - state.limit < 0 ? historyOffset : state.limit
                const offset = historyOffset - state.limit < 0 ? 0 : historyOffset - state.limit
                if (limit)
                    axios.get(`http://localhost:3000/any/chats/messages`, {
                        params: {
                            userId,
                            offset,
                            limit
                        }
                    })
                        .then(resp => {
                            commit('prependHistoryMessages', [userId, resp.data])
                            resolve()
                        })
                        .catch(err => reject(err))
                else resolve()
            })
        },
        // must be called only after loadHistory (init function)
        loadNextHistoryMessages({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                const newOffset = state.chats[userId].firstNewOffset
                const historyOffset = state.chats[userId].lastHistoryMessagesOffset

                if (newOffset && newOffset - historyOffset <= state.limit) {
                    if (newOffset > historyOffset + 1) {
                        axios.get(`http://localhost:3000/any/chats/messages`, {
                            params: {
                                userId,
                                offset: historyOffset + 1,
                                limit: newOffset - historyOffset - 1
                            }
                        })
                            .then(resp => {
                                commit('appendHistoryMessages', [userId, [...resp.data, ...state.chats[userId].newMessages]])
                                resolve()
                            })
                            .catch(err => reject(err))
                    } else {
                        commit('appendHistoryMessages', [userId, [...state.chats[userId].newMessages]])
                        resolve()
                    }

                } else {
                    axios.get(`http://localhost:3000/any/chats/messages`, {
                        params: {
                            userId,
                            offset: historyOffset + 1,
                            limit: state.limit
                        }
                    })
                        .then(resp => {
                            commit('appendHistoryMessages', [userId, resp.data])
                            resolve()
                        })
                        .catch(err => reject(err))
                }
            })
        },
        // init function
        loadHistory({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                commit('createChatIfNotExists', userId)
                axios.get(`http://localhost:3000/any/chats/offsets?userId=${userId}`)
                    .then(resp => {
                        const newOffset = state.chats[userId].firstNewOffset
                        const readOffset = resp.data.readOffset
                        commit('setViewedOffset', [userId, resp.data.viewedOffset])
                        if (newOffset && newOffset - readOffset <= state.limit) {
                            axios.get(`http://localhost:3000/any/chats/messages`, {
                                params: {
                                    userId,
                                    offset: readOffset - state.limit / 2,
                                    limit: newOffset - readOffset + state.limit / 2
                                }
                            })
                                .then(resp => {
                                    commit('addHistoryMessages', [userId, [...resp.data, state.chats[userId].newMessages]
                                        .slice(0, readOffset - newOffset + state.limit / 2)])
                                    resolve()
                                })
                                .catch(err => reject(err))
                        } else {
                            axios.get(`http://localhost:3000/any/chats/messages`, {
                                params: {
                                    userId,
                                    offset: readOffset - state.limit / 2,
                                    limit: state.limit
                                }
                            })
                                .then(resp => {
                                    commit('addHistoryMessages', [userId, resp.data])
                                    resolve()
                                })
                                .catch(err => reject(err))
                        }
                    })
            })
        }
    }
}