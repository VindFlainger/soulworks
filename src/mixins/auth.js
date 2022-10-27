export default {
    methods: {
        logOut(){
            this.$store.state.email = null
            this.$store.state.token = null
            this.$store.state.role = null
            this.$router.push({name: 'home', query: {redirect: this.$route.fullPath}})
        }
    }
}