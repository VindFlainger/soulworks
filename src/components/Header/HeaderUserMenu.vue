<template>
  <v-menu offset-y min-width="350" content-class="menu">
    <template v-slot:activator="{on, attrs}">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>

    </template>

    <v-card class="" elevation="0" max-width="350">

      <div v-if="!this.$store.state.auth" class="menu__content">
        <div class="pa-2">
          <v-row class="text-center fs-14" justify="center">

            <div>
              Войдите в аккаунт или зарегистрируйте новый для получения доступа к уникальному функционалу!
            </div>
          </v-row>
          <v-card-actions class="pa-0 pt-3">
            <v-btn outlined color="blue lighten-3" width="45%" @click="$root.$emit('show-login')">
              Войти
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="blue lighten-3" width="45%" @click="$root.$emit('show-registration')">
              Регистрация
            </v-btn>
          </v-card-actions>
        </div>

      </div>

      <div v-if="this.$store.state.auth && shortInfo" class="menu__content">

        <v-row align="center" class="pa-2">
          <v-avatar size="55">
            <v-img :src="shortInfo.avatar"></v-img>
          </v-avatar>

          <div class="ml-3">
            <div class="font-title font-weight-bold fs-22">
              {{ shortInfo.name }}
              {{ shortInfo.surname }}
            </div>

            <div class="fs-14 grey--text text--lighten-1">
              {{ shortInfo.email }}
            </div>
          </div>

        </v-row>

        <v-list class="">
          <v-row>

          </v-row>
          <v-list-item v-for="item in listItems" :key="item.text" dense class="pt-2 pb-2" :link="item.link">
            <v-list-item-icon>
              <v-icon size="40" v-text="item.icon" :color="item.iconColor"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <div class="fs-18 black--text font-title">{{ item.text }}</div>
            </v-list-item-title>
          </v-list-item>

        </v-list>
      </div>
    </v-card>


  </v-menu>

</template>

<script>
export default {
  name: "HeaderUserMenu",
  data() {
    return {
      listItems: [
        {
          icon: 'mdi-account-box',
          iconColor: 'blue lighten-3',
          text: 'Личный кабинет',
          link: {}
        },
        {
          icon: 'mdi-forum-outline',
          iconColor: 'orange lighten-3',
          text: 'Чаты',
          link: {}
        },
        {
          icon: 'mdi-account-group',
          iconColor: 'purple lighten-3',
          text: 'Консультации',
          link: {}
        },
        {
          icon: 'mdi-timetable',
          iconColor: 'green lighten-3',
          text: 'Расписание',
          link: {}
        }
      ],
      shortInfo: undefined
    }
  },
  methods: {
    getShortInfo() {
      this.getData('http://localhost:3000/any/shortinfo', {handleError: true, handleErrorResponse: true})
          .then(resp => {
            this.shortInfo = resp.data
          })
    }
  },
  mounted() {
    this.getShortInfo()
  }
}
</script>

<style scoped>
.menu {
  box-shadow: none !important;
}

.menu__content {
  box-shadow: inset 0 0 1px grey;
  padding: 1px;
}
</style>