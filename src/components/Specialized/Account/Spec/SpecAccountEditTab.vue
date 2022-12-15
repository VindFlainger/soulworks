<template>
  <div>
    <cropping-avatar-dialog
        :value="croppingDialogVisible"
        @close="croppingDialogVisible = false"
        @change="setAvatar"
    ></cropping-avatar-dialog>

    <v-card
        class="pa-4"
        elevation="0"
    >
      <span
          class="fs-16 blue--text text--lighten-3 text-decoration-underline"
          style="position:absolute; right: 30px; top: 20px; cursor: pointer"
          @click="$router.push({name: 'specAccount'})"
      >
         Вернуться
       </span>

      <v-row justify="start">
        <v-col style="min-width: 250px; max-width: 250px">
          <v-badge
              offset-x="54"
              offset-y="54"
              color="none"
              bottom
              overlap
          >
            <template v-slot:badge>
              <v-btn
                  style="outline: 1px solid black"
                  @click="croppingDialogVisible = true"
                  elevation="0"
                  color="white"
                  fab
                  small
              >
                <v-icon size="25">mdi-plus</v-icon>
              </v-btn>
            </template>

            <ui-avatar
                size="200"
                :images="avatar?.images"
                :img-size="256"
            ></ui-avatar>
          </v-badge>
        </v-col>

        <v-col class="col-4">
          <div class="fs-18 font-weight-bold mb-2 font-title">Личная информация</div>
          <v-form
              ref="personForm"
              v-model="personValid"
              lazy-validation
          >
            <name-input
                v-model="name"
                label="Имя"
                @change="setPerson"
            ></name-input>

            <name-input
                v-model="surname"
                label="Фамилия"
                @change="setPerson"
            ></name-input>

            <default-input
                label="Пол"
                :value="sex | sex | capitalize"
                disabled=""
            ></default-input>
          </v-form>
        </v-col>

        <v-col class="col-4">
          <div class="fs-18 font-weight-bold mb-2 font-title">Бизнес информация</div>

          <phone-input
              v-model="phone"
              disabled
          ></phone-input>

          <default-input
              v-model="email"
              label="Почта"
              disabled
          ></default-input>

          <default-input
              label="Роль"
              :value="role | role | capitalize"
              disabled=""
          ></default-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col style="max-width: 350px">
          <div class="fs-18 font-weight-bold mb-2 font-title">Услуги</div>

          <v-form
              ref="servicesForm"
              v-model="servicesValid"
              lazy-validation
          >
            <select-input
                v-model="methods"
                multiple
                small-chips
                :items="methodsSelectOptions.map(opt => ({...opt, value: opt._id}))"
                label="Методы"
                @blur="setServices"
            ></select-input>

            <select-input
                v-model="specializations"
                :items="specializationSelectOptions.map(opt => ({...opt, value: opt._id}))"
                label="Специализации"
                small-chips
                multiple
                @blur="setServices"
            ></select-input>

            <select-input
                v-model="opportunities"
                :required="false"
                :items="opportunitiesSelectOption"
                label="Возможности"
                multiple
                small-chips
                @blur="setServices"
            ></select-input>

          </v-form>
        </v-col>

        <v-col>
          <div class="fs-18 font-weight-bold mb-2 font-title">Презентация</div>

          <v-form
              ref="aboutForm"
              v-model="aboutValid"
              lazy-validation
          >

            <text-area-input
                class="mt-1"
                v-model="shortAbout"
                :auto-grow="false"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!@# :%^ё*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
                placeholder="Визитка"
                counter="400"
                maxlength="400"
                no-resize
                @change="setAbout"
            ></text-area-input>

            <text-area-input
                class="mt-1"
                v-model="fullAbout"
                :auto-grow="false"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!@# :%^*ё()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
                height="200"
                counter="1000"
                maxlength="1000"
                placeholder="Обо мне"
                no-resize
                @change="setAbout"
            ></text-area-input>

          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col style="max-width: 450px">
          <div class="fs-18 font-weight-bold mb-2 font-title">Цена онлайн консультации</div>

          <range-input
              :min.sync="onlinePrices.min"
              :max.sync="onlinePrices.max"
              :max-limit="1000"
              :min-limit="0"
              @change="setPrices"
          ></range-input>

          <div class="fs-18 font-weight-bold mb-2 font-title">Цена очной консультации</div>

          <range-input
              :min.sync="internalPrices.min"
              :max.sync="internalPrices.max"
              :max-limit="1000"
              :min-limit="0"
              @change="setPrices"
          ></range-input>
        </v-col>

        <v-col>
          <v-form
              ref="connectionForm"
              v-model="connectionValid"
              lazy-validation
          >

            <div class="fs-18 font-weight-bold mb-2 font-title">Связь и адрес</div>

            <default-input
                v-model="connection"
                placeholder="Коммуникация"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!:@# %^ё*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
                @change="setConnectionAndAddress"
            ></default-input>

            <default-input
                v-model="address"
                placeholder="Адрес"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!:@# %^ё*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
                @change="setConnectionAndAddress"
            ></default-input>

          </v-form>
        </v-col>
      </v-row>


      <v-row>
        <v-col style="max-width: 350px">
          <div class="fs-18 font-weight-bold font-title mb-2">Контакты</div>

          <v-form lazy-validation ref="contactsForm" v-model="contactsValid">

            <v-row>
              <phone-input
                  class="phone-input"
                  v-model="contactPhone"
                  label="Контактный телефон"
                  :required="false"
                  @change="setContacts"
              ></phone-input>

              <div class="fs-12 mt-n1 grey--text text--darken-2 mb-1">Вы можете указать какие социальные сети или
                мессенджеры доступны по этому номеру.
              </div>

              <picture-select-input
                  class="mt-n1"
                  v-model="messengers"
                  :items="messengersOptions.map(opt => ({value: opt, img: require(`@/assets/images/networks/${opt}.png`)}))"
                  @input="setContacts"
              ></picture-select-input>
            </v-row>

            <email-input
                class="mt-5"
                v-model="contactEmail"
                label="Контактная почта"
                :required="false"
                @change="setContacts"
            ></email-input>

          </v-form>
        </v-col>

        <v-col>
          <div class="fs-18 font-weight-bold font-title">Социальные сети</div>

          <div class="fs-12 mt-n1 grey--text text--darken-2 mb-2">Вы можете указать идентификаторы ваших социальных
            сетей для перехода к ним по клику. Идентификатор - простая строка без спецсимволов.
          </div>

          <v-form
              ref="linksForm"
              v-model="linksValid"
              lazy-validation
          >
            <v-list
                class="ma-0 pa-0"
                v-for="messenger in messengersOptions"
                :key="messenger"
            >
              <v-list-item>
                <v-img
                    class="d-inline-block"
                    style="position:relative; top: 2px"
                    :max-width="32"
                    :src="require(`@/assets/images/networks/${messenger}.png`)"
                ></v-img>

                <default-input
                    class="d-inline-block ml-3"
                    :value="links.find(link => link.name === messenger)?.link"
                    @change="setLinks($event, messenger)"
                    hide-details
                    prefix="/"
                    :rules="[v => !v || (!!v && $validator.isAlphanumeric(v))]"
                    :required="false"
                ></default-input>
              </v-list-item>
            </v-list>
          </v-form>
        </v-col>
      </v-row>

    </v-card>

  </div>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import PhoneInput from "@/components/UI/Inputs/PhoneInput";
import CroppingAvatarDialog from "@/components/Dialogs/CroppingAvatarDialog";
import {sex, role} from "@/filters/logic";
import SelectInput from "@/components/UI/Inputs/SelectInput";
import TextAreaInput from "@/components/UI/Inputs/TextAreaInput";
import EmailInput from "@/components/UI/Inputs/EmailInput";
import PictureSelectInput from "@/components/UI/Inputs/PictureSelectInput";
import NameInput from "@/components/UI/Inputs/NameInput";
import RangeInput from "@/components/UI/Inputs/RangeInput";
import UiAvatar from "@/components/UI/UiAvatar";
import requests from "@/mixins/requests";


export default {
  name: "SpecAccountEditTab",
  components: {
    UiAvatar,
    RangeInput,
    NameInput,
    PictureSelectInput,
    EmailInput,
    TextAreaInput,
    SelectInput,
    CroppingAvatarDialog,
    PhoneInput,
    DefaultInput
  },
  filters: {
    sex,
    role
  },
  mixins: [requests],
  data() {
    return {
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


      methodsSelectOptions: [],
      specializationSelectOptions: [],
      opportunitiesSelectOption: [
        {
          value: 'internal',
          text: 'очная консультация'
        },
        {
          value: 'teens',
          text: 'работа с подростками'
        },
        {
          value: 'family',
          text: 'семейная консультация'
        },
        {
          value: 'children',
          text: 'работа с детьми'
        },
      ],

      messengersOptions: ['vk', 'whatsapp', 'viber', 'telegram', 'facebook', 'instagram'],

      croppingDialogVisible: false,

      personValid: true,
      aboutValid: true,
      contactsValid: true,
      linksValid: true,
      servicesValid: true,
      connectionValid: true
    }
  },
  methods: {
    getAccountData() {
      this.getData('http://localhost:3000/spec/account')
          .then(resp => {
            this.name = resp.data.name
            this.surname = resp.data.surname
            this.email = resp.data.email
            this.contactEmail = resp.data.contactEmail
            this.sex = resp.data.sex
            this.phone = resp.data.number
            this.contactPhone = resp.data.contacts.phone
            this.avatar = resp.data.avatar
            this.role = resp.data.role
            this.specializations = resp.data.specializations.map(spec => spec._id)
            this.methods = resp.data.methods.map(mt => mt._id)
            this.opportunities = resp.data.opportunities
            this.shortAbout = resp.data.about.short
            this.fullAbout = resp.data.about.full
            this.messengers = resp.data.contacts.messengers
            this.links = resp.data.contacts.links
            this.onlinePrices = resp.data.price.online
            this.internalPrices = resp.data.price.internal
            this.connection = resp.data.contacts.connection
            this.address = resp.data.contacts.address
          })
    },
    getSelectOptions() {
      this.getData('http://localhost:3000/filters',)
          .then(resp => {
            this.specializationSelectOptions = resp.data.specializations
            this.methodsSelectOptions = resp.data.methods
          })
          .catch()
    },
    setAvatar(avatar) {
      this.putData('http://localhost:3000/spec/account/avatar', {avatarId: avatar.id})
          .then(() => {
            this.croppingDialogVisible = false
            this.avatar = avatar
          })
          .catch()
    },
    setPerson() {
      if (this.$refs.personForm.validate()) {
        this.putData('http://localhost:3000/spec/account/person', {name: this.name, surname: this.surname})
            .then(() => {
              this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
            })
            .catch()
      }
    },
    setAbout() {
      if (this.$refs.aboutForm.validate()) {
        this.putData('http://localhost:3000/spec/account/about',
            {
              shortAbout: this.shortAbout,
              fullAbout: this.fullAbout
            })
            .then(() => {
              this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
            })
            .catch()
      }
    },
    setContacts() {
      if (this.$refs.contactsForm.validate()) {
        this.putData('http://localhost:3000/spec/account/contacts',
            {
              messengers: this.messengers,
              email: this.contactEmail || undefined,
              phone: this.contactPhone.replaceAll(/[-()+ ]/g, '')
            })
            .then(() => {
              this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
            })
            .catch()
      }
    },
    setLinks(link, messenger) {
      if (this.$refs.linksForm.validate()) {
        this.links = this.links.filter(link => link.name !== messenger)

        if (link) this.links.push({name: messenger, link})

        this.putData('http://localhost:3000/spec/account/links',
            {
              links: this.links,
            })
            .then(() => {
              this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
            })
            .catch()
      }
    },
    setServices() {
      if (this.$refs.servicesForm.validate()) {
        this.putData('http://localhost:3000/spec/account/services',
            {
              opportunities: this.opportunities,
              methods: this.methods,
              specializations: this.specializations
            })
            .then(() => {
              this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
            })
            .catch()
      }
    },
    setPrices() {
      this.putData('http://localhost:3000/spec/account/price',
          {
            minOnline: this.onlinePrices.min,
            maxOnline: this.onlinePrices.max,
            minInternal: this.internalPrices.min,
            maxInternal: this.internalPrices.max
          })
          .then(() => {
            this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
          })
          .catch()
    },
    setConnectionAndAddress() {
      this.$refs.connectionForm.validate()
      {
        this.putData('http://localhost:3000/spec/account/connection',
            {
              address: this.address,
              connection: this.connection
            })
            .then(() => {
              this.$root.$emit('push-message', {text: 'Данные успешно обновлены', type: 'success', time: 2000})
            })
            .catch()
      }
    }
  },
  mounted() {
    this.getAccountData()
    this.getSelectOptions()
  },
  metaInfo: {
    title: 'Редактировать профиль'
  }
}
</script>

<style scoped>
.phone-input >>> .v-input {
  min-width: 300px;
}
</style>