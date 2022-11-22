<template>
  <v-card class="pa-8 fill-height">
    <span style="position:absolute; right: 30px; top: 20px; cursor: pointer"
          @click="$router.push({name: 'userEdit'})"
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
import AnyStatisticSessions from "@/components/Account/Any/Statistic/AnyStatisticSessions";

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


      sessionStats: ''
    }
  },

  methods: {
    getAccountData() {
      this.getData('http://localhost:3000/user/account')
          .then(resp => {
                this.userId = resp.data.id
                this.name = resp.data.name
                this.surname = resp.data.surname
                this.email = resp.data.email
                this.sex = resp.data.sex
                this.phone = resp.data.number
                this.avatar = resp.data.avatar
                this.role = resp.data.role
                this.sessionStats = resp.data.statistic.sessions
              }
          )
          .catch()
    }
  },
  watch: {
    '$route'(to, from) {
      if (from.name === 'userEdit') {
        this.getAccountData()
      }
    }
  },
  mixins: [requests],
  components: {AnyStatisticSessions, UiAvatar},
  mounted() {
    this.getAccountData()
  },
}
</script>

<style scoped>

</style>

