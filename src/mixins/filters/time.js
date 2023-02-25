export default {
    methods: {
        dynamicDate(v) {
            const diffD = this.$dj().diff(v, 'days')
            if (!diffD) {
                if (this.$dj().day() !== this.$dj(v).day() ) return this.$t('common.ui.yesterday')
                return this.$dj(v).format('HH:mm')
            }
            if (diffD < 7) return this.$dj(v).format('dd')
            return this.$dj(v).format('DD.MM.YYYY')
        }
    }

}