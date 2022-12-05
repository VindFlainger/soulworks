export default {
    inserted(el, bindings) {
        const root = document.querySelector('.chat-area-list__wrapper')

        const rootMargin = (() => {
            switch (bindings.arg) {
                case 'bottom':
                    return '150px'
                case 'top':
                    return '150px'
            }
        })()


        const options = {
            threshold: 0,
            root,
            rootMargin
        }

        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                bindings.value()
            }
        }

        const observer = new IntersectionObserver(callback, options)

        observer.observe(el)
    }
}