<template>
  <v-app>
    <main-header>

    </main-header>
    <v-main style="min-height: 100vh">
      <router-view></router-view>

      <alerts-box></alerts-box>

      <main-loader></main-loader>

      <div>
        <component :is="confirmDialog?'confirm-dialog':''" v-bind="dynProps"></component>
        <component :is="infoDialog?'info-dialog':''" v-bind="dynProps"></component>
        <component :is="registrationDialog?'registration-dialog':''" v-bind="dynProps"></component>
        <component :is="loginDialog?'login-dialog':''" v-bind="dynProps"></component>
      </div>


    </v-main>
    <main-footer>

    </main-footer>
  </v-app>
</template>

<script>
import MainHeader from "@/components/Header/MainHeader";
import MainFooter from "@/components/MainFooter";
import AlertsBox from "@/components/AlertsBox";
import MainLoader from "@/components/MainLoader";
import {default as axios} from "axios";

export default {
  components: {MainLoader, AlertsBox, MainFooter, MainHeader},
  data() {
    return {
      confirmDialog: false,
      infoDialog: false,
      registrationDialog: false,
      loginDialog: false,
      dynProps: {}
    }
  },
  mounted() {
    const callback = () => this.$store.commit('setWidth', window.innerWidth)
    callback()
    window.addEventListener('resize', callback)
  },
  created() {
    this.$root.$on('show-confirm', (props = {}) => {
      this.dynProps = props
      this.confirmDialog = true
    })
    this.$root.$on('close-confirm', () => {
      this.confirmDialog = false
    })
    this.$root.$on('show-info', (props = {}) => {
      this.dynProps = props
      this.infoDialog = true
    })
    this.$root.$on('close-info', () => {
      this.infoDialog = false
    })
    this.$root.$on('show-registration', (props = {}) => {
      this.dynProps = props
      this.registrationDialog = true
    })
    this.$root.$on('close-registration', () => {
      this.registrationDialog = false
    })
    this.$root.$on('show-login', (props) => {
      this.dynProps = props
      this.loginDialog = true
    })
    this.$root.$on('close-login', () => {
      this.loginDialog = false
    })


    const getSessionsToken = () => {
      return axios.post('http://localhost:3000/login/session', {
        email: this.$store.getters.email,
        token: this.$store.getters.token
      })
    }


    if (this.$store.getters.token && this.$store.getters.email) {
      getSessionsToken()
          .then(resp => {
            if (resp.data.success){ this.$store.commit('setAuth', true)}
          })
          .catch()
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
@import "@/assets/styles/_reset.module.scss";
@import "@/assets/styles/_styles.module.scss";

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.router-link-exact-active{
  text-decoration: none;
  font-size: 16px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

::-webkit-scrollbar {
  width: 0;
}

*::selection {
  background: none;
}

.v-chip--select {
  margin-bottom: 4px !important;
  margin-top: 4px !important;
}


</style>
