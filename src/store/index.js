import Vue from 'vue'
import Vuex from 'vuex'
import content from "@/store/modules/content";
import params from "@/store/modules/params";
import chat from "@/store/modules/chat";
import auth from "@/store/modules/auth";
import alert from "@/store/modules/alert";
import notifications from "@/store/modules/notifications";
import {SET_CURRENT_TIME} from "@/store/mutation-types";
import {startRefreshing} from "@/store/action-types";
import {mobileAndTabletCheck} from "../../utils/globals";

Vue.use(Vuex)

export default new Vuex.Store({
        strict: process.env.NODE_ENV === 'development',
        state: {
            timeZoneOffset: -new Date().getTimezoneOffset() / 60,
            currentTime: Date.now(),
            mobile: mobileAndTabletCheck()
        },
        getters: {
            getTimeZoneOffset: state => state.timeZoneOffset,
            isMobile: state => state.mobile
        },
        mutations: {
            [SET_CURRENT_TIME](state, v) {
                state.currentTime = v
            }
        },
        actions: {
            [startRefreshing]({commit}) {
                setInterval(() => {
                    commit(SET_CURRENT_TIME, Date.now())
                }, 5000)
            }
        },
        modules: {
            content,
            params,
            chat,
            notifications,
            auth,
            alert
        }
    },
)
