import moment from "moment";

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

export const date = v => {
    const diffD = moment().diff(v, 'days')
    if (!diffD) {
        if (moment().day() !== moment(v).day() ) return 'вчера'
        return moment(v).format('HH:mm')
    }
    if (diffD < 7) return moment(v).format('dd')
    return moment(v).format('l')
}

