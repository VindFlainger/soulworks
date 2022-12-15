import {io} from 'socket.io-client'
import store from '../store'

const socket = io("ws://localhost:3000", {
    auth: {
        token: localStorage.getItem('token'),
        email: localStorage.getItem('email')
    }
});


socket.on('connect', () => {
    store.commit('setConnected', true)
})

socket.on('disconnect', () => {
    store.commit('setConnected', false)
})

socket.on('notification:new', notification => {
    store.commit('notifications/PREPEND_NOTIFICATIONS', [notification])
})

socket.on('message:new', message => {
    store.dispatch('saveNewMessage', [message.from, message])
})

socket.on('message:viewed', (userId, viewedOffset) => {
    store.commit('createChatIfNotExists', userId)
    store.dispatch('changeViewedOffset', [userId, viewedOffset])
})


export default socket


