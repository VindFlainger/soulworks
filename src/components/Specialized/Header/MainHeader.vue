<template>
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
          class="fill-height pr-16 pl-16"
      >

        <v-row
            class="fill-height"
            align="center"
            justify="end"
        >

          <router-link :to="{name: 'home'}">
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

          <div class="d-flex mr-16">
            <router-link :to="{name: 'about'}" class="header__link">О нас</router-link>
            <router-link :to="{name: 'specialists'}" class="header__link">Специалисты</router-link>
            <router-link :to="{name: 'publications'}" class="header__link">Публикации</router-link>
            <router-link :to="{name: 'rules'}" class="header__link">Правила платформы</router-link>
          </div>


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


      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
import HeaderUserMenu from "@/components/Specialized/Header/HeaderUserMenu";
import HeaderNotifications from "@/components/Specialized/Header/HeaderNotifications";
import {mapActions, mapGetters} from "vuex";


export default {
  name: "MainHeader",
  components: {HeaderNotifications, HeaderUserMenu},
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    }),
    ...mapGetters('notifications', {
      newNotificationsCount: 'getNewNotificationsCount',
      notifications: 'getNotifications',
      isNotificationsLoading: 'isLoading',
      isLastNotificationLoaded: 'isLastLoaded'
    })
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