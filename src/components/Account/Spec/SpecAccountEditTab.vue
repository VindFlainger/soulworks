<template>
  <div>
    <cropping-avatar-dialog
        :value="croppingDialogVisible"
        @close="croppingDialogVisible = false"
        @change="setAvatar"
    ></cropping-avatar-dialog>

    <v-card class="pa-4" elevation="0">
       <span style="position:absolute; right: 30px; top: 20px; cursor: pointer"
             @click="$router.push({name: 'specAccount'})"
             class="fs-16 blue--text text--lighten-3 text-decoration-underline">
         Вернуться
       </span>


      <v-row justify="start">

        <v-col style="min-width: 250px; max-width: 250px">
          <v-badge overlap offset-x="54" offset-y="54" bottom color="none">
            <template v-slot:badge>
              <v-btn @click="croppingDialogVisible = true" fab small elevation="0" color="white"
                     style="outline: 1px solid black">
                <v-icon size="25">mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-avatar size="200">
              <v-img :src="avatar || require('@/assets/images/nophoto.png')"></v-img>
            </v-avatar>
          </v-badge>
        </v-col>

        <v-col class="col-4">
          <div class="fs-18 font-weight-bold mb-2 font-title">Личная информация</div>
          <v-form lazy-validation v-model="personValid" ref="personForm">
            <name-input label="Имя" v-model="name" @change="setPerson"></name-input>
            <name-input label="Фамилия" v-model="surname" @change="setPerson"></name-input>
            <default-input label="Пол" :value="sex | sex | capitalize" disabled=""></default-input>
          </v-form>
        </v-col>

        <v-col class="col-4">
          <div class="fs-18 font-weight-bold mb-2 font-title">Бизнес информация</div>
          <phone-input v-model="phone" disabled></phone-input>
          <default-input label="Почта" v-model="email" disabled></default-input>
          <default-input label="Роль" :value="role | role | capitalize" disabled=""></default-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col style="max-width: 350px">
          <div class="fs-18 font-weight-bold mb-2 font-title">Услуги</div>
          <v-form lazy-validation v-model="servicesValid" ref="servicesForm">
            <select-input
                multiple small-chips
                v-model="methods"
                @blur="setServices"
                :items="methodsSelectOptions.map(opt => ({...opt, value: opt._id}))"
                label="Методы">
            </select-input>
            <select-input
                multiple small-chips
                v-model="specializations"
                @blur="setServices"
                :items="specializationSelectOptions.map(opt => ({...opt, value: opt._id}))"
                label="Специализации">
            </select-input>
            <select-input
                multiple small-chips
                :required="false"
                v-model="opportunities"
                @blur="setServices"
                :items="opportunitiesSelectOption"
                label="Возможности">
            </select-input>
          </v-form>
        </v-col>

        <v-col>
          <div class="fs-18 font-weight-bold mb-2 font-title">Презентация</div>
          <v-form lazy-validation ref="aboutForm" v-model="aboutValid">
            <text-area-input
                :auto-grow="false"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!@# %^*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
                @change="setAbout"
                v-model="shortAbout"
                class="mt-1" no-resize counter="400" maxlength="400" placeholder="Визитка">
            </text-area-input>
            <text-area-input
                :auto-grow="false"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!@# %^*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
                @change="setAbout"
                v-model="fullAbout"
                no-resize height="200" class="mt-1" counter="1000" maxlength="1000" placeholder="Обо мне">
            </text-area-input>
          </v-form>
        </v-col>
      </v-row>


      <v-row>
        <v-col style="max-width: 350px">
          <div class="fs-18 font-weight-bold font-title mb-2">Контакты</div>
          <v-form lazy-validation ref="contactsForm" v-model="contactsValid">
            <v-row>
              <phone-input class="phone-input" label="Контактный телефон" v-model="contactPhone"
                           @change="setContacts"></phone-input>
              <div class="fs-12 mt-n1 grey--text text--darken-2 mb-1">Вы можете указать какие социальные сети или
                мессенджеры доступны по этому номеру.
              </div>
              <picture-select-input
                  class="mt-n1"
                  v-model="messengers"
                  @input="setContacts"
                  :items="messengersOptions.map(opt => ({value: opt, img: require(`@/assets/images/networks/${opt}.png`)}))">
              </picture-select-input>
            </v-row>
            <email-input label="Контактная почта" v-model="contactEmail" class="mt-5"
                         @change="setContacts"></email-input>
          </v-form>
        </v-col>

        <v-col>
          <div class="fs-18 font-weight-bold font-title">Социальные сети</div>
          <div class="fs-12 mt-n1 grey--text text--darken-2 mb-2">Вы можете указать идентификаторы ваших социальных
            сетей для перехода к ним по клику. Идентификатор - простая строка без спецсимволов.
          </div>
          <v-form lazy-validation v-model="linksValid" ref="linksForm">
            <v-list v-for="messenger in messengersOptions" :key="messenger" class="ma-0 pa-0">
              <v-list-item>
                <v-img :max-width="32" :src="require(`@/assets/images/networks/${messenger}.png`)"
                       class="d-inline-block"
                       style="position:relative; top: 2px;"></v-img>
                <default-input
                    :value="links.find(link => link.name === messenger)?.link"
                    @change="setLinks($event, messenger)"
                    class="d-inline-block ml-3"
                    hide-details
                    prefix="/"
                    :rules="[v => !v || (!!v && $validator.isAlphanumeric(v))]"
                    :required="false"></default-input>
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


export default {
  name: "SpecAccountEditTab",
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
      servicesValid: true
    }
  },
  components: {
    NameInput,
    PictureSelectInput,
    EmailInput, TextAreaInput, SelectInput, CroppingAvatarDialog, PhoneInput, DefaultInput
  },
  methods: {
    getAccountData() {
      this.getData('http://localhost:3000/spec/account')
          .then(resp => {
            this.name = resp.data.name
            this.surname = resp.data.surname
            this.email = resp.data.email
            this.sex = resp.data.sex
            this.phone = resp.data.number
            this.avatar = resp.data.avatar
            this.role = resp.data.role
            this.specializations = resp.data.specializations.map(spec => spec._id)
            this.methods = resp.data.methods.map(mt => mt._id)
            this.opportunities = resp.data.opportunities
            this.shortAbout = resp.data.about.short
            this.fullAbout = resp.data.about.full
            this.messengers = resp.data.contacts.messengers
            this.contactPhone = resp.data.contacts.phone
            this.contactEmail = resp.data.contactEmail
            this.links = resp.data.contacts.links
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
            this.avatar = avatar.images[1].url
          })
          .catch()
    },
    setPerson() {
      if (this.$refs.personForm.validate()) {
        this.putData('http://localhost:3000/spec/account/person', {name: this.name, surname: this.surname})
            .then(() => {
              this.$root.$emit('push-message', {title: 'Успешно', type: 'success', time: 2000})
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
              this.$root.$emit('push-message', {title: 'Успешно', type: 'success', time: 2000})
            })
            .catch()
      }
    },
    setContacts() {
      if (this.$refs.contactsForm.validate()) {
        this.putData('http://localhost:3000/spec/account/contacts',
            {
              messengers: this.messengers,
              email: this.contactEmail,
              phone: this.contactPhone.replaceAll(/[-()+ ]/g, '')
            })
            .then(() => {
              this.$root.$emit('push-message', {title: 'Успешно', type: 'success', time: 2000})
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
              this.$root.$emit('push-message', {title: 'Успешно', type: 'success', time: 2000})
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
              this.$root.$emit('push-message', {title: 'Успешно', type: 'success', time: 2000})
            })
            .catch()
      }
    }
  }
  ,
  filters: {
    sex,
    role
  }
  ,
  mounted() {
    this.getAccountData()
    this.getSelectOptions()
  }
}
</script>

<style scoped>
.phone-input >>> .v-input {
  min-width: 300px;
}
</style>