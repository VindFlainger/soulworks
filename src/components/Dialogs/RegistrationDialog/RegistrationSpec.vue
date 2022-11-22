<template>
  <div>
    <v-stepper-content step="2">
      <v-form ref="accountForm">
        <v-row>
          <v-avatar size="200">
            <v-img :src="require(`@/assets/images/spec.png`)"></v-img>
          </v-avatar>

          <v-col>
            <name-input v-model="name" label="Имя" maxlength="30"></name-input>
            <name-input v-model="surname" label="Фамилия" maxlength="30"></name-input>

            <select-input v-model="sex"
                          label="Пол"
                          :items="$store.state.params.specSex"
            ></select-input>

            <phone-input v-model="phone"></phone-input>
          </v-col>

          <v-col>
            <div class="font-title fs-16 font-weight-bold">Цена за 1 час онлайн консультации</div>

            <range-input :min-limit="0"
                         :max-limit="1000"
                         :min.sync="minInternalPrice"
                         :max.sync="maxInternalPrice"
            ></range-input>

            <div class="font-title fs-16 font-title font-weight-bold">Цена за 1 час очной консультации</div>

            <range-input :min-limit="0"
                         :max-limit="1000"
                         :min.sync="minOnlinePrice"
                         :max.sync="maxOnlinePrice"
            ></range-input>
          </v-col>

        </v-row>

        <v-row>
          <select-input multiple
                        label="Специализация"
                        :items="specializationsParams.map(el => {return {text: el.text, value: el._id}})"
                        v-model="specializations"
                        chips
                        small-chips
                        big-content
          ></select-input>

          <v-spacer></v-spacer>

          <select-input
              multiple
              label="Методы"
              :items="methodsParams.map(el => {return {text: el.text, value: el._id}})"
              v-model="methods_"
              chips
              small-chips
              big-content
          ></select-input>

          <v-spacer></v-spacer>

          <select-input
              multiple
              label="Условия"
              v-model="opportunities"
              :required="false"
              :items="$store.state.params.opportunities"
              chips small-chips big-content>
          </select-input>
        </v-row>
      </v-form>

      <v-row>
        <ui-back-button @click="$emit('input', 1)"></ui-back-button>
        <v-spacer></v-spacer>
        <ui-next-button @click="$emit('input', $refs.accountForm.validate()?3:2)"></ui-next-button>
      </v-row>

    </v-stepper-content>

    <v-stepper-content step="3">
      <v-form lazy-validation ref="authForm">
        <v-row align="center">
          <v-col class="col-4">
            <email-input v-model="email" :check="true"></email-input>
            <password-input v-model="password"></password-input>
            <repeat-password-input :value="password"></repeat-password-input>
          </v-col>
          <v-col class="col-8">
            <v-row class="fill-height rounded pa-2" align="center"
                   style="position:relative; top: -10px; outline: 1px solid grey">
              <div class="fs-14 overflow-y-auto" style="max-height: 400px" v-html="$store.state.content.specAgreement"></div>
              <v-checkbox style="border-top: 1px solid grey; width: 100%" v-model="confirm" hide-details dense
                          label="Согласен с пользовательским соглашением">
              </v-checkbox>
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
import RangeInput from "@/components/UI/Inputs/RangeInput";
import EmailInput from "@/components/UI/Inputs/EmailInput";
import PasswordInput from "@/components/UI/Inputs/PasswordInput";
import RepeatPasswordInput from "@/components/UI/Inputs/RepeatPasswordInput";
import UiNextButton from "@/components/UI/Buttons/UiNextButton";
import UiBackButton from "@/components/UI/Buttons/UiBackButton";
import requests from "@/mixins/requests";

export default {
  name: "RegistrationSpec",
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
  props: {
    step: Number
  },
  methods: {
    registerSpec() {
      this.localLoading = true
      this.postData('http://localhost:3000/registration/spec', {
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
      }, {handleErrorResponse: true, handleError: true})
          .then(() => {
            this.$root.$emit('show-info', {
              title: 'Подтверждение',
              subtitle: 'На вашу электронную почту отправлено письмо для подтверждения регистрации'
            })
            this.$root.$emit('close-registration')
          })
          .catch(() => {
          })
          .finally(() => this.localLoading = false)
    },
    getMethodsSpecializations() {
      this.getData('http://localhost:3000/filters')
          .then(resp => {
            this.specializationsParams = resp.data.specializations
            this.methodsParams = resp.data.methods
          })
          .catch()
    }
  },
  components: {
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
  mounted() {
    this.getMethodsSpecializations()
  },
}
</script>

<style scoped>

</style>