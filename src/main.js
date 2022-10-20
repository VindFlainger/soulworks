import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'

import Validator from "./plugins/validator";

import mixin from "@/mixins/index.js";
import textFilters from "@/filters/text.js"
import ConfirmDialog from "@/components/Dialogs/ConfirmDialog";
import RegistrationDialog from "@/components/Dialogs/RegistrationDialog";
import InfoDialog from "@/components/Dialogs/InfoDialog";
import LoginDialog from "@/components/Dialogs/LoginDialog";

Vue.mixin(mixin)
textFilters.forEach(tf => {
    Vue.filter(tf.name, tf.filter)
})

Vue.config.productionTip = false

Vue.use(Validator)

Vue.component('ConfirmDialog', ConfirmDialog)
Vue.component('RegistrationDialog', RegistrationDialog)
Vue.component('InfoDialog', InfoDialog)
Vue.component('LoginDialog', LoginDialog)


new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
