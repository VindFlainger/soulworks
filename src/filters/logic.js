export const sex = v => {
    switch (v) {
        case 'male':
            return 'мужской'
        case 'female':
            return 'женский'
        case 'none':
            return 'не указан'
        default:
            return ''
    }

}

export const role = v => {
    switch (v) {
        case 'spec':
            return 'специалист'
        case 'user':
            return 'пользователь'
        case 'admin':
            return 'администратор'
        default:
            return ''
    }

}