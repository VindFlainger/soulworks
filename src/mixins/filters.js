export default {
    methods: {
        fRole(role) {
            switch (role) {
                case 'user':
                    return this.$t('common.roles.client')
                case 'spec':
                    return this.$t('common.roles.specialist')
                case 'admin':
                    return this.$t('common.roles.admin')
                default:
                    return this.$t('common.roles.user')
            }
        }
    }
}