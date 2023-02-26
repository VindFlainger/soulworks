import i18n from '../../i18n'

export default {
    namespaced: true,
    state: {
        linkPrefixes: [
            {
                network: 'vk',
                link: 'https://vk.com/'
            },
            {
                network: 'facebook',
                link: 'https://www.facebook.com/profile.php?id='
            },
            {
                network: 'telegram',
                link: 'https://t.me/'
            },
            {
                network: 'whatsapp',
                link: 'https://wa.me/'
            },
            {
                network: 'instagram',
                link: 'https://www.instagram.com/'
            },
            {
                network: 'viber',
                link: ''
            },
        ],
        specSort: [
            {
                text: 'По количеству обращений',
                value: 1
            },
            {
                text: 'По цене (сначало дороже)',
                value: 2
            },
            {
                text: 'По цене (сначало дешевле)',
                value: 3
            },
            {
                text: 'По дате регистрации',
                value: 4
            }
        ]
    },
    getters: {
        getSpecGenders() {
            return [
                {
                    value: 'male',
                    text: i18n.t('common.data.sex.male')
                },
                {
                    value: 'female',
                    text: i18n.t('common.data.sex.female')
                }
            ]
        },
        getUserGenders(){
            return [
                {
                    value: 'male',
                    text: i18n.t('common.data.sex.male')
                },
                {
                    value: 'female',
                    text: i18n.t('common.data.sex.female')
                },
                {
                    value: 'none',
                    text: i18n.t('common.data.sex.none')
                }
            ]
        },
        getOpportunities(){
            return [
                {
                    value: 'internal',
                    text: i18n.t('common.data.opportunities.internal')
                },
                {
                    value: 'children',
                    text: i18n.t('common.data.opportunities.children')
                },
                {
                    value: 'teens',
                    text: i18n.t('common.data.opportunities.teens')
                },
                {
                    value: 'family',
                    text: i18n.t('common.data.opportunities.family')
                }
            ]
        }
    }
}