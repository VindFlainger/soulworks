import Vue from 'vue'
import Vuex from 'vuex'
import content from "@/store/statics/content";
import params from "@/store/statics/params";
import chat from "@/store/modules/chat";
import auth from "@/store/modules/auth";
import alert from "@/store/modules/alert";
import notifications from "@/store/modules/notifications";
import {mobileAndTabletCheck} from "../../utils/globals";
import internationalization from "@/store/modules/internationalization";

Vue.use(Vuex)

export default new Vuex.Store({
        strict: process.env.NODE_ENV === 'development',
        state: {
            mobile: mobileAndTabletCheck(),
        },
        getters: {
            isMobile: state => state.mobile,
        },
        modules: {
            content,
            params,
            chat,
            notifications,
            auth,
            alert,
            internationalization
        }
    },
)
