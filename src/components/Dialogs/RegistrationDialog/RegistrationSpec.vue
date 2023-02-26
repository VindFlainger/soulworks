<template>
  <div class="registration-spec">

    <v-stepper-content step="2">

      <v-form ref="accountForm">
        <v-row>
          <v-avatar size="200">
            <v-img :src="require(`@/assets/images/spec.png`)"></v-img>
          </v-avatar>

          <v-col>
            <name-input
                v-model="name"
                :label="$t('common.labels.person-name')"
                maxlength="30"
            ></name-input>

            <name-input
                v-model="surname"
                :label="$t('common.labels.person-surname')"
                maxlength="30"
            ></name-input>

            <select-input
                v-model="sex"
                :label="$t('common.labels.sex')"
                :items="$store.getters['params/getSpecGenders']"
            ></select-input>

            <phone-input v-model="phone"></phone-input>
          </v-col>


          <v-col>
            <div class="comfortaa text-subtitle-1 font-weight-bold">
              {{ $t('registration.online-class-price-label') }}
            </div>

            <range-input
                :min.sync="minInternalPrice"
                :max.sync="maxInternalPrice"
                :min-limit="0"
                :max-limit="1000"
            ></range-input>

            <div class="comfortaa text-subtitle-1 font-weight-bold">
              {{ $t('registration.offline-class-price-label') }}
            </div>

            <range-input
                :min.sync="minOnlinePrice"
                :max.sync="maxOnlinePrice"
                :min-limit="0"
                :max-limit="1000"
            ></range-input>
          </v-col>

        </v-row>

        <v-row>
          <select-input
              v-model="specializations"
              :items="specializationsParams.map(el => {return {text: el.text, value: el._id}})"
              :label="$t('common.labels.specialization')"
              multiple
              chips
              small-chips
              big-content
          ></select-input>

          <v-spacer></v-spacer>

          <select-input
              v-model="methods_"
              :items="methodsParams.map(el => {return {text: el.text, value: el._id}})"
              :label="$t('common.labels.methods')"
              multiple
              chips
              small-chips
              big-content
          ></select-input>

          <v-spacer></v-spacer>

          <select-input
              v-model="opportunities"
              :label="$t('common.labels.opportunities')"
              :required="false"
              :items="$store.getters['params/getOpportunities']"
              multiple
              chips
              small-chips
              big-content
          ></select-input>
        </v-row>

      </v-form>

      <v-row>
        <ui-back-button @click="$emit('input', 1)"></ui-back-button>
        <v-spacer></v-spacer>
        <ui-next-button @click="$emit('input', $refs.accountForm.validate()?3:2)"></ui-next-button>
      </v-row>

    </v-stepper-content>

    <v-stepper-content step="3" class="pa-1 pa-md-4">
      <v-form
          ref="authForm"
          lazy-validation
      >
        <v-row class="align-center justify-center">

          <v-col class="col-12 col-md-4">
            <v-row class="flex-column align-center" >
              <email-input v-model="email" :check="true"></email-input>
              <password-input v-model="password"></password-input>
              <repeat-password-input :value="password"></repeat-password-input>
            </v-row>
          </v-col>

          <v-col>
            <v-row
                class="fill-height rounded pa-2"
                style="position:relative; top: -10px; outline: 1px solid grey"
                align="center"
            >

              <v-sheet max-height="500" class="overflow-y-auto">
                <registration-spec-agreement></registration-spec-agreement>
              </v-sheet>

              <v-checkbox
                  style="border-top: 1px solid grey; width: 100%"
                  v-model="confirm"
                  :label="$t('registration.agree')"
                  hide-details
                  dense
              ></v-checkbox>
            </v-row>

          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <ui-back-button @click="$emit('input', 2)"></ui-back-button>
        <v-spacer></v-spacer>
        <ui-next-button
            :disabled="!confirm"
            @click="register"
        >
          <div class="text-title">{{ $t('common.buttons.finish') }}</div>
        </ui-next-button>
      </v-row>
    </v-stepper-content>
  </div>
</template>

<script>
import NameInput from "@/components/UI/Inputs/NameInput";
import SelectInput from "@/components/UI/Inputs/SelectInput";
import PhoneInput from "@/components/UI/Inputs/PhoneInput";
import RangeInput from "@/components/UI/Inputs/RangeInput";
import EmailInput from "@/components/UI/Inputs/EmailInput";
import PasswordInput from "@/components/UI/Inputs/PasswordInput";
import RepeatPasswordInput from "@/components/UI/Inputs/RepeatPasswordInput";
import UiNextButton from "@/components/UI/Buttons/UiNextButton";
import UiBackButton from "@/components/UI/Buttons/UiBackButton";
import requests from "@/mixins/requests";
import RegistrationSpecAgreement from "@/components/Dialogs/RegistrationDialog/RegistrationSpecAgreement.vue";

export default {
  name: "RegistrationSpec",
  components: {
    RegistrationSpecAgreement,
    UiBackButton,
    UiNextButton,
    RepeatPasswordInput,
    PasswordInput,
    EmailInput,
    RangeInput,
    PhoneInput,
    SelectInput,
    NameInput
  },
  mixins: [requests],
  props: {
    step: Number
  },
  data() {
    return {
      minInternalPrice: 0,
      maxInternalPrice: 100,
      minOnlinePrice: 0,
      maxOnlinePrice: 100,
      name: '',
      surname: '',
      phone: '',
      sex: '',
      specializations: [],
      opportunities: [],
      methods_: [],
      email: '',
      password: '',
      confirm: false,

      specializationsParams: [],
      methodsParams: []
    }
  },
  methods: {
    register() {
      this.internalLoading = true
      this.postData('registration/spec', {
        name: this.name,
        surname: this.surname,
        sex: this.sex,
        email: this.email,
        number: this.phone.replace(/[+() -]/g, ''),
        password: this.password,
        methods: this.methods_,
        specializations: this.specializations,
        opportunities: this.opportunities,
        price: {
          internal: {
            min: this.minInternalPrice,
            max: this.maxInternalPrice
          },
          online: {
            min: this.maxOnlinePrice,
            max: this.maxOnlinePrice
          }
        }
      }, {handleError: true})
          .then(() => {
            this.$root.$emit('show-info', {
              title: this.$t('registration.confirm'),
              subtitle: this.$t('registration.confirm-info')
            })
            this.$root.$emit('close-registration')
          })
          .catch(() => {
          })
          .finally(() => this.internalLoading = false)
    },
    getMethodsSpecializations() {
      this.getData('filters')
          .then(resp => {
            this.specializationsParams = resp.data.specializations
            this.methodsParams = resp.data.methods
          })
          .catch(() => {
          })
    }
  },
  mounted() {
    this.getMethodsSpecializations()
  },
}
</script>

<style scoped>

</style>