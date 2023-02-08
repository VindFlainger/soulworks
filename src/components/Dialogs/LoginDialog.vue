<template>
  <v-dialog
      :value="true"
      max-width="450"
      content-class="white"
      @click:outside="$root.$emit('close-registration')"
  >

    <div
        class="d-flex flex-column align-center pa-10"
        v-if="!recoverDialog"
    >

      <v-form
          ref="loginForm"
          v-model="loginFormValid"
          lazy-validation
      >
        <div class="text-center font-title fs-24 mb-3">Войти в систему</div>

        <email-input
            style="width: 300px"
            v-model="email"
            :required-indicator="false"
        ></email-input>

        <default-input
            class="password-input"
            style="width: 300px"
            v-model="password"
            label="Пароль"
            type="password"
            :hide-details="correct"
            messages="Неверный пароль"
            :error="!correct"
            @focusin="correct = true"
        >
          <template v-slot:message>
            <a
                class="font-weight-light fs-14"
                @click="recoverDialog = true;"
            >
              Забыли пароль?
            </a>
          </template>
        </default-input>

        <v-row
            class="mt-3"
            style="width: 300px"
        >

          <ui-default-button
              width="40%"
              color="red"
              @click="$root.$emit('close-login')"
          >
            Закрыть
          </ui-default-button>

          <v-spacer></v-spacer>

          <ui-default-button
              :disabled="!loginFormValid || !password"
              width="40%"
              :loading="internalLoading"
              @click="login"
          >
            Вход
          </ui-default-button>
        </v-row>
      </v-form>
      <v-row
          class="mt-2"
          style="width: 300px"
      >
        <div class="font-weight-light fs-14">
          Новый пользователь?
          <a
              class="fs-14"
              @click="$root.$emit('close-login'); $root.$emit('show-registration')"
          >
            Зарегистрируйтесь
          </a>
        </div>
      </v-row>
    </div>

    <div v-if="recoverDialog">

      <div class="d-flex flex-column align-center pa-10">

        <div class="text-center font-title fs-24 mb-3">Восстановление пароля</div>

        <div class="text-center fs-12 mb-3">
          На указанную вами почту будет выслано письмо с шагами для восстановления вашего пароля!
        </div>

        <v-form
            ref="recoverForm"
            v-model="recoverFormValid"
        >

          <email-input
              style="width: 300px"
              v-model="email"
              :required-indicator="false"
              check="exists"
          ></email-input>

          <v-row
              class="mt-3"
              style="width: 300px"
          >
            <v-spacer></v-spacer>
            <v-btn
                :disabled="!recoverFormValid"
                elevation="0"
                color="green lighten-3"
                width="40%"
                :loading="internalLoading"
                outlined
                @click="recover"
            >
              Отправить
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
      </div>

    </div>


  </v-dialog>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import EmailInput from "@/components/UI/Inputs/EmailInput";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import requests from "@/mixins/requests";
import {SET_AUTH_DATA} from "@/store/mutation-types";

const axios = require('axios').default

export default {
  name: "LoginDialog",
  components: {UiDefaultButton, EmailInput, DefaultInput},
  mixins: [requests],
  data() {
    return {
      loginFormValid: true,
      recoverFormValid: true,
      correct: true,
      email: '',
      password: '',
      recoverDialog: false
    }
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.internalLoading = true

        axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {
          email: this.email,
          password: this.password,
          device: window.navigator.userAgent
        })
            .then(resp => {
              this.$store.commit(SET_AUTH_DATA, {
                id: resp.data.id,
                token: resp.data.token,
                email: resp.data.email,
                role: resp.data.role,
                name: resp.data.name,
                surname: resp.data.surname,
              })
              this.$root.$emit('close-login')
            })
            .then(() => {
              if (this.$route.query.redirect) {
                window.location.replace(this.$route.query.redirect)
              } else {
                this.$router.go(0)
              }
            })
            .catch(err => {
              if (err.response.status === 401) {
                this.password = ''
                this.correct = false
              }
            })
            .finally(() => {
              this.internalLoading = false
            })
      }
    },
    recover() {
      if (this.$refs.recoverForm.validate()) {
        this.internalLoading = true
        this.postData('http://localhost:3000/auth/recover', {
          email: this.email,
        })
            .then(() => {
              this.$root.$emit('close-login')
              this.$root.$emit('show-info',
                  {
                    title: 'Восстановление',
                    subtitle: 'На вашу электронную почту отправлено письмо для восстановления пароля'
                  })
            })
            .catch()
            .finally(() => {
              this.internalLoading = false
            })
      }
    }
  }
}
</script>

<style scoped>

</style>