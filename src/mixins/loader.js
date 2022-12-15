export default {
    data() {
        return {
            globalLoadingProcesses: 0
        }
    },
    methods: {
        addGlobalLoadingProcess() {
            if (!this.globalLoadingProcesses++) {
                this.$root.$emit('set-global-loading', true)
            }
        },
        removeGlobalLoadingProcess() {
            if (!--this.globalLoadingProcesses) {
                this.$root.$emit('set-global-loading', false)
            }
        },
    },
    computed: {
        isGlobalLoading() {
            return !!this.globalLoadingProcesses
        }
    }
}