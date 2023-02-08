import {CLEAR_AUTH_DATA} from "@/store/mutation-types";

export default {
    methods: {
        logOut(showLoginWindow = true) {
            this.$store.commit(CLEAR_AUTH_DATA)
            if (showLoginWindow) this.$router.push({name: 'home', query: {redirect: this.$route.fullPath}})
            else {
                this.$router.push({name: 'home'})
            }

        }
    }
}
