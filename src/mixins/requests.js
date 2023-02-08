import auth from "@/mixins/auth";
import store from "@/store";

const axios = require('axios').default
axios.defaults.withCredentials = true

export default {
    data() {
        return {
            loadingProcesses: 0,
            internalLoading: false
        }
    },
    mixins: [auth],
    computed: {
        isLoading() {
            return !!this.loadingProcesses
        }
    },
    methods: {
        addInternalLoading() {
            this.internalLoading = true
        },
        removeInternalLoading() {
            this.internalLoading = false
        },
        addLoadingProcess() {
            this.loadingProcesses++
        },
        removeLoadingProcess() {
            this.loadingProcesses--
        },
        showAlert(type, time = 3000, text = '') {
            this.$root.emit('push-message', {type, time, text})
        },

        /**
         * Options for http request wrapper
         * @alias requestOptions
         * @type {
         *      {
         *        handleError: Boolean?,
         *        handleErrorResponse: Boolean?,
         *        alertErrorResponseTitle: String?,
         *        needAuth: Boolean
         *      }
         * }
         */

        /**
         * Wrapped request response
         * @alias requestResponse
         * @type {
         *     {
         *         data: Object,
         *         status: Number
         *     }
         * }
         */

        /**
         *
         * @param {string} url
         * @param {requestOptions?} options
         * @param {Object?} axiosConfig
         * @return {Promise<requestResponse> || Promise<Error>}
         */
        getData(url, options, axiosConfig = {}) {
            return store.dispatch('authInterceptor')
                .then(() => {
                    return this.getFormatResponse(
                        axios.get(url, axiosConfig),
                        options
                    )
                })
        },

        /**
         *
         * @param {string} url
         * @param {Object?} data
         * @param {requestOptions?} options
         * @param {Object?} axiosConfig
         * @return {Promise<requestResponse> || Promise<Error>}
         */
        postData(url, data, options, axiosConfig = {}) {
            return store.dispatch('authInterceptor')
                .then(() => {
                    return this.getFormatResponse(
                        axios.post(url, data, axiosConfig),
                        options
                    )
                })
        },

        putData(url, data, options, axiosConfig = {}) {
            return store.dispatch('authInterceptor')
                .then(() => {
                    return this.getFormatResponse(
                        axios.put(url, data, axiosConfig),
                        options
                    )
                })
        },

        delData(url, options, axiosConfig = {}) {
            return store.dispatch('authInterceptor')
                .then(() => {
                    return this.getFormatResponse(
                        axios.delete(url, axiosConfig),
                        options
                    )
                })
        },

        /**
         *
         * @param req
         * @param {requestOptions?} options
         * @return {Promise<requestResponse> || Promise<Error> }
         */
        getFormatResponse(req, options = {}) {
            return req
                .then(resp => {
                    if (resp.data.error && options.handleErrorResponse) {
                        this.showAlert(
                            'error',
                            2000,
                            resp.data.code ? `Error code ${resp.data.code}` : resp.data.error
                        )
                    }
                    return {
                        status: resp.status,
                        ok: !(resp.status >= 400 && resp.status < 200),
                        data: resp.data
                    }
                })
                .catch(err => {
                        if (err?.response?.data?.code && options.handleErrorResponse) {
                            this.showAlert(
                                'error',
                                2000,
                                `Произошла ошибка, код ошибки ${err.response.data.code}`
                            )
                        }
                        throw err
                    }
                )
        },
    }
}