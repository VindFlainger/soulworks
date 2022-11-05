<template>
  <v-menu offset-y left min-width="350" open-on-hover>
    <template v-slot:activator="{on, attrs}">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>

    <v-card color="white" elevation="0" max-width="350" outlined class="pa-3">
      <div v-if="!this.isLogin" class="menu__content pa-2">
        <div class="text-center fs-14">
          Войдите в аккаунт или зарегистрируйте новый для получения доступа к уникальному функционалу!
        </div>
        <v-card-actions class="pa-0 pt-3">
          <ui-default-button width="45%" @click="$root.$emit('show-login')">Войти</ui-default-button>
          <v-spacer></v-spacer>
          <ui-default-button width="45%" @click="$root.$emit('show-registration')">Регистрация</ui-default-button>
        </v-card-actions>
      </div>

      <div v-if="this.isLogin && shortInfo" class="menu__content">
        <v-row align="center" class="pa-2">
          <v-avatar size="55" style="border: 1px solid black">
            <v-img :src="shortInfo.avatar"></v-img>
          </v-avatar>

          <div class="ml-3">
            <div class="font-title font-weight-bold fs-20" style="line-height: 100%">
              {{ shortInfo.name }}
              {{ shortInfo.surname }}
            </div>

            <div class="fs-16 grey--text text--lighten-1" style="font-weight: 300; letter-spacing: 1px">
              {{ this.$store.state.role === 'spec' ? 'Психолог' : 'Пользователь' }}
            </div>
          </div>
        </v-row>

        <div style="border-bottom: 1px solid black; border-top: 1px solid black">
          <div class="pa-1" v-if="this.$store.state.role === 'spec'">
            <router-link :to="{name: 'specAccount'}" class="link">Личный кабинет</router-link>
            <router-link :to="{name: 'specClasses'}" class="link">Консультации</router-link>
            <router-link :to="{name: 'specTimetable'}" class="link">Расписание</router-link>
            <router-link :to="{name: 'specReviews'}" class="link">Отзывы</router-link>
            <router-link :to="{name: 'specSecurity'}" class="link">Безопасность</router-link>
          </div>
          <div v-if="this.$store.state.role === 'user'">
            <router-link :to="{name: 'specAccount'}" class="link">Личный кабинет</router-link>
            <router-link :to="{name: 'specClasses'}" class="link">Консультации</router-link>
            <router-link :to="{name: 'specTimetable'}" class="link">Расписание</router-link>
            <router-link :to="{name: 'specReviews'}" class="link">Отзывы</router-link>
            <router-link :to="{name: 'specSecurity'}" class="link">Безопасность</router-link>
          </div>
        </div>
        <div @click="logOut(false)" class="pa-1 link" style="font-weight: 600; cursor: pointer">
          Выход
        </div>
      </div>

    </v-card>


  </v-menu>

</template>

<script>
import {mapGetters} from "vuex";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";

export default {
  name: "HeaderUserMenu",
  components: {UiDefaultButton},
  data() {
    return {
      shortInfo: undefined
    }
  },
  methods: {
    getShortInfo() {
      this.getData('http://localhost:3000/any/shortinfo', {handleError: true, handleErrorResponse: true})
          .then(resp => {
            this.shortInfo = resp.data
          })
          .finally(() => {
          })
    }
  },
  mounted() {
    this.getShortInfo()
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
    }),
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