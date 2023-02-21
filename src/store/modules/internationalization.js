import {SET_CURRENT_TIME, SET_LOCALE} from "@/store/mutation-types";
import {changeLocale, startRefreshing} from "@/store/action-types";
import I18n from "@/i18n";
import dayjs from "dayjs";

export default {
    state: {
        locale: 'ru',
        timeZoneOffset: -new Date().getTimezoneOffset() / 60,
        currentTime: Date.now(),
    },
    getters: {
        getLocale: state => state.locale,
        getTimeZoneOffset: state => state.timeZoneOffset,
        getCurrentTime: state => state.currentTime
    },
    mutations: {
        [SET_CURRENT_TIME](state, time) {
            state.currentTime = time
        },
        [SET_LOCALE](state, locale) {
            state.locale = locale
        }
    },
    actions: {
        [startRefreshing]({commit}) {
            setInterval(() => {
                commit(SET_CURRENT_TIME, Date.now())
            }, 5000)
        },
        [changeLocale]({commit}, locale) {
            I18n.locale = locale
            dayjs.locale(locale)
            commit(SET_LOCALE, locale)
        }
    },
}