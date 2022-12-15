<template>
  <div class="registration-user">

    <v-stepper-content step="2">

      <v-form ref="accountForm">

        <v-row align="center">

          <v-avatar size="200">
            <v-img :src="require(`@/assets/images/user.png`)"></v-img>
          </v-avatar>

          <v-col>
            <name-input
                v-model="name"
                label="Имя"
                maxlength="30"
            ></name-input>

            <name-input
                v-model="surname"
                label="Фамилия"
                maxlength="30"
                class="mt-1"
            ></name-input>
          </v-col>

          <v-col>
            <select-input
                v-model="sex"
                label="Пол"
                :items="$store.state.params.userSex"
            ></select-input>

            <phone-input v-model="phone"></phone-input>
          </v-col>
        </v-row>

        <div class="mb-2 fs-14">
          Помните! Введенные данные на этой вкладке данные будут доступны психологам и другим пользователям сайта, если
          вы желаете сохранить анонимность воспользуйтесь псевдонимом. Вы сможете изменить имя и фамилию в любое время в
          вашем личном кабинете.
        </div>

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

        <v-row align="center">

          <v-col class="col-4">
            <email-input v-model="email" :check="true"></email-input>
            <password-input v-model="password"></password-input>
            <repeat-password-input :value="password"></repeat-password-input>
          </v-col>

          <v-col class="col-8">
            <v-row
                class="fill-height rounded pa-2"
                style="position:relative; top: -10px; outline: 1px solid grey"
                align="center"
            >
              <div
                  class="fs-14 overflow-y-auto"
                  style="max-height: 400px"
                  v-html="$store.state.content.userAgreement"
              ></div>

              <v-checkbox
                  style="border-top: 1px solid grey; width: 100%"
                  v-model="confirm"
                  label="Согласен с пользовательским соглашением"
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
        <ui-next-button :disabled="!confirm" @click="registerSpec">Завершить</ui-next-button>
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

export default {
  name: "RegistrationUser",
  components: {
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
    registerSpec() {
      this.localLoading = true
      this.postData('http://localhost:3000/registration/user', {
        name: this.name,
        surname: this.surname,
        sex: this.sex,
        email: this.email,
        number: this.phone.replace(/[+() -]/g, ''),
        password: this.password,
      }, {handleErrorResponse: true, handleError: true})
          .then(() => {
            this.$root.$emit('show-info', {
              title: 'Подтверждение',
              subtitle: 'На вашу электронную почту отправлено письмо для подтверждения регистрации'
            })
            this.$root.$emit('close-registration')
          })
          .catch()
          .finally(() => this.localLoading = false)
    },
  },
}
</script>

<style scoped>

</style>