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
            if (active && this.$store.state.sessionEnd < Date.now()){
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
                .then(() => {
                    this.$store.state.sessionEnd = Date.now() + 1000 * 60 * (5 * 0.8) // 80% percents from 5 min
                })
                .catch(err=>{
                    if (err.response.data.code === 104){
                        this.logOut()
                    }
                })
        }
    }
}