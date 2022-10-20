<template>
  <v-card class="pa-3" outlined>
    <v-row>

      <v-badge overlap color="purple" offset-x="20" offset-y="20" :value="specialist.privileges.premium">
        <template v-slot:badge>
          <v-icon size="22">mdi-star</v-icon>
        </template>
        <v-avatar size="150">
          <v-img :src="specialist.avatar"></v-img>
        </v-avatar>
      </v-badge>

      <v-col>
        <v-card-title class="pa-0 mb-3 font-title fs-20 font-weight-bold">
          {{ specialist.name }} {{specialist.surname}}
        </v-card-title>
        <v-card-subtitle class="text-left pa-0">
          <span v-if="specialist.degree.approve">
            {{ specialist.degree.name }},
          </span>

          <span>
            {{ specialist.registered | experience }} на сайте,
          </span>

          <span>
            был(а) {{ specialist.active | activity }}
          </span>
        </v-card-subtitle>

        <v-row class="ml-n2" align="center">
          <v-rating
              class="text-left"
              readonly
              size="20"
              :value="specialist.reviews.reduce((accum, el) => accum + el.stars ,0) / specialist.reviews.length"
              color="blue lighten-3"
              background-color="grey"
              half-increments
          >
          </v-rating>

          <span class="fs-14 font-title ">( {{ specialist.reviews.length }} )</span>
        </v-row>

        <ui-order-bar class="pt-2"
                      :orders="[
                          {
                            show: specialist.sex === 'male',
                            name: specialist.sex,
                            color: 'blue lighten-4',
                            icon: 'mdi-gender-male'
                          },
                          {
                            show: specialist.sex === 'female',
                            name: specialist.sex,
                            color: 'pink lighten-4',
                            icon: 'mdi-gender-female'
                          },
                          {
                            show: specialist.stats.confirmed >= 100,
                            name: 'провел более ста занятий',
                            color: 'indigo lighten-4',
                            icon: 'mdi-decagram-outline'
                          },
                          {
                            show: specialist.stats.cancelled >= 100,
                            name: 'отменил более ста занятий',
                            color: 'red lighten-4',
                            icon: 'mdi-close'
                          },
                          {
                            show: specialist.stats.missed >= 100,
                            name: 'пропустил более ста занятий',
                            color: 'red lighten-4',
                            icon: 'mdi-call-missed'
                          },
                          {
                            show: specialist.privileges.premium,
                            name: 'владелец премиум аккаунта',
                            color: 'purple lighten-4',
                            icon: 'mdi-star'
                          },
                          {
                            show: specialist.privileges.medals.includes('odmen'),
                            name: 'его криворучиство одмен',
                            color: 'green lighten-4',
                            icon: 'mdi-code-tags'
                          },
                      ]"
        >
        </ui-order-bar>

      </v-col>

    </v-row>

    <v-row class="mt-4 pb-3 bt-3">
      <div class="fs-16 font-title font-weight-bold">Краткое описание</div>
      <div class="fs-14 text-left">
        {{ specialist.about.short }}
      </div>
    </v-row>

    <v-row class="mt-4">

      <v-col class="pa-0 fs-12">
        <v-row class="text-left">
          <div>
            <v-icon size="40" color="green lighten-3">mdi-cash</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="specialist.opportunities.internal">
              Очная консультация от {{ specialist.price.internal.min | price }} до
              {{ specialist.price.internal.max | price }}
            </div>
            <div>
              Онлайн консультация от {{ specialist.price.online.min | price }} до
              {{ specialist.price.online.max | price }}
            </div>
          </div>
        </v-row>

        <v-row class="text-left mt-2" align="center">
          <div>
            <v-icon size="40" color="yellow accent-3">mdi-room-service-outline</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="specialist.opportunities.children">Работа с детьми</div>
            <div v-if="specialist.opportunities.teens">Работа с подростками</div>
            <div v-if="specialist.opportunities.family">Семейный психолог</div>
            <div v-if="specialist.opportunities.family">Возможнен личный прием</div>
          </div>
        </v-row>

        <v-row class="text-left mt-2" align="center">
          <div>
            <v-icon size="40" color="indigo lighten-3">mdi-account-box-outline</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="specialist.contacts.address">Адрес: {{ specialist.contacts.address }}</div>
            <div v-if="specialist.contacts.connection">Связь: {{ specialist.contacts.connection }}</div>
          </div>
        </v-row>

      </v-col>


      <v-col class="pa-0 text-left" v-if="contactsVisible">
        <div v-if="specialist.contacts.online">
          <v-row>
            <span class="font-title fs-22">  +{{ specialist.contacts.online.tel }}</span>
            <v-avatar v-for="messenger in specialist.contacts.online.messengers"
                      :key="messenger" size="25"
                      class="ma-1"
            >
              <v-img
                  :src="require(`@/assets/images/${messenger}.png`)">
              </v-img>
            </v-avatar>

          </v-row>


          <v-row v-if="specialist.contacts.online.telegram" class="ma-2">
            <v-avatar size="30" class="mr-3">
              <v-img src="@/assets/images/vk.png"></v-img>
            </v-avatar>
            <div class="fs-16 font-title font-weight-bold">
              {{ specialist.contacts.online.telegram }}
            </div>
          </v-row>
          <v-row v-if="specialist.contacts.online.instagram" class="ma-2">
            <v-avatar size="30" class="mr-3">
              <v-img src="@/assets/images/instagram.png"></v-img>
            </v-avatar>
            <div class="fs-16 font-title font-weight-bold">
              {{ specialist.contacts.online.instagram }}
            </div>
          </v-row>
          <v-row v-if="specialist.contacts.online.skype" class="ma-2">
            <v-avatar size="30" class="mr-3">
              <v-img src="@/assets/images/skype.png"></v-img>
            </v-avatar>
            <div class="fs-16 font-title font-weight-bold">
              {{ specialist.contacts.online.skype }}
            </div>
          </v-row>
        </div>
      </v-col>

      <v-col class="pa-0 col-2 d-flex align-end">
        <div>
          <v-btn outlined color="blue lighten-3" class="mb-2" width="100%" elevation="0">
            написать
          </v-btn>
          <v-btn outlined color="blue lighten-3" class="mb-2" width="100%" elevation="0"
                 @click="contactsVisible = true">
            контакты
          </v-btn>
          <v-btn outlined color="blue lighten-3" width="100%" elevation="0">
            записаться
          </v-btn>

        </div>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
import UiOrderBar from "@/components/UI/UiOrderBar";

export default {
  name: "SpecialistCard",
  components: {UiOrderBar},
  data() {
    return {
      contactsVisible: false
    }
  },
  props: {
    specialist: Object
  }
}
</script>

<style scoped>

</style>