export default {
    methods: {
        logOut(login = true) {
            localStorage.clear()
            this.$store.state.email = null
            this.$store.state.token = null
            this.$store.state.role = null
            this.$store.state.id = null
            if (login) this.$router.push({name: 'home', query: {redirect: this.$route.fullPath}})
            else {
                this.$router.push({name: 'home'})
            }

        }
    }
}