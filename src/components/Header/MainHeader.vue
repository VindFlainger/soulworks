<template>
<!--  linear-gradient(90deg, rgba(255,255,255,0.14), rgba(217, 217, 217, 0))-->
  <v-app-bar app elevation="0" prominent
             style="background: rgb(236, 239, 241); z-index: 10000"

             absolute>
    <v-container fluid class="d-flex justify-center fill-height ">
      <v-responsive class="fill-height pr-16 pl-16" style="border-bottom: 2px solid grey" max-width="1450" width="100%">
        <v-row class="fill-height" align="center" justify="end">
          <router-link :to="{name: 'home'}">
            <v-img :src="require('@/assets/images/shortlogo.png')" :height="70" :width="70" max-width="70" contain class="ml-4">

            </v-img>
          </router-link>
          <v-spacer></v-spacer>
          <div class="d-flex mr-16">
            <router-link to="" class="header__link">О нас</router-link>
            <router-link to="" class="header__link">Специалисты</router-link>
            <router-link to="" class="header__link">Обучающие материалы</router-link>
            <router-link to="" class="header__link">Чаты</router-link>
          </div>
          <div class="d-flex">


            <v-btn icon class="mr-6">
              <v-icon class="fs-32 black--text header__icon">mdi-bell-outline</v-icon>
            </v-btn>



            <header-user-menu>
              <v-badge :value="$store.getters.isLogin" overlap color="green lighten-3" dot offset-x="14" offset-y="14">
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
import HeaderUserMenu from "@/components/Header/HeaderUserMenu";

export default {
  name: "MainHeader",
  components: {HeaderUserMenu}
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