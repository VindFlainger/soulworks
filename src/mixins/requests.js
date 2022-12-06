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
        async getData(url, options, axiosConfig = {}) {
            const {headers, ...config} = axiosConfig

            await this.authInterceptor(true)

            return this.getFormatResponse(
                axios.get(
                    url,
                    {
                        ...config,
                        headers: {
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
        async postData(url, data, options, axiosConfig = {}) {
            const {headers, ...config} = axiosConfig

            await this.authInterceptor(true)

            return this.getFormatResponse(
                axios.post(
                    url,
                    data,
                    {
                        ...config,
                        headers: {
                            ...headers
                        },
                    }
                ),
                options
            )
        },

        async putData(url, data, options, axiosConfig = {}) {
            const {headers, ...config} = axiosConfig

            await this.authInterceptor(true)

            return this.getFormatResponse(
                axios.put(
                    url,
                    data,
                    {
                        ...config,
                        headers: {
                            ...headers
                        },
                    }
                ),
                options
            )
        },

        async delData(url, options, axiosConfig = {}) {
            const {headers, ...config} = axiosConfig

            await this.authInterceptor(true)

            return this.getFormatResponse(
                axios.delete(
                    url,
                    {
                        ...config,
                        headers: {
                            ...headers
                        },
                    }
                ),
                options
            )
        },


        async authInterceptor(active) {
            if (active && this.$store.state.sessionEnd < Date.now()) {
                return this.getSessionToken()
            }
            return
        },


        /**
         *
         * @param req
         * @param {requestOptions?} options
         * @return {Promise<requestResponse> || Promise<Error> }
         */
        getFormatResponse(req, options) {
            if (!options) options = {} // TODO: Check this on necessity (be careful, this is too stupid implementation)
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
        getSessionToken() {
            return axios.post('http://localhost:3000/auth/session', {
                token: this.$store.state.token,
                email: this.$store.state.email,
            })
                .then(() => {
                    this.$store.state.sessionEnd = Date.now() + 1000 * 60 * (5 * 0.8) // 80% percents from 5 min
                })
                .catch(err => {
                    if (err.response.data.code === 104) {
                        this.logOut()
                    }
                })
        }
    }
}