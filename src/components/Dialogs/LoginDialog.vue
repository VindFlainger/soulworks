<template>
  <base-dialog
      :value="true"
      max-width="400"
      content-class="white"
      @close="$root.$emit('close-login')"
      @click:outline="$root.$emit('close-login')"
  >

    <div
        class="d-flex flex-column align-center pa-10"
        v-if="!recoverDialog"
    >

      <v-form
          actocomplete
          ref="loginForm"
          v-model="loginFormValid"
          lazy-validation
      >
        <h5 class="text-center text-h5 comfortaa mb-3">
          {{ $t('common.ui.system-auth') }}
        </h5>

        <email-input
            v-model="email"
            :required-indicator="false"
        ></email-input>

        <default-input
            class="password-input"
            v-model="password"
            :label="$t('common.labels.password')"
            type="password"
            :hide-details="correct"
            :messages="$t('common.feedbacks.incorrect-password')"
            :error="!correct"
            @focusin="correct = true"
            id="current-password"
            name="current-password"
        >
          <template v-slot:message>
            <a
                class="font-weight-light text-body-1"
                @click="recoverDialog = true"
            >
              {{ $t('common.ui.forget-password') }}
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
            {{ $t('common.buttons.close') }}
          </ui-default-button>

          <v-spacer></v-spacer>

          <ui-default-button
              :disabled="!loginFormValid || !password"
              width="40%"
              :loading="internalLoading"
              @click="login"
          >
            {{ $t('common.buttons.login') }}
          </ui-default-button>
        </v-row>
      </v-form>
      <v-row
          class="mt-2"
          style="width: 300px"
      >
        <div class="font-weight-light text-caption">
          {{ $t('common.ui.is-new-user') }}
          <a
              class="fs-14"
              @click="$root.$emit('close-login'); $root.$emit('show-registration')"
          >
            {{ $t('common.ui.register') }}
          </a>
        </div>
      </v-row>
    </div>

    <div v-if="recoverDialog">

      <div class="d-flex flex-column align-center pa-10">

        <h5 class="text-center comfortaa text-h6 mb-3">
          {{ $t('common.ui.password-recover') }}
        </h5>

        <p class="text-center text-caption mb-3 ma-0">
          {{ $t('common.ui.password-recover-info') }}
        </p>

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
  </base-dialog>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import EmailInput from "@/components/UI/Inputs/EmailInput";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import requests from "@/mixins/requests";
import {SET_AUTH_DATA} from "@/store/mutation-types";
import BaseDialog from "@/components/Dialogs/BaseDialog.vue";


export default {
  name: "LoginDialog",
  components: {BaseDialog, UiDefaultButton, EmailInput, DefaultInput},
  mixins: [requests],
  data() {
    return {
      loginFormValid: true,
      recoverFormValid: true,
      correct: true,
      email: '',
      password: '',
      recoverDialog: false,
    }
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.internalLoading = true

        this.postData('auth/login', {
          email: this.email,
          password: this.password,
          device: window.navigator.userAgent
        }, {handlerError: true})
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
        this.postData('auth/recover', {
          email: this.email,
        })
            .then(() => {
              this.$root.$emit('close-login')
              this.$root.$emit('show-info',
                  {
                    title: this.$t('common.ui.password-recover'),
                    subtitle: this.$t('common.ui.password-recover-info')
                  })
            })
            .catch(() => {
            })
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