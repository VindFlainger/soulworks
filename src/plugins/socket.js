import socket from '../sockets/index'

export default {
    install: function (Vue) {
        Object.defineProperty(Vue.prototype, '$socket', {value: socket});
    }
}



