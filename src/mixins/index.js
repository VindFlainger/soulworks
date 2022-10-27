import auth from "@/mixins/auth";

const axios = require('axios').default
axios.defaults.withCredentials = true

export default {
    data() {
        return {
            localLoading: false
        }
    },
    mixins: [auth],
    computed: {
        mobile() {
            return this.$store.getters.mobile
        },
        globalLoading() {
            return this.$store.state.loading
        }
    },
    methods: {
        addLoadingProcess() {
            this.$store.commit('setLoading', 1)
        },
        removeLoadingProcess() {
            this.$store.commit('setLoading', -1)
        },
        showAlert(type, title, time = 3000, text = '') {
            this.$store.dispatch('addAlert', {type: type, title: title, text: text, time: time})
        },

        /**
         * Options for http request wrapper
         * @alias requestOptions
         * @type {
         *      {
         *        handleError: Boolean?,
         *        handleErrorResponse: Boolean?,
         *        alertErrorTitle: String?,
         *        alertErrorResponseTitle: String?,
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
            const {headers, ...config} = axiosConfig

            return this.getFormatResponse(
                axios.get(
                    url,
                    {
                        ...config,
                        headers: {
                            ...this.getDefaultHeaders(),
                            ...headers
                        },
                    }
                ),
                options
            )
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
            const {headers, ...config} = axiosConfig

            return this.getFormatResponse(
                axios.post(
                    url,
                    data,
                    {
                        ...config,
                        headers: {
                            ...this.getDefaultHeaders(),
                            ...headers
                        },
                    }
                ),
                options
            )
        },

        putData(url, data, options, axiosConfig = {}) {
            const {headers, ...config} = axiosConfig

            return this.getFormatResponse(
                axios.put(
                    url,
                    data,
                    {
                        ...config,
                        headers: {
                            ...this.getDefaultHeaders(),
                            ...headers
                        },
                    }
                ),
                options
            )
        },

        delData(url, options, axiosConfig = {}) {
            const {headers, ...config} = axiosConfig

            return this.getFormatResponse(
                axios.delete(
                    url,
                    {
                        ...config,
                        headers: {
                            ...this.getDefaultHeaders(),
                            ...headers
                        },
                    }
                ),
                options
            )
        },

        getDefaultHeaders() {
            return {
                token: this.$store.state.token
            }
        },


        /**
         *
         * @param req
         * @param {requestOptions?} options
         * @return {Promise<requestResponse> || Promise<Error> }
         */
        getFormatResponse(req, options) {
            if (!options) options = {}
            return req
                .then(resp => {
                    if (resp.data.error && options.handleErrorResponse) {
                        this.showAlert(
                            'error',
                            options.alertErrorResponseTitle || 'Something went wrong',
                            3000,
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
                        if (err?.response?.data?.error && options.handleErrorResponse) {
                            this.showAlert(
                                'error',
                                options.alertErrorResponseTitle || 'Произошла ошибка',
                                3000,
                                err.response.data.code ? `Код ошибки ${err.response.data.code}` : err.response.data.message
                            )
                        } else if (options.handleError) this.showAlert('error', options.alertErrorTitle || 'Ошибка выполнения запроса', 2000)
                        throw err
                    }
                )
        },
        getSessionToken() {
            return axios.post('http://localhost:3000/auth/session', {
                token: this.$store.state.token,
                email: this.$store.state.email,
            })
        }


    }
}