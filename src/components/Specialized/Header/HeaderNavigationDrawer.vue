<template>
  <!-- TODO: find this fucking events end rewrite with out watchers!!!! -->
  <v-navigation-drawer
      app
      class="pa-4 navigation-drawer"
      style="z-index: 10003"
      hide-overlay
      :value="value"
      @input="$emit('input', $event)"
  >
    <div>
      <v-row align="center">
        <v-img
            :src="require('@/assets/images/shortlogo.png')"
            :height="70"
            :width="70"
            max-width="70"
            contain
        ></v-img>
        <h2 class="ml-2">
          Soul Works
        </h2>
      </v-row>
    </div>
    <div style="display: flex !important; flex-direction: column" class="ml-1">
      <router-link
          v-if="isLogin && role==='spec'"
          :to="{name: 'specAccount'}"
          class="text-decoration-none black--text text-h6 sans"
          active-class="green--text"
      >
        {{ $t('nav.menu.personal-account') }}
      </router-link>
      <router-link
          v-if="isLogin && role==='user'"
          :to="{name: 'userAccount'}"
          class="text-decoration-none black--text text-h6 sans"
          active-class="green--text"
      >
        {{ $t('nav.menu.personal-account') }}
      </router-link>
      <router-link
          :to="{name: 'about'}"
          class="text-decoration-none black--text text-h6 sans"
          active-class="green--text"
      >
        {{ $t('nav.routes.about') }}
      </router-link>
      <router-link
          :to="{name: 'specialists'}"
          class="text-decoration-none black--text text-h6 sans"
          active-class="green--text"
      >
        {{ $t('nav.routes.specialists') }}
      </router-link>
      <router-link
          :to="{name: 'publications'}"
          class="text-decoration-none black--text text-h6 sans"
          active-class="green--text">
        {{ $t('nav.routes.publications') }}
      </router-link>
      <router-link
          :to="{name: 'rules'}"
          class="text-decoration-none black--text text-h6 sans"
          active-class="green--text">
        {{ $t('nav.routes.rules') }}
      </router-link>
    </div>

  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "HeaderNavigationDrawer",
  props: {
    value: Boolean
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