import moment from "moment";
moment.lang('ru')

export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, '$moment', { value: moment});
    }
}