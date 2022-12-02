export default {
    inserted(el, bindings) {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px'
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