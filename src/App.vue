<template>
  <v-app style="z-index: 1">
    <main-header>

    </main-header>
    <v-main style="min-height: 100vh">
      <router-view></router-view>

      <keep-alive>
        <router-view name="chat" :key="$route.params.id"></router-view>
      </keep-alive>

      <global-loader :value="isGlobalLoading"></global-loader>

      <div>
        <component :is="confirmDialog?'confirm-dialog':''" v-bind="dynProps"></component>
        <component :is="infoDialog?'info-dialog':''" v-bind="dynProps"></component>
        <component :is="registrationDialog?'registration-dialog':''" v-bind="dynProps"></component>
        <component :is="loginDialog?'login-dialog':''" v-bind="dynProps"></component>
        <component :is="findUserDialog?'find-user-dialog':''" v-bind="dynProps"></component>
      </div>

      <message-box></message-box>

    </v-main>

    <main-footer>

    </main-footer>

    <speed-dial
        v-if="isLogin"
        style="z-index: 10002"
    ></speed-dial>


  </v-app>
</template>

<script>
import MainHeader from "@/components/Specialized/Header/MainHeader";
import MainFooter from "@/components/Specialized/Main/MainFooter";
import MessageBox from "@/components/Specialized/Main/Alerts/AlertsBox.vue";
import GlobalLoader from "@/components/Specialized/Main/MainLoader";
import SpeedDial from "@/components/Specialized/Main/SpeedDial.vue";
import {mapGetters} from "vuex";
import DefaultInput from "@/components/UI/Inputs/DefaultInput.vue";
import {startRefreshing} from "@/store/action-types";


export default {
  components: {DefaultInput, SpeedDial, GlobalLoader, MessageBox, MainFooter, MainHeader},
  data() {
    return {
      confirmDialog: false,
      infoDialog: false,
      registrationDialog: false,
      loginDialog: false,
      findUserDialog: false,
      dynProps: {},
      footerVisible: true,
      isGlobalLoading: false,
    }
  },
  metaInfo: {
    titleTemplate: chunk => chunk ? `${chunk} | Soul Works` : 'Soul Works - Ваша психология'
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
    this.$root.$on('show-find-user', (props = {}) => {
      this.dynProps = props
      this.findUserDialog = true
    })
    this.$root.$on('close-find-user', () => {
      this.findUserDialog = false
    })

    this.$root.$on('set-global-loading', v => {
      this.isGlobalLoading = !!v
    })
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  mounted() {
    this.$store.dispatch(startRefreshing)
    if (this.isLogin) {
      this.$store.dispatch('getAuthedContent')
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap');
@import "@/assets/styles/_reset.module.scss";
@import "@/assets/styles/_styles.module.scss";

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
}


.router-link-exact-active {
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
  width: 3px;
  background: none;
}

::-webkit-scrollbar-button {
  background: none;
}

::-webkit-scrollbar-thumb {
  width: 6px;
  background: #9a9999;
  border-radius: 5px;
}


*::selection {
  background: none;
}

.v-chip--select {
  margin-bottom: 4px !important;
  margin-top: 4px !important;
}

.v-application--wrap {
  z-index: 1;
}

.v-menu__content .v-list {
  padding: 0;
}

</style>
