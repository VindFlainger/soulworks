import dayjs from "dayjs";
require('dayjs/locale/ru')

dayjs.locale(process.env.VUE_APP_I18N_LOCALE)

export default {
    install: function (Vue) {
        Object.defineProperty(Vue.prototype, '$dj', {value: dayjs});
    }
}


