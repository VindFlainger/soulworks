import {axiosPipeline} from "../../utils/axiosMiddlaware";
import store from "@/store";
import {addAlert} from "@/store/action-types";

export default {
    data() {
        return {
            loadingProcesses: 0,
            internalLoading: false
        }
    },
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


        getData(url, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.get(url, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        getDataAuthed(url, options, axiosConfig) {
            return this.getData(url, options, true, axiosConfig)
        },

        postData(url, data, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.post(url, data, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        postDataAuthed(url, data, options, axiosConfig) {
            return this.postData(url, data, options, true, axiosConfig)
        },

        putData(url, data, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.put(url, data, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        putDataAuthed(url, data, options, axiosConfig) {
            return this.putData(url, data, options, true, axiosConfig)
        },

        delData(url, options, auth = false, axiosConfig = {}) {
            return this.getFormatResponse(
                axiosPipeline.delete(url, {needAuth: auth, ...axiosConfig}),
                options
            )
        },

        delDataAuthed(url, options, axiosConfig) {
            return this.delData(url, options, true, axiosConfig)
        },


        getFormatResponse(req, options) {
            options = options || {}
            return req
                .then(resp => {
                    if (options.handleSuccess) {
                        store.dispatch(addAlert, {
                            type: 'request',
                            ignoreMute: true,
                            content: {
                                type: 'success',
                                success: {
                                    message: options.successMessage,
                                }
                            },
                        })
                    }

                    return {
                        status: resp.status,
                        ok: !(resp.status >= 400 && resp.status < 200),
                        data: resp.data
                    }
                })
                // TODO: check the fact that only valid server error-code responses appears here (middleware filter)
                .catch(err => {
                        if (options.handleError) {
                            store.dispatch(addAlert, {
                                type: 'request',
                                ignoreMute: true,
                                content: {
                                    type: 'error',
                                    error: {
                                        code: err.response.data.code,
                                        message: err.response.data.message,
                                    }
                                },
                            })
                        }
                        throw err
                    }
                )
        },
    }
}