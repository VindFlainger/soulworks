export default {
    namespaced: true,
    state: {
        opportunities: [
            {
                value: 'internal',
                text: 'очная консультация'
            },
            {
                value: 'children',
                text: 'работа с детьми'
            },
            {
                value: 'teens',
                text: 'работа с подростками'
            },
            {
                value: 'family',
                text: 'семейная консультация'
            }
        ],
        specSex: [
            {
                value: 'male',
                text: 'мужской'
            },
            {
                value: 'female',
                text: 'женский'
            }
        ],
        userSex: [
            {
                value: 'male',
                text: 'мужской'
            },
            {
                value: 'female',
                text: 'женский'
            },
            {
                value: 'none',
                text: 'не указан'
            },
        ],
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
    }
}