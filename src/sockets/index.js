import {io} from 'socket.io-client'
import store from '../store'

const socket = io("ws://localhost:3000", {
    auth: {
        token: localStorage.getItem('token'),
        email: localStorage.getItem('email')
    }
});

socket.on('message:new', message => {
    store.dispatch('addNewMessage', message)
})

socket.on('message:viewed', (userId, viewedOffset) => {
    store.commit('createChatIfNotExists', userId)
    store.commit('setViewedOffset', [userId, viewedOffset])
})



export default socket


