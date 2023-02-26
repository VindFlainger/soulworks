<template>
  <div class="registration-user">

    <v-stepper-content step="2" class="pa-1 pa-md-2">

      <v-form ref="accountForm">

        <v-row class="align-center justify-center justify-md-start">

          <v-row class="col-12 col-md-auto justify-center justify-sm-start">
            <v-avatar size="200">
              <v-img :src="require(`@/assets/images/user.png`)"></v-img>
            </v-avatar>
          </v-row>


          <v-col class="col-12 col-sm-6 col-md-auto pa-1">
            <v-row class="flex-column align-center align-sm-start">
              <name-input
                  v-model="name"
                  :label="$t('common.labels.person-name')"
                  maxlength="30"
              ></name-input>

              <name-input
                  v-model="surname"
                  :label="$t('common.labels.person-surname')"
                  maxlength="30"
                  class="mt-1"
              ></name-input>
            </v-row>
          </v-col>

          <v-col class="col-12 col-sm-6 col-md-auto pa-1">
            <v-row class="flex-column align-center align-sm-start">
              <select-input
                  v-model="sex"
                  :label="$t('common.labels.sex')"
                  :items="$store.getters['params/getUserGenders']"
              ></select-input>

              <phone-input v-model="phone"></phone-input>
            </v-row>
          </v-col>
        </v-row>

        <p class="mb-2 text-body-2 sans">
          {{ $t('registration.user-warn') }}
        </p>

      </v-form>

      <v-row>
        <ui-back-button @click="$emit('input', 1)"></ui-back-button>
        <v-spacer></v-spacer>
        <ui-next-button @click="$emit('input', $refs.accountForm.validate()?3:2)"></ui-next-button>
      </v-row>

    </v-stepper-content>

    <v-stepper-content step="3">
      <v-form
          ref="authForm"
          lazy-validation
      >
        <v-row class="align-center justify-center">

          <v-col class="col-12 col-md-4">
            <v-row class="flex-column align-center">
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
                <registration-user-agreement></registration-user-agreement>
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
import EmailInput from "@/components/UI/Inputs/EmailInput";
import PasswordInput from "@/components/UI/Inputs/PasswordInput";
import RepeatPasswordInput from "@/components/UI/Inputs/RepeatPasswordInput";
import UiNextButton from "@/components/UI/Buttons/UiNextButton";
import UiBackButton from "@/components/UI/Buttons/UiBackButton";
import requests from "@/mixins/requests";
import RegistrationUserAgreement from "@/components/Dialogs/RegistrationDialog/RegistrationUserAgreement.vue";

export default {
  name: "RegistrationUser",
  components: {
    RegistrationUserAgreement,
    UiBackButton,
    UiNextButton,
    RepeatPasswordInput,
    PasswordInput,
    EmailInput,
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
      name: '',
      surname: '',
      phone: '',
      sex: '',
      email: '',
      password: '',
      confirm: false,
    }
  },
  methods: {
    register() {
      this.internalLoading = true
      this.postData('registration/user', {
        name: this.name,
        surname: this.surname,
        sex: this.sex,
        email: this.email,
        number: this.phone.replace(/[+() -]/g, ''),
        password: this.password,
      }, {handleErrorResponse: true, handleError: true})
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
  },
}
</script>

<style scoped>

</style>