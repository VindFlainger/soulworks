<template>
  <v-row
      class="fill-height"
      align="center"
      justify="end"
  >

    <router-link
        v-if="viewportHook({base: false, sm: true})"
        :to="{name: 'home'}"
    >
      <v-img
          class="ml-4"
          :src="require('@/assets/images/shortlogo.png')"
          :height="70"
          :width="70"
          max-width="70"
          contain
      ></v-img>
    </router-link>

    <v-spacer></v-spacer>

    <div class="d-flex">
      <router-link :to="{name: 'about'}" class="header__link">{{ $t('nav.routes.about') }}</router-link>
      <router-link :to="{name: 'specialists'}" class="header__link">{{
          $t('nav.routes.specialists')
        }}
      </router-link>
      <router-link :to="{name: 'publications'}" class="header__link"> {{ $t('nav.routes.publications') }}
      </router-link>
      <router-link :to="{name: 'rules'}" class="header__link"> {{ $t('nav.routes.rules') }}</router-link>
    </div>

    <header-localization class="pl-5 pr-5"></header-localization>

    <div class="d-flex">
      <v-badge
          v-if="isLogin"
          class="mr-4"
          overlap
          color="green lighten-3"
      >
        <template v-slot:badge>
          {{ newNotificationsCount }}
        </template>
        <v-menu
            min-width="350"
            offset-y
            left
            :close-on-content-click="false"
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
                v-bind="attrs"
                v-on="on"
                icon
            >
              <v-icon class="fs-32 black--text" style="position:relative; top: -2px">mdi-bell-outline</v-icon>
            </v-btn>
          </template>

          <header-notifications
              :notifications="notifications"
              :is-last-loaded="isLastNotificationLoaded"
              :is-loading="isNotificationsLoading"
              @read="setNotificationRead"
              @load-more="loadNotifications"
          ></header-notifications>
        </v-menu>
      </v-badge>


      <v-badge
          class="mr-4"
          v-if="isLogin && $route.name !== 'chat' && $route.name !== 'chats'"
          overlap
          color="green lighten-3"
      >
        <v-btn
            @click="$router.push({name: 'chats'})"
            icon
        >
          <v-icon
              class="fs-28 black--text header__icon"
              style="position:relative; top: 2px"
          >
            mdi-message-outline
          </v-icon>
        </v-btn>
        <template v-slot:badge>
          {{ $store.state.chat.newMessagesCount }}
        </template>
      </v-badge>


      <header-user-menu>
        <v-badge
            :value="isLogin"
            offset-x="14"
            offset-y="14"
            color="green lighten-3"
            overlap
            dot
        >
          <v-btn icon>
            <v-icon class="fs-32 black--text">mdi-account-outline</v-icon>
          </v-btn>
        </v-badge>
      </header-user-menu>

    </div>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import HeaderUserMenu from "@/components/Specialized/Header/HeaderUserMenu.vue";
import HeaderNotifications from "@/components/Specialized/Header/HeaderNotifications.vue";
import HeaderLocalization from "@/components/Specialized/Header/HeaderLocalization.vue";

export default {
  name: "HeaderNavigationRaw",
  components: {HeaderLocalization, HeaderNotifications, HeaderUserMenu},
  computed: {
    ...mapGetters('notifications', {
      newNotificationsCount: 'getNewNotificationsCount',
      notifications: 'getNotifications',
      isNotificationsLoading: 'isLoading',
      isLastNotificationLoaded: 'isLastLoaded'
    }),
    ...mapGetters({
      isLogin: 'isLogin',
      role: 'getRole'
    }),
  },
  methods: {
    ...mapActions('notifications',
        {
          loadNotifications: 'loadNotifications',
          setNotificationRead: 'setNotificationRead'
        }
    ),
  },
}
</script>

<style scoped>
.header__link {
  padding: 0 16px 0 16px;
  font-size: 22px;
  color: black;
  text-decoration: none;
}

</style>