<template>
  <v-card class="pa-3" outlined>
    <v-row>

      <v-badge overlap color="purple" offset-x="20" offset-y="20" :value="specialist.privileges.premium">
        <template v-slot:badge>
          <v-icon size="22">mdi-star</v-icon>
        </template>
        <ui-avatar :img-size="256" :size="150" :images="specialist.avatar?.images"></ui-avatar>
      </v-badge>

      <v-col>
        <v-card-title class="pa-0 mb-3">
          <router-link :to="{name: 'profile', params: {id: specialist._id }}"
                       class="font-title fs-20 font-weight-bold black--text text-decoration-none">{{ specialist.name }}
            {{ specialist.surname }}
          </router-link>
        </v-card-title>
        <v-card-subtitle class="text-left pa-0">
          <span v-if="specialist.degree.approve">
            {{ specialist.degree.name }},
          </span>

          <span>
            {{ specialist.registered | experience }} на сайте,
          </span>

          <span>
           {{ specialist.active | online(specialist.sex) }}
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
                      :orders=" $store.state.content.medals.filter(
                        medal => [
                        ...[
                          specialist.sex,
                          specialist.stats.confirmed >= 100 ? 'hardwoker' : null,
                          specialist.stats.cancelled >= 100 ? 'cancelman' : null,
                          specialist.stats.missed >= 100 ? 'truant' : null,
                          specialist.privileges.premium >= Date.now() ? 'premium' : null,
                        ],
                        ...specialist.privileges.medals].includes(medal.name))"
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
            <div v-if="specialist.opportunities.internal">Возможнен личный прием</div>
            <div
                v-if="!specialist.opportunities.children && !specialist.opportunities.teens &&
                !specialist.opportunities.family && !specialist.opportunities.internal">Онлайн консултации
            </div>
          </div>
        </v-row>

        <v-row class="text-left mt-2" align="center"
               v-if="specialist.contacts.address || specialist.contacts.connection">
          <div>
            <v-icon size="40" color="indigo lighten-3">mdi-account-box-outline</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="specialist.contacts.address">Адрес: {{ specialist.contacts.address }}</div>
            <div v-if="specialist.contacts.connection">Связь: {{ specialist.contacts.connection }}</div>
          </div>
        </v-row>

      </v-col>


      <v-col class="pa-0 col-2 d-flex align-end">
        <div>
          <ui-default-button class="mb-2" width="100%">Написать</ui-default-button>
          <ui-default-button
              class="mb-2"
              width="100%"
              @click="$emit('open-contacts', {...specialist.contacts, name: specialist.name, surname: specialist.surname})">
            Контакты
          </ui-default-button>
          <ui-default-button width="100%" @click="booking" v-if="$store.state.role !== 'spec'">
            Запись
          </ui-default-button>
        </div>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
import UiOrderBar from "@/components/UI/UiOrderBar";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiAvatar from "@/components/UI/UiAvatar";
import {online} from "@/filters/logic";

export default {
  name: "SpecialistCard",
  components: {UiAvatar, UiDefaultButton, UiOrderBar},
  props: {
    specialist: Object
  },
  methods: {
    booking() {
      if (!this.$store.getters.isLogin) {
        this.$root.$emit('show-login')
      } else {
        this.$emit('open-booking', this.specialist._id)
      }
    }
  },
  filters: {
    online
  }

}
</script>

<style scoped>

</style>