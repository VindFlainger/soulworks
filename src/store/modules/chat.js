import Vue from 'vue'
import socket from '../../sockets'
import {axiosPipeline} from "../../../utils/axiosMiddlaware";

export default {
    state: {
        chats: {},
        limit: 30,
        newMessagesCount: 0
    },
    mutations: {
        setNewMessagesCount(state, count) {
            state.newMessagesCount = count
        },
        createChatIfNotExists(state, userId) {
            if (!state.chats[userId]) {
                Vue.set(state.chats, userId, {
                    isInit: false,
                    finalOffset: null,
                    viewedOffset: null,
                    readOffset: null,

                    messages: [],
                    firstOffset: null,
                    lastOffset: null,

                    newMessages: [],
                    newFirstOffset: null,

                    loadingMessages: []
                })
            }
        },
        setFinalOffset(state, [userId, offset]) {
            if (state.chats[userId]) {
                state.chats[userId].finalOffset = offset
            }
        },
        setViewedOffset(state, [userId, offset]) {
            if (state.chats[userId]) {
                state.chats[userId].viewedOffset = offset
            }
        },
        setReadOffset(state, [userId, offset]) {
            if (state.chats[userId]) {
                state.chats[userId].readOffset = offset
            }
        },
        setInitState(state, userId) {
            if (state.chats[userId]) {
                state.chats[userId].isInit = true
            }
        },
        initMessages(state, [userId, messages]) {
            if (state.chats[userId]) {
                state.chats[userId].messages.push(...messages)
                state.chats[userId].firstOffset = messages[0]?.offset ?? 0
                state.chats[userId].lastOffset = messages[messages.length - 1]?.offset ?? 0
            }
        },
        dropMessages(state, userId) {
            if (state.chats[userId]) {
                state.chats[userId].messages = []
                state.chats[userId].firstOffset = 0
                state.chats[userId].lastOffset = 0
            }
        },
        prependMessages(state, [userId, messages]) {
            if (state.chats[userId]?.isInit && messages.length) {
                state.chats[userId].messages.unshift(...messages)
                state.chats[userId].firstOffset = messages[0].offset ?? 0
            }
        },
        appendMessages(state, [userId, messages]) {
            if (state.chats[userId]?.isInit && messages.length) {
                state.chats[userId].messages.push(...messages)
                state.chats[userId].lastOffset = messages[messages.length - 1].offset ?? 0
            }
        },
        appendNewMessage(state, [userId, message]) {
            if (state.chats[userId]) {
                state.chats[userId].newMessages.push(message)
            }
        },
        setNewFirstOffset(state, [userId, offset]) {
            if (state.chats[userId]) {
                state.chats[userId].newFirstOffset = offset
            }
        },
        addLoadingMessage(state, [userId, message]) {
            if (state.chats[userId]) {
                state.chats[userId].loadingMessages.push(message)
            }
        },
        delLoadingMessage(state, [userId, id]) {
            if (state.chats[userId]) {
                state.chats[userId].loadingMessages = state.chats[userId].loadingMessages.filter(msg => msg._id !== id)
            }
        },
    },
    actions: {
        getAuthedContent({commit}) {
            axiosPipeline.get('http://localhost:3000/any/chats/allNewMessagesCount', {needAuth: true})
                .then(resp => {
                    commit('setNewMessagesCount', resp.data)
                })
        },
        initChat({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                commit('createChatIfNotExists', userId)

                axiosPipeline.get(`http://localhost:3000/any/chats/offsets?userId=${userId}`, {needAuth: true})
                    .then(resp => {
                        const readOffset = resp.data.readOffset
                        const viewedOffset = resp.data.viewedOffset
                        const finalOffset = resp.data.finalOffset

                        commit('setReadOffset', [userId, readOffset])
                        commit('setViewedOffset', [userId, viewedOffset])
                        commit('setFinalOffset', [userId, finalOffset])

                        axiosPipeline.get(`http://localhost:3000/any/chats/messages`, {
                            params: {
                                userId,
                                offset: (readOffset - state.limit / 2 + 1) < 0?0:readOffset - state.limit / 2 + 1,
                                limit: state.limit / 2
                            },
                            needAuth: true
                        })
                            .then(resp => {
                                commit('initMessages', [userId, resp.data])
                                commit('setInitState', userId)
                                resolve()
                            })
                            .catch(err => reject(err))
                    })
            })
        },
        loadChatLatestMessages({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                axiosPipeline.get(`http://localhost:3000/any/chats/offsets?userId=${userId}`, {needAuth: true})
                    .then(resp => {
                        const viewedOffset = resp.data.viewedOffset
                        const finalOffset = resp.data.finalOffset

                        commit('setReadOffset', [userId, finalOffset])
                        commit('setViewedOffset', [userId, viewedOffset])
                        commit('setFinalOffset', [userId, finalOffset])

                        axiosPipeline.get(`http://localhost:3000/any/chats/messages`, {
                            params: {
                                userId,
                                offset: finalOffset >= state.limit ? finalOffset - state.limit + 1 : 0,
                                limit: state.limit
                            },
                            needAuth: true
                        })
                            .then(resp => {
                                commit('dropMessages')
                                commit('initMessages', [userId, resp.data])
                                resolve()
                            })
                            .catch(err => reject(err))
                    })
            })
        },
        loadChatPreviousMessages({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                    axiosPipeline.get(`http://localhost:3000/any/chats/messages`, {
                        params: {
                            userId,
                            offset: state.chats[userId].firstOffset - state.limit,
                            limit: state.limit
                        },
                        needAuth: true
                    })
                        .then(resp => {
                            commit('prependMessages', [userId, resp.data])
                            resolve()
                        })
                        .catch(err => reject(err))
                }
            )
        },
        loadChatNextMessages({state, commit}, userId) {
            return new Promise((resolve, reject) => {
                if (state.chats[userId].newFirstOffset && state.chats[userId].lastOffset >= state.chats[userId].newFirstOffset) {
                    commit('appendMessages', [userId, state.chats[userId].newMessages.filter(msg => msg.offset > state.chats[userId].lastOffset)])
                    resolve()
                } else {
                    axiosPipeline.get(`http://localhost:3000/any/chats/messages`, {
                        params: {
                            userId,
                            offset: state.chats[userId].lastOffset + 1,
                            limit: state.limit
                        },
                        needAuth: true
                    })
                        .then(resp => {
                            commit('appendMessages', [userId, resp.data])
                            resolve()
                        })
                        .catch(err => reject(err))
                }
            })
        },
        // Socket.io only! Method base on sequential receipt of events.
        saveNewMessage({state, commit}, [userId, message]) {
            if (message.from === userId) commit('setNewMessagesCount', state.newMessagesCount + 1)
            commit('createChatIfNotExists', userId)
            commit('appendNewMessage', [userId, message])
            commit('setFinalOffset', [userId, message.offset])

            if (!state.chats[userId].newFirstOffset) {
                commit('setNewFirstOffset', [userId, message.offset])
            }

            if (state.chats[userId].isInit && state.chats[userId].newFirstOffset - 1 <= state.chats[userId].lastOffset) {
                commit('appendMessages', [userId, [message]])
            }
        },
        sendMessage({state, commit, dispatch}, [userId, message]) {
            return new Promise((resolve, reject) => {
                if (state.chats[userId].lastOffset >= state.chats[userId].finalOffset) {
                    resolve()
                }

                const tmpId = Date.now()
                const loadingMessage = {
                    text: message,
                    to: userId,
                    _id: tmpId
                }

                commit('addLoadingMessage', [userId, loadingMessage])

                socket.emit('message:add', userId, message, (message) => {
                    if (state.chats[userId].lastOffset >= state.chats[userId].finalOffset) {
                        commit('delLoadingMessage', [userId, tmpId])
                        dispatch('saveNewMessage', [userId, message])
                    } else {
                        dispatch('loadChatLatestMessages', userId)
                            .then(() => {
                                commit('delLoadingMessage', [userId, tmpId])
                                resolve()
                            })
                            .catch(err => reject(err))
                    }
                })
            })
        },
        changeReadOffset({commit}, [userId, offset]) {
            socket.emit('message:read', userId, offset)
            commit('setReadOffset', [userId, offset])
        },
        changeViewedOffset({commit}, [userId, offset]) {
            commit('setViewedOffset', [userId, offset])
        },
        getNewMessagesCount({commit}) {
            return axiosPipeline.get('http://localhost:3000/any/chats/allNewMessagesCount', {needAuth: true})
                .then(resp => {
                    commit('setNewMessagesCount', resp.data)
                })
        }
    }
}