import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import Meta from 'vue-meta'

import Moment from "@/plugins/moment";
import Validator from "./plugins/validator";
import Socket from "./plugins/socket";
import Dayjs from "@/plugins/dayjs";


import textFilters from "@/filters/text.js"
import ConfirmDialog from "@/components/Dialogs/ConfirmDialog";
import RegistrationDialog from "@/components/Dialogs/RegistrationDialog/RegistrationDialog";
import InfoDialog from "@/components/Dialogs/InfoDialog";
import LoginDialog from "@/components/Dialogs/LoginDialog";
import FindUserDialog from "@/components/Dialogs/FindUserDialog";
import responsiveness from "@/mixins/responsiveness";
import i18n from './i18n'


textFilters.forEach(tf => {
    Vue.filter(tf.name, tf.filter)
})

Vue.config.productionTip = false

Vue.use(Validator)
Vue.use(Moment)
Vue.use(Socket)
Vue.use(Meta)
Vue.use(Dayjs)


Vue.component('ConfirmDialog', ConfirmDialog)
Vue.component('RegistrationDialog', RegistrationDialog)
Vue.component('InfoDialog', InfoDialog)
Vue.component('LoginDialog', LoginDialog)
Vue.component('FindUserDialog', FindUserDialog)
Vue.mixin(responsiveness)


const vm = new Vue({
    vuetify,
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')

export default vm
