import validator from 'validator';

export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, '$validator', { value: validator });
    }
}
