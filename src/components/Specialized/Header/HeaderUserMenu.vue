<template>
  <v-menu
      min-width="350"
      offset-y
      left
  >
    <template v-slot:activator="{on, attrs}">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>

    <v-card
        class="pa-3"
        color="white"
        elevation="0"
        max-width="350"
        outlined
    >
      <div
          class="menu__content pa-2"
          v-if="!this.isLogin"
      >
        <div class="text-center fs-14">
          {{ $t('nav.menu.no-login') }}
        </div>

        <v-card-actions class="pa-0 pt-3">
          <ui-default-button
              width="45%"
              @click="$root.$emit('show-login')"
          >
            {{ $t('nav.menu.login') }}
          </ui-default-button>

          <v-spacer></v-spacer>

          <ui-default-button
              width="45%"
              @click="$root.$emit('show-registration')"
          >
            {{ $t('nav.menu.register') }}
          </ui-default-button>
        </v-card-actions>

      </div>

      <div v-if="this.isLogin" class="menu__content">
        <v-row align="center" class="pa-2">

          <ui-avatar
              :images="avatar?.images"
              :img-size="64"
              :size="55"
          ></ui-avatar>

          <div class="ml-3">
            <div
                class="font-title font-weight-bold fs-20"
                style="line-height: 100%"
            >
              {{ fullName }}
            </div>

            <div
                class="fs-16 grey--text text--lighten-1"
                style="font-weight: 300; letter-spacing: 1px"
            >
              {{ fRole(role) }}
            </div>
          </div>
        </v-row>

        <div style="border-bottom: 1px solid black; border-top: 1px solid black">
          <div class="pa-1" v-if="role === 'spec'">
            <router-link :to="{name: 'specAccount'}" class="link">{{ $t('nav.menu.personal-account') }}</router-link>
            <router-link :to="{name: 'specClasses'}" class="link">{{ $t('nav.menu.classes') }}</router-link>
            <router-link :to="{name: 'specTimetable'}" class="link">{{ $t('nav.menu.timetable') }}</router-link>
            <router-link :to="{name: 'specReviews'}" class="link">{{ $t('nav.menu.reviews') }}</router-link>
            <router-link :to="{name: 'specSecurity'}" class="link">{{ $t('nav.menu.security') }}</router-link>
          </div>
          <div v-if="role === 'user'">
            <router-link :to="{name: 'userAccount'}" class="link">{{ $t('nav.menu.personal-account') }}</router-link>
            <router-link :to="{name: 'userClasses'}" class="link">{{ $t('nav.menu.classes') }}</router-link>
            <router-link :to="{name: 'userReviews'}" class="link">{{ $t('nav.menu.reviews') }}</router-link>
            <router-link :to="{name: 'userMaterials'}" class="link">{{ $t('nav.menu.materials') }}</router-link>
            <router-link :to="{name: 'userFavourites'}" class="link">{{ $t('nav.menu.favourite') }}</router-link>
            <router-link :to="{name: 'specSecurity'}" class="link">{{ $t('nav.menu.security') }}</router-link>
          </div>
        </div>

        <div
            class="pa-1 link font-weight-bold"
            style="cursor: pointer"
            @click="logOut(false)"
        >
          {{ $t('nav.menu.logout') }}
        </div>

      </div>
    </v-card>
  </v-menu>

</template>

<script>
import {mapGetters} from "vuex";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import requests from "@/mixins/requests";
import UiAvatar from "@/components/UI/UiAvatar";
import auth from "@/mixins/auth";
import filters from "@/mixins/filters";

export default {
  name: "HeaderUserMenu",
  components: {UiAvatar, UiDefaultButton},
  mixins: [requests, auth, filters],
  data() {
    return {
      avatar: null,
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      role: 'getRole',
      fullName: 'getFullName',
      id: 'getId'
    }),
  },
  mounted() {
    if (this.isLogin) {
      this.getAccountData()
    }
  },
  methods: {
    getAccountData() {
      this.getDataAuthed(`data/short?userId=${this.id}`)
          .then(resp => {
            this.avatar = resp.data.avatar
          })
          .catch(() => {})
    }
  }
}
</script>

<style scoped>
.link {
  display: block;
  font-size: 20px;
  text-decoration: none;
  color: #000;
}
</style>