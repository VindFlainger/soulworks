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

export const opportunities = v => {
    switch (v) {
        case 'teens':
            return 'работа с подростками'
        case 'family':
            return 'семейная консультация'
        case 'children':
            return 'работа с детьми'
        case 'internal':
            return 'оффлайн консультация'
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
    return moment(v).format('DD.MM.YYYY')
}

export const online = (v, sex) => {
    const prefix = (()=>{
        switch (sex){
            case 'male': return 'был'
            case 'female': return 'была'
            default: return 'был(а)'
        }
    })()
    const diffD = moment().diff(v, 'days')
    if (!diffD) {
        if (moment().day() !== moment(v).day() ) return `${prefix} вчера`
        return `${prefix} сегодня в ${moment(v).format('HH:mm')}`
    }
    if (diffD < 7) return `${prefix} в ${moment(v).format('dd')}`
    return `${prefix} ${moment(v).format('DD.MM.YYYY')}`
}

