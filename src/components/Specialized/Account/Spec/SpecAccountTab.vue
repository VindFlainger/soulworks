<template>
  <v-card class="pa-8 fill-height">
    <span style="position:absolute; right: 30px; top: 20px; cursor: pointer"
          @click="$router.push({name: 'specEdit'})"
          class="fs-16 blue--text text--lighten-3 text-decoration-underline">
      Редактировать
    </span>
    <v-row>
      <ui-avatar size="200" :images="avatar?.images" :img-size="512">

      </ui-avatar>
      <v-col class="ml-11">
        <div class="font-title fs-24">
          <router-link
              class="text-decoration-none black--text"
              :to="{name: 'profile', params: {id: userId}}">
            {{ surname }} {{ name }}
          </router-link>

        </div>

        <div>
          {{ email }}
        </div>
      </v-col>
    </v-row>
    <div class="mt-3">
      <div class="font-title font-weight-bold fs-18">
        Специализация:
        <v-chip v-for="specialization in specializations" :key="specialization._id" class="ma-1" small>
          {{ specialization.text }}
        </v-chip>
      </div>
      <div class="font-title font-weight-bold fs-18 mt-2">
        Методы:
        <v-chip v-for="method in methods" :key="method._id" class="ma-1" small>
          {{ method.text }}
        </v-chip>
      </div>
    </div>


    <div class="mt-5" v-if="shortAbout">
      <div class="font-title font-weight-bold fs-18">Описание:</div>
      <div class="font-text fs-16 font-weight-regular ">{{ shortAbout }}</div>
    </div>

    <div class="mt-5" v-if="fullAbout">
      <div class="font-title font-weight-bold fs-18">Обо мне:</div>
      <div class="font-text fs-16 font-weight-regular  ">{{ fullAbout }}</div>
    </div>

    <div class="mt-5" v-if="(links && links.length) || address || connection || contactPhone">
      <div class="font-title font-weight-bold fs-18">
        Контактная информация:
      </div>
      <div>
        <div v-if="address">
          <span class="font-text fs-16">Адрес: </span><code>{{ address }}</code>
        </div>
        <div v-if="connection">
          <span class="font-text fs-16">Связь: </span><code>{{ connection }}</code>
        </div>

        <v-row align="center" v-if="contactPhone">
          <span class="font-text fs-16">Телефон:</span><code class="ml-1">+{{ contactPhone }}</code>
          <v-img v-for="messenger in messengers" :key="messenger"
                 :src="require(`@/assets/images/networks/${messenger}.png`)" max-width="28" height="28"
                 class="d-inline-block ma-1"></v-img>
        </v-row>

        <v-row align="center" v-if="links && links.length">
          <span class="font-text fs-16">Социальные сети:</span>
          <!-- TODO: Implement prefixes to links-->
          <a v-for="link in links" :key="link.name" :href="link.link" style="max-height: 32px;">
            <v-img
                :src="require(`@/assets/images/networks/${link.name}.png`)"
                max-width="28" height="28"
                class="d-inline-block ma-1">
            </v-img>
          </a>

        </v-row>
      </div>

    </div>

    <div class="mt-5">
      <div class="font-title font-weight-bold fs-18">Статистика:</div>
      <any-statistic-sessions class="ml-3"
                              :missed="sessionStats.missed"
                              :confirmed="sessionStats.confirmed"
                              :cancelled="sessionStats.cancelled"
      ></any-statistic-sessions>
    </div>


  </v-card>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar";
import requests from "@/mixins/requests";
import AnyStatisticSessions from "@/components/Specialized/Account/Any/Statistic/AnyStatisticSessions";

export default {
  name: "SpecAccountTab",
  data() {
    return {
      userId: '',
      avatar: '',
      name: '',
      surname: '',
      email: '',
      sex: '',
      role: '',
      phone: '',
      shortAbout: '',
      fullAbout: '',

      methods: [],
      specializations: [],
      opportunities: [],

      internalPrices: [],
      onlinePrices: [],

      connection: '',
      address: '',

      contactPhone: '',
      contactEmail: '',
      messengers: [],
      links: [],

      sessionStats: ''
    }
  },

  methods: {
    getAccountData() {
      this.getData('http://localhost:3000/spec/account')
          .then(resp => {
                this.userId = resp.data.id
                this.name = resp.data.name
                this.surname = resp.data.surname
                this.email = resp.data.email
                this.sex = resp.data.sex
                this.phone = resp.data.number
                this.avatar = resp.data.avatar
                this.role = resp.data.role
                this.specializations = resp.data.specializations
                this.methods = resp.data.methods
                this.opportunities = resp.data.opportunities
                this.shortAbout = resp.data.about.short
                this.fullAbout = resp.data.about.full
                this.messengers = resp.data.contacts.messengers
                this.contactPhone = resp.data.contacts.phone
                this.contactEmail = resp.data.contactEmail
                this.links = resp.data.contacts.links
                this.onlinePrices = resp.data.price.online
                this.internalPrices = resp.data.price.internal
                this.connection = resp.data.contacts.connection
                this.address = resp.data.contacts.address
                this.sessionStats = resp.data.statistic.sessions
              }
          )
          .catch()
    }
  },
  watch: {
    '$route'(to, from) {
      if (from.name === 'specEdit') {
        this.getAccountData()
      }
    }
  },
  components: {
    AnyStatisticSessions,
    UiAvatar
  },
  mixins: [requests],
  mounted() {
    this.getAccountData()
  },
}
</script>

<style scoped>

</style>

