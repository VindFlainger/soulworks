<template>
  <v-card v-if="accountData" class="pa-8 fill-height">
    <span style="position:absolute; right: 30px; top: 20px; cursor: pointer"
          @click="$router.push({name: 'specEdit'})"
          class="fs-16 blue--text text--lighten-3 text-decoration-underline">
      Редактировать
    </span>
    <v-row>
      <v-avatar size="200">
        <v-img :src="accountData.avatar"></v-img>
      </v-avatar>
      <v-col class="ml-11">
        <div class="font-title fs-24">
          <router-link
              class="text-decoration-none black--text"
              :to="{name: 'profile', params: {id: accountData._id}}">
            {{ accountData.surname }} {{ accountData.name }}
          </router-link>

        </div>
        <div class="ml-n2">
          <v-rating length="5" readonly :value="accountData.rating.avgStars" half-increments class="d-inline"
                    color="blue lighten-3"
                    background-color="grey"></v-rating>
          <span class="fs-14 font-title ">( {{ accountData.rating.count }} )</span>
        </div>
        <div>
          {{ accountData.email }}
        </div>
      </v-col>
    </v-row>
    <div class="mt-3">
      <div class="font-title font-weight-bold fs-18">
        Специализация:
        <v-chip v-for="specialization in accountData.specializations" :key="specialization._id" class="ma-1" small>
          {{ specialization.text }}
        </v-chip>
      </div>
      <div class="font-title font-weight-bold fs-18 mt-2">
        Методы:
        <v-chip v-for="method in accountData.methods" :key="method._id" class="ma-1" small>
          {{ method.text }}
        </v-chip>
      </div>
    </div>


    <div class="mt-5">
      <div class="font-title font-weight-bold fs-18">Описание:</div>
      <div class="font-text fs-16 font-weight-regular ">{{ accountData.about.short }}</div>
    </div>

    <div class="mt-5">
      <div class="font-title font-weight-bold fs-18">Обо мне:</div>
      <div class="font-text fs-16 font-weight-regular  ">{{ accountData.about.full }}</div>
    </div>

    <div class="mt-5">
      <div class="font-title font-weight-bold fs-18">Контактная информация:</div>
      <div>
        <div>
          <span class="font-text fs-16">Адрес: </span><code v-html="accountData.contacts.address"></code>
        </div>
        <div>
          <span class="font-text fs-16">Связь: </span><code>{{ accountData.contacts.connection }}</code>
        </div>
        <div>

        </div>

        <v-row align="center">
          <span class="font-text fs-16">Телефон:</span><code class="ml-1">+{{ accountData.contacts.phone }}</code>
          <v-img v-for="messenger in accountData.contacts.messengers" :key="messenger"
                 :src="require(`@/assets/images/networks/${messenger}.png`)" max-width="28" height="28"
                 class="d-inline-block ma-1"></v-img>
        </v-row>

        <v-row align="center">
          <span class="font-text fs-16">Социальные сети:</span>
          <!-- TODO: Implement prefixes to links-->
          <a v-for="link in accountData.contacts.links" :key="link.name" :href="link.link" style="max-height: 32px;">
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
      <div class="ml-3">
        <v-row align="center">
          <div style="min-width: 100px"><kbd class="font-weight-bold font-title fs-14">Занятия</kbd></div>
          <v-col class="pa-0">
            <div>
              Занятий проведено - {{ accountData.statistic.sessions.confirmed }}
              <v-progress-linear striped height="10" style="max-width: 300px"
                                 color="green lighten-3"
                                 rounded
                                 :value="
                           accountData.statistic.sessions.confirmed/
                           (accountData.statistic.sessions.confirmed + accountData.statistic.sessions.cancelled + accountData.statistic.sessions.missed) * 100"
                                 background-color="grey lighten-2"
              ></v-progress-linear>
            </div>

            <div class="mt-2">
              Занятий отменено - {{ accountData.statistic.sessions.cancelled }}
              <v-progress-linear striped height="10" style="max-width: 300px"
                                 color="orange lighten-3"
                                 rounded
                                 :value="
                           accountData.statistic.sessions.cancelled/
                           (accountData.statistic.sessions.confirmed + accountData.statistic.sessions.cancelled + accountData.statistic.sessions.missed) * 100"
                                 background-color="grey lighten-2"
              ></v-progress-linear>
            </div>

            <div class="mt-2">
              Занятий пропущено - {{ accountData.statistic.sessions.missed }}
              <v-progress-linear striped height="10" style="max-width: 300px"
                                 color="red lighten-3"
                                 rounded
                                 :value="
                           accountData.statistic.sessions.missed/
                           (accountData.statistic.sessions.confirmed + accountData.statistic.sessions.cancelled + accountData.statistic.sessions.missed) * 100"
                                 background-color="grey lighten-2"
              ></v-progress-linear>
            </div>
          </v-col>
        </v-row>

      </div>
    </div>

    <div class="mt-5">
      <div class="font-title font-weight-bold fs-18">Медали и достижения:</div>
      <div class="mt-1">
        <ui-order-bar :size="65" :orders="[
            {
              show: accountData.privileges.medals.includes('admin'),
              name: 'Администратор проекта',
              color: 'green lighten-4',
              icon: 'mdi-code-tags'
            },
            {
              show: accountData.privileges.medals.includes('pioneer'),
              name: 'С проектом с момента его появления',
              color: 'indigo lighten-4',
              icon: 'mdi-account-cowboy-hat-outline'
            },
            {
              show: accountData.sex === 'male',
              name: 'мужчина',
              color: 'blue lighten-4',
              icon: 'mdi-gender-male'
            },
            {
              show: accountData.sex === 'female',
              name: 'женщина',
              color: 'pink lighten-4',
              icon: 'mdi-gender-female'
            },
            {
              show: accountData.statistic.sessions.confirmed >= 100,
              name: 'провел более ста занятий',
              color: 'indigo lighten-4',
              icon: 'mdi-decagram-outline'
            },
            {
              show: accountData.statistic.sessions.cancelled >= 100,
              name: 'отменил более ста занятий',
              color: 'red lighten-4',
              icon: 'mdi-close'
            },
            {
              show: accountData.statistic.sessions.missed >= 100,
              name: 'пропустил более ста занятий',
              color: 'red lighten-4',
              icon: 'mdi-call-missed'
            },
            {
              show: accountData.privileges.premium,
              name: 'владелец премиум аккаунта',
              color: 'purple lighten-4',
              icon: 'mdi-star'
            },
        ]">

        </ui-order-bar>

      </div>
    </div>


  </v-card>
</template>

<script>
import UiOrderBar from "@/components/UI/UiOrderBar";

export default {
  name: "SpecAccountTab",
  components: {UiOrderBar},
  data() {
    return {
      accountData: undefined
    }
  },

  methods: {
    getAccountData() {
      this.getData('http://localhost:3000/spec/profile/account', {handleError: true, handleErrorResponse: true})
          .then(resp => this.accountData = resp.data)
          .catch()
    }
  },
  mounted() {
    this.getAccountData()
  },
  watch: {
    '$route'(to, from){
      if (from.name === 'specEdit'){
        this.getAccountData()
      }
    }
  }
}
</script>

<style scoped>

</style>