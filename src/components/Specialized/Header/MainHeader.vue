<template>
  <div>
    <v-app-bar
        style="background: rgb(236, 239, 241); z-index: 10000"
        elevation="0"
        app
        absolute
        prominent
        dense
    >
      <v-container
          fluid
          class="d-flex justify-center fill-height"
      >
        <v-responsive
            style="border-bottom: 2px solid grey"
            max-width="1450"
            width="100%"
            class="fill-height pr-lg-16 pl-lg-16"
        >

          <v-row style="height: 100%" align="center" justify="end" justify-md="start">

            <header-navigation-raw v-if="viewportHook({base: false, md: true})"></header-navigation-raw>

            <v-row align="center" justify="end" v-if="viewportHook({base: true, md: false})">
              <header-localization></header-localization>

              <v-btn
                  class="ml-3"
                  fab
                  color="indigo lighten-5"
                  elevation="0"
                  @click="navigationVisible = true"
              >
                <v-icon large>mdi-menu</v-icon>
              </v-btn>
            </v-row>


          </v-row>
        </v-responsive>
      </v-container>
    </v-app-bar>


    <header-navigation-drawer
        v-if="viewportHook({base: true, md: false})"
        v-model="navigationVisible"
    ></header-navigation-drawer>

  </div>

</template>

<script>
import {mapGetters} from "vuex";
import HeaderNavigationDrawer from "@/components/Specialized/Header/HeaderNavigationDrawer.vue";
import HeaderNavigationRaw from "@/components/Specialized/Header/HeaderNavigationRaw.vue";
import HeaderLocalization from "@/components/Specialized/Header/HeaderLocalization.vue";


export default {
  name: "MainHeader",
  components: {HeaderLocalization, HeaderNavigationRaw, HeaderNavigationDrawer},
  data() {
    return {
      navigationVisible: false
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      role: 'getRole'
    }),
  },
}
</script>

<style scoped>

</style>