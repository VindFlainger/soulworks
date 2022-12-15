<template>
  <v-card
      class="pa-3"
      outlined
  >
    <v-row>

      <v-badge
          overlap
          color="purple"
          offset-x="20"
          offset-y="20"
          :value="premium"
      >
        <template v-slot:badge>
          <v-icon size="22">mdi-star</v-icon>
        </template>

        <ui-avatar
            :img-size="256"
            :size="150"
            :images="avatar?.images"
        ></ui-avatar>
      </v-badge>

      <v-col>

        <v-card-title class="pa-0 mb-3">
          <router-link
              :to="{name: 'profile', params: {id: id }}"
              class="font-title fs-20 font-weight-bold black--text text-decoration-none"
          >
            {{ name }} {{ surname }}
          </router-link>
        </v-card-title>

        <v-card-subtitle class="text-left pa-0">
          <span v-if="degree.approve">
            {{ degree.name }},
          </span>

          <span>
            {{ registered | experience }} на сайте,
          </span>

          <span>
           {{ active | online(sex) }}
          </span>
        </v-card-subtitle>

        <v-row
            class="ml-n2"
            align="center"
        >
          <v-rating
              class="text-left"
              readonly
              size="20"
              :value="reviews.reduce((accum, el) => accum + el.stars ,0) / reviews.length"
              color="blue lighten-3"
              background-color="grey"
              half-increments
          >
          </v-rating>

          <span class="fs-14 font-title">( {{ reviews.length }} )</span>
        </v-row>

        <ui-order-bar
            class="pt-2"
            :orders=" $store.state.content.medals.filter(
                        medal => [
                        ...[
                         sex,
                          stats.confirmed >= 100 ? 'hardwoker' : null,
                          stats.cancelled >= 100 ? 'cancelman' : null,
                          stats.missed >= 100 ? 'truant' : null,
                          premium >= Date.now() ? 'premium' : null,
                        ],
                        ...medals].includes(medal.name))"
        ></ui-order-bar>

      </v-col>

    </v-row>

    <v-row class="mt-4 pb-3 bt-3">
      <div class="fs-16 font-title font-weight-bold">Краткое описание</div>
      <div class="fs-14 text-left">
        {{ shortAbout }}
      </div>
    </v-row>

    <v-row class="mt-4">

      <v-col class="pa-0 fs-12">
        <v-row class="text-left">
          <div>
            <v-icon size="40" color="green lighten-3">mdi-cash</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="opportunities.internal">
              Очная консультация от {{ internalPrice.min | price }} до
              {{ internalPrice.max | price }}
            </div>
            <div>
              Онлайн консультация от {{ onlinePrice.min | price }} до
              {{ onlinePrice.max | price }}
            </div>
          </div>
        </v-row>

        <v-row class="text-left mt-2" align="center">
          <div>
            <v-icon size="40" color="yellow accent-3">mdi-room-service-outline</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="opportunities.children">Работа с детьми</div>
            <div v-if="opportunities.teens">Работа с подростками</div>
            <div v-if="opportunities.family">Семейный психолог</div>
            <div v-if="opportunities.internal">Возможнен личный прием</div>
            <div
                v-if="!opportunities.children && !opportunities.teens &&
                !opportunities.family && !opportunities.internal">Онлайн консултации
            </div>
          </div>
        </v-row>

        <v-row class="text-left mt-2" align="center"
               v-if="contacts.address || contacts.connection">
          <div>
            <v-icon size="40" color="indigo lighten-3">mdi-account-box-outline</v-icon>
          </div>
          <div class="ml-2">
            <div v-if="contacts.address">Адрес: {{ contacts.address }}</div>
            <div v-if="contacts.connection">Связь: {{ contacts.connection }}</div>
          </div>
        </v-row>

      </v-col>


      <v-col class="pa-0 col-2 d-flex align-end">
        <div>

          <ui-default-button
              @click="$router.push({name: 'chat', params: {id}})"
              v-if="$route.params.id !== $store.state.id"
              class="mb-2" width="100%">
            Написать
          </ui-default-button>

          <ui-default-button
              class="mb-2"
              width="100%"
              @click="$emit('open-contacts', )">
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
    id: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    shortAbout: {
      type: String,
    },
    avatar: {
      type: Object,
    },
    registered: {
      type: Number,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    reviews: {
      type: Array,
      required: true
    },
    internalPrice: {
      type: Object
    },
    onlinePrice: {
      type: Object
    },
    opportunities: {
      type: Object,
      required: true
    },
    contacts: {
      type: Object,
      required: true
    },
    premium: {
      type: Number,
      default: 0
    },
    stats: {
      type: Object,
      required: true
    },
    medals: {
      type: Array,
      required: true
    },
    degree: {
      type: Object,
      required: true
    },
  },
  methods: {
    booking() {
      if (!this.$store.getters.isLogin) {
        this.$root.$emit('show-login')
      } else {
        this.$emit('open-booking')
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