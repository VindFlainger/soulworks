<template>
  <account-base-layout
      :preview-title="$t('account.spec.personal-data.section-name')"
  >
    <span
        class="fs-16 blue--text text--lighten-3 text-decoration-underline"
        style="position:absolute; right: 30px; top: 20px; cursor: pointer"
        @click="$router.push({name: 'specEdit'})"
    >
      {{ $t('common.buttons.edit') }}
    </span>

    <v-row align="center" align-md="start">

      <ui-avatar
          :size="viewportHook({base: 75, md: 150})"
          :images="avatar?.images"
          :img-size="256"
      ></ui-avatar>

      <v-col class="ml-1 ml-md-4">
        <div class="font-title text-h5 comfortaa">
          <router-link
              class="text-decoration-none black--text"
              :to="{name: 'profile', params: {id: userId}}">
            {{ surname }} {{ name }}
          </router-link>
        </div>
        <p>
          {{ email }}
        </p>
      </v-col>

    </v-row>

    <div class="mt-3">
      <div class="font-title font-weight-bold fs-18">
        {{ $t('account.spec.personal-data.specialization') }}:
        <v-chip
            class="ma-1"
            v-for="specialization in specializations"
            :key="specialization._id"
            small
        >
          {{ specialization.text }}
        </v-chip>
      </div>
      <div class="font-title font-weight-bold fs-18 mt-2">
        {{ $t('account.spec.personal-data.methods') }}:
        <v-chip
            class="ma-1"
            v-for="method in methods"
            :key="method._id"
            small
        >
          {{ method.text }}
        </v-chip>
      </div>
    </div>

    <div class="mt-5" v-if="shortAbout">
      <div class="font-title font-weight-bold fs-18">{{ $t('account.spec.personal-data.description') }}:</div>
      <div class="font-text text-body-2 text-md-body-1">{{ shortAbout }}</div>
    </div>

    <div class="mt-5" v-if="fullAbout">
      <div class="font-title font-weight-bold fs-18">{{ $t('account.spec.personal-data.about-me') }}:</div>
      <div class="font-text text-body-2 text-md-body-1">{{ fullAbout }}</div>
    </div>

    <spec-account-contacts
        class="mt-5"
        v-if="(links && links.length) || address || connection || contactPhone"
        :links="links"
        :address="address"
        :connection="connection"
        :contact-phone="contactPhone"
        :messengers="messengers"
    ></spec-account-contacts>

    <div class="mt-5">
      <div class="font-title font-weight-bold fs-18">{{ $t('account.spec.personal-data.stats') }}:</div>
      <any-statistic-sessions
          class="ml-3"
          :missed="sessionStats.missed"
          :confirmed="sessionStats.confirmed"
          :cancelled="sessionStats.cancelled"
      ></any-statistic-sessions>
    </div>

  </account-base-layout>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar.vue";
import requests from "@/mixins/requests";
import AnyStatisticSessions from "@/components/Specialized/Account/Any/Statistic/AnyStatisticSessions.vue";
import text from "@/filters/text";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";
import SpecAccountContacts from "@/components/Specialized/Account/Spec/AcccountTab/SpecAccountContacts.vue";

export default {
  name: "SpecAccountTab",
  components: {
    SpecAccountContacts,
    AccountBaseLayout,
    AnyStatisticSessions,
    UiAvatar
  },
  mixins: [requests],
  filters: {text},
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
  watch: {
    '$route'(to, from) {
      if (from.name === 'specEdit') {
        this.getAccountData()
      }
    }
  },
  methods: {
    getAccountData() {
      this.getDataAuthed('spec/account', {handleError: true})
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
          .catch(() => {
          })
    }
  },
  mounted() {
    this.getAccountData()
  },
  metaInfo() {
    return {
      title: this.$t('account.spec.personal-data.section-name')
    }
  }
}
</script>

<style scoped>

</style>

