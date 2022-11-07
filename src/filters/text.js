export default [
    {
        name: 'capitalize',
        filter: v => v?.[0]?.toUpperCase() + v?.substring(1) || v
    },
    {
        name: 'datetime',
        filter: v => {
            const date = new Date(v)
            return date ? `${date.toLocaleDateString()} — ${date.toLocaleTimeString()}` : v
        }
    },
    {
        name: 'price',
        filter: (v, s) => {
            return `${v} ${s || 'BYN'}`
        }
    },
    {
        name: 'phone',
        filter: v => v?.length === 12 ? `+ ${v.substring(0, 3)} (${v.substring(3, 5)}) ${v.substring(5, 8)}-${v.substring(8, 10)}-${v.substring(10, 12)}` : v
    },
    {
        name: 'experience',
        filter: v => {
            const offset = new Date().getFullYear() - new Date(v).getFullYear()
            switch (offset) {
                case 0:
                    return 'менее года'
                case 1:
                    return 'более года'
                case 2:
                    return 'более двух лет'
                case 3:
                    return 'более трех лет'
                case 4:
                    return 'более четерых лет'
                case 5:
                    return 'более пяти лет'
                default:
                    return 'более шести лет'
            }
        }
    },
    {
        name: 'activity',
        filter: v => {
            if (!v) return 'онлайн'
            const offset = Math.floor((Date.now() - v) / 86400000)
            switch (offset) {
                case 0:
                    return 'сегодня'
                case 1:
                    return 'вчера'
                default:
                    return `${offset} дней назад`
            }
        }
    }

]