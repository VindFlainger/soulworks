<template>
  <v-dialog :value="true" max-width="450" content-class="white" @click:outside="$root.$emit('close-registration')">

    <div class="d-flex flex-column align-center pa-10" v-if="!recoverDialog">
      <v-form v-model="loginFormValid" lazy-validation ref="loginForm">
        <div class="text-center font-title fs-24 mb-3">Войти в систему</div>
        <email-input style="width: 300px" :required-indicator="false" v-model="email"></email-input>

        <default-input
            class="password-input"
            style="width: 300px"
            label="Пароль"
            v-model="password"
            type="password"
            :hide-details="correct"
            messages="Неверный пароль"
            :error="!correct"
            @focusin="correct = true"
        >
          <template v-slot:message>
            <a class="font-weight-light fs-14" @click="recoverDialog = true;">Забыли пароль?</a>
          </template>
        </default-input>

        <v-row style="width: 300px" class="mt-3">
          <v-btn elevation="0" color="red lighten-3" outlined width="40%" @click="$root.$emit('close-login');">Закрыть
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="green lighten-3" outlined width="40%" :disabled="!loginFormValid || !password"
                 :loading="localLoading"
                 @click="login">Вход
          </v-btn>
        </v-row>
      </v-form>
      <v-row style="width: 300px" class="mt-2">
        <div class="font-weight-light fs-14">
          Новый пользователь? <a @click="$root.$emit('close-login'); $root.$emit('show-registration');" class="fs-14">Зарегистрируйтесь</a>
        </div>
      </v-row>
    </div>

    <div v-if="recoverDialog">
      <div class="d-flex flex-column align-center pa-10">
        <div class="text-center font-title fs-24 mb-3">Восстановление пароля</div>
        <div class="text-center fs-12 mb-3">На указанную вами почту будет выслано письмо с шагами для восстановления
          вашего пароля!
        </div>
        <v-form v-model="recoverFormValid" ref="recoverForm">
          <email-input style="width: 300px" :required-indicator="false" v-model="email" check="exists"></email-input>
          <v-row style="width: 300px" class="mt-3">
            <v-spacer></v-spacer>
            <v-btn elevation="0" color="green lighten-3" outlined width="40%" :disabled="!recoverFormValid"
                   :loading="localLoading"
                   @click="recover">Отправить
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
      </div>

    </div>


  </v-dialog>
</template>

<script>
import DefaultInput from "@/components/Inputs/DefaultInput";
import EmailInput from "@/components/Inputs/EmailInput";

export default {
  name: "LoginDialog",
  components: {EmailInput, DefaultInput},
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
        this.localLoading = true
        this.postData('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
          device: window.navigator.userAgent
        })
            .then(resp => {
              this.$store.commit('setToken', resp.data.token )
              this.$store.commit('setEmail', this.email )
              this.$root.$emit('close-login')
            })
            .catch(err => {
              if (err.response.status === 401) {
                this.password = ''
                this.correct = false
              }
            })
            .finally(() => {
              this.localLoading = false
            })
      }
    },
    recover() {
      if (this.$refs.recoverForm.validate()) {
        this.localLoading = true
        this.postData('http://localhost:3000/recover', {
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
            .catch(() => {
              //TODO: Add recovering error handler
            })
            .finally(() => {
              this.localLoading = false
            })
      }
    }
  }
}
</script>

<style scoped>

</style>