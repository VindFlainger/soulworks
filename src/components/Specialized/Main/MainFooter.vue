<template>
  <v-footer v-show="show">
    <v-container fluid class="d-flex justify-center">
      <v-responsive  width="100%" max-width="1450" class="pr-16 pl-16" style="border-top: 1px solid">
        <v-row >
          <v-col>
            <div class="title">Клиентам</div>

            <v-list  class="pa-0" color="transparent">
              <v-list-item  class="pa-0">
                <router-link to="" class="link">Подобрать психолога</router-link>
              </v-list-item >
              <v-list-item  class="pa-0">
                <router-link to="" class="link">Как работает сервис</router-link>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <div class="title">Специалистам</div>

            <v-list  class="pa-0" color="transparent">
              <v-list-item  class="pa-0">
                <router-link to="" class="link">Личный кабинет</router-link>
              </v-list-item>
              <v-list-item  class="pa-0">
                <router-link to="" class="link">Подать заявку</router-link>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <div class="title">Специалистам</div>

            <v-list  class="pa-0" color="transparent">
              <v-list-item  class="pa-0">
                <router-link to="" class="link">О компании</router-link>
              </v-list-item>
              <v-list-item  class="pa-0">
                <router-link to="" class="link">Отзывы</router-link>
              </v-list-item>
              <v-list-item  class="pa-0">
                <router-link :to="{name: 'qa'}" class="link">Вопросы и ответы</router-link>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <div class="title">Экстренная помощь</div>
            <div class="link fs-18"> +8801 123 45 67</div>
            <div class="link mt-3">
              Республиканская телефонная “горячая линия” по оказанию психологической помощи несовершеннолетним, попавшим в кризисную ситуацию
            </div>
          </v-col>

        </v-row>
      </v-responsive>
    </v-container>

  </v-footer>
</template>

<script>

export default {
  name: "MainFooter",
  data() {
    return {
      hideRouteNames: ['chat', 'chats']
    }
  },
  computed: {
    show(){
      return this.hideRouteNames.every(name => name !== this.$route.name)
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 22px;
  font-family: Comfortaa, sans-serif !important;
  color: black;
  text-align: left;
  font-weight: 700;
}

.link {
  font-size: 16px;
  font-family: "Open Sans", sans-serif !important;
  text-decoration: none;
  color: black;
  font-weight: 400;
  text-align: left;
}


.v-list-item {
  min-height: 20px;
}
</style>