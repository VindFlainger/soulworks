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
          class="text-subtitle-1 blue--text text--lighten-3 text-decoration-underline"
          style="position:absolute; right: 30px; top: 20px; cursor: pointer"
          @click="$router.push({name: 'specAccount'})"
      >
         {{ $t('common.buttons.return') }}
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
      </v-row>

      <v-row>
        <div>
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.personal-data') }}
          </h5>

          <v-form
              ref="personForm"
              v-model="personValid"
              lazy-validation
          >
            <name-input
                v-model="name"
                :label="$t('common.labels.person-name')"
                @change="setPerson"
            ></name-input>

            <name-input
                v-model="surname"
                :label="$t('common.labels.person-surname')"
                @change="setPerson"
            ></name-input>

            <default-input
                :label="$t('common.labels.sex')"
                :value="sex | sex | capitalize"
                disabled=""
            ></default-input>
          </v-form>
        </div>


        <div class="ml-sm-10">
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.business-data') }}
          </h5>

          <phone-input
              v-model="phone"
              disabled
          ></phone-input>

          <default-input
              v-model="email"
              :label="$t('common.labels.email')"
              disabled
          ></default-input>

          <default-input
              :label="$t('common.labels.role')"
              :value="role | role | capitalize"
              disabled
          ></default-input>
        </div>
      </v-row>

      <v-row>
        <v-col class="pa-0" style="max-width: 330px">
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.services') }}
          </h5>

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
                :label="$t('common.labels.methods')"
                @blur="setServices"
            ></select-input>

            <select-input
                v-model="specializations"
                :items="specializationSelectOptions.map(opt => ({...opt, value: opt._id}))"
                :label="$t('common.labels.specializations')"
                small-chips
                multiple
                @blur="setServices"
            ></select-input>

            <select-input
                v-model="opportunities"
                :required="false"
                :items="opportunitiesSelectOption"
                :label="$t('common.labels.opportunities')"
                multiple
                small-chips
                @blur="setServices"
            ></select-input>

          </v-form>
        </v-col>

        <v-col class="col-12 col-md pa-0">
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.presentation') }}
          </h5>


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
                :rules="[v => /^[0-9a-zA-ZА-я=!@# :%^ё*()&+-,. ]*$/.test(v) || $t('common.validation.unavailable-symbols')]"
                :label="$t('common.labels.visa')"
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
                :rules="[v => /^[0-9a-zA-ZА-я=!@# :%^*ё()&+-,. ]*$/.test(v) || $t('common.validation.unavailable-symbols')]"
                height="200"
                counter="1000"
                maxlength="1000"
                :label="$t('common.labels.about')"
                no-resize
                @change="setAbout"
            ></text-area-input>

          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-0 mr-2" style="max-width: 350px">
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.online-price') }}
          </h5>

          <range-input
              :min.sync="onlinePrices.min"
              :max.sync="onlinePrices.max"
              :max-limit="1000"
              :min-limit="0"
              @change="setPrices"
          ></range-input>

          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.internal-price') }}
          </h5>


          <range-input
              :min.sync="internalPrices.min"
              :max.sync="internalPrices.max"
              :max-limit="1000"
              :min-limit="0"
              @change="setPrices"
          ></range-input>
        </v-col>

        <v-col class="col-12 col-md pa-0">
          <v-form
              ref="connectionForm"
              v-model="connectionValid"
              lazy-validation
          >

            <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
              {{ $t('account.spec.edit-personal-data.connection') }}
            </h5>


            <default-input
                v-model="connection"
                :label="$t('common.labels.communication')"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!:@# %^ё*()&+-,. ]*$/.test(v) || $t('common.validation.unavailable-symbols')]"
                @change="setConnectionAndAddress"
            ></default-input>

            <default-input
                v-model="address"
                :label="$t('common.labels.address')"
                :required="false"
                :rules="[v => /^[0-9a-zA-ZА-я=!:@# %^ё*()&+-,. ]*$/.test(v) || $t('common.validation.unavailable-symbols')]"
                @change="setConnectionAndAddress"
            ></default-input>

          </v-form>
        </v-col>
      </v-row>


      <v-row>
        <v-col style="max-width: 350px" class="pa-0">
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.contacts') }}
          </h5>

          <v-form lazy-validation ref="contactsForm" v-model="contactsValid">

            <v-row>
              <phone-input
                  class="phone-input"
                  v-model="contactPhone"
                  :label="$t('common.labels.contact-phone')"
                  :required="false"
                  @change="setContacts"
              ></phone-input>

              <p class="text-caption sans mt-n1 grey--text text--darken-2 mb-2">
                {{ $t('account.spec.edit-personal-data.about-phone') }}
              </p>

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
                :label="$t('common.labels.contact-email')"
                :required="false"
                @change="setContacts"
            ></email-input>

          </v-form>
        </v-col>

        <v-col class="pa-0">
          <h5 class="comfortaa text-subtitle-1 font-weight-bold mb-2 font-title">
            {{ $t('account.spec.edit-personal-data.social-networks') }}
          </h5>

          <p class="text-caption sans mt-n1 grey--text text--darken-2 mb-2">
            {{ $t('account.spec.edit-personal-data.about-social-links') }}
          </p>

          <v-form
              ref="linksForm"
              v-model="linksValid"
              lazy-validation
          >
            <v-list
                class="ma-0 pa-0"
            >
              <v-list-item
                  v-for="messenger in messengersOptions"
                  :key="messenger"
              >
                <v-img
                    class="d-inline-block"
                    style="position:relative; top: 2px"
                    :max-width="32"
                    :src="require(`@/assets/images/networks/${messenger}.png`)"
                ></v-img>

                <default-input
                    min-width="220"
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
      this.getDataAuthed('spec/account')
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
      this.getDataAuthed('filters',)
          .then(resp => {
            this.specializationSelectOptions = resp.data.specializations
            this.methodsSelectOptions = resp.data.methods
          })
          .catch(() => {
          })
    },
    setAvatar(avatar) {
      this.putDataAuthed('spec/account/avatar', {avatarId: avatar.id})
          .then(() => {
            this.croppingDialogVisible = false
            this.avatar = avatar
          })
          .catch(() => {
          })
    },
    setPerson() {
      if (this.$refs.personForm.validate()) {
        this.putDataAuthed('spec/account/person',
            {
              name: this.name,
              surname: this.surname
            },
            {
              handleError: true,
              handleSuccess: true,
              successMessage: this.$t('common.feedbacks.edit-success')
            }
        )
            .catch(() => {
            })
      }
    },
    setAbout() {
      if (this.$refs.aboutForm.validate()) {
        this.putDataAuthed('spec/account/about',
            {
              shortAbout: this.shortAbout,
              fullAbout: this.fullAbout
            },
            {
              handleError: true,
              handleSuccess: true,
              successMessage: this.$t('common.feedbacks.edit-success')
            }
        )
            .catch(() => {
            })
      }
    },
    setContacts() {
      if (this.$refs.contactsForm.validate()) {
        this.putDataAuthed('spec/account/contacts',
            {
              messengers: this.messengers,
              email: this.contactEmail || undefined,
              phone: this.contactPhone.replaceAll(/[-()+ ]/g, '')
            },
            {
              handleError: true,
              handleSuccess: true,
              successMessage: this.$t('common.feedbacks.edit-success')
            }
        )
            .catch(() => {
            })
      }
    },
    setLinks(link, messenger) {
      if (this.$refs.linksForm.validate()) {
        this.links = this.links.filter(link => link.name !== messenger)

        if (link) this.links.push({name: messenger, link})

        this.putDataAuthed('spec/account/links',
            {
              links: this.links,
            },
            {
              handleError: true,
              handleSuccess: true,
              successMessage: this.$t('common.feedbacks.edit-success')
            }
        )
            .catch(() => {
            })
      }
    },
    setServices() {
      if (this.$refs.servicesForm.validate()) {
        this.putDataAuthed('spec/account/services',
            {
              opportunities: this.opportunities,
              methods: this.methods,
              specializations: this.specializations
            },
            {
              handleError: true,
              handleSuccess: true,
              successMessage: this.$t('common.feedbacks.edit-success')
            })
            .catch(() => {
            })
      }
    },
    setPrices() {
      this.putDataAuthed('spec/account/price',
          {
            minOnline: this.onlinePrices.min,
            maxOnline: this.onlinePrices.max,
            minInternal: this.internalPrices.min,
            maxInternal: this.internalPrices.max
          },
          {
            handleError: true,
            handleSuccess: true,
            successMessage: this.$t('common.feedbacks.edit-success')
          })
          .catch(() => {
          })
    },
    setConnectionAndAddress() {
      this.$refs.connectionForm.validate()
      {
        this.putDataAuthed('spec/account/connection',
            {
              address: this.address,
              connection: this.connection
            },
            {
              handleError: true,
              handleSuccess: true,
              successMessage: this.$t('common.feedbacks.edit-success')
            })
            .catch(() => {
            })
      }
    }
  },
  computed: {
    opportunitiesSelectOption() {
      return [
        {
          value: 'internal',
          text: this.$t('common.data.opportunities.internal')
        },
        {
          value: 'teens',
          text: this.$t('common.data.opportunities.teens')
        },
        {
          value: 'family',
          text: this.$t('common.data.opportunities.family')
        },
        {
          value: 'children',
          text: this.$t('common.data.opportunities.children')
        },
      ]
    }
  },
  mounted() {
    this.getAccountData()
    this.getSelectOptions()
  },
  metaInfo() {
    return {
      title: this.$t('account.spec.edit-personal-data.section-name')
    }
  }
}
</script>

<style scoped>
.phone-input >>> .v-input {
  min-width: 300px;
}
</style>