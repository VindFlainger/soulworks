<template>
  <v-card
      class="pa-4"
      elevation="0"
  >

    <ui-full-width-banner
        :img="require('@/assets/images/account/security.png')"
    >
      <div class="fill-height d-flex align-center justify-center">
        <div
            class="font-title pa-5 rounded"
            style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px;border-color: transparent"
        >
          Безопасность аккаунта
        </div>
      </div>
    </ui-full-width-banner>

    <v-row class="mt-3">
      <v-spacer></v-spacer>

      <v-col class="col-5 rounded">
        <v-card class="pa-2" elevation="0">
          <div class="font-title fs-20">Смена пароля</div>

          <div class="fs-12">
            Смена пароля необходима для обеспечения вашей безопасности, команда Soul Works крайне рекомендует менять
            временные пароли,
            которые устанавливаются для вашего аккаунта при восстановлении доступа к нему.
          </div>

          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >

            <div class="mt-3">
              <password-input
                  class="password-input"
                  v-model="password"
                  label="Ваш старый пароль"
              ></password-input>

              <password-input
                  class="password-input"
                  v-model="newPassword"
                  max-width="100%"
              ></password-input>

              <repeat-password-input
                  max-width="100%"
                  :value="newPassword"
                  class="password-input"
              ></repeat-password-input>
            </div>

            <v-row>
              <!-- TODO: realize method for clearing -->
              <ui-default-button color="red" outlined @click="password = ''; newPassword=''">
                Очистить
              </ui-default-button>

              <v-spacer></v-spacer>

              <ui-default-button
                  color="green"
                  :disabled="!valid"
                  outlined
                  @click="changePassword"
              >
                Сменить
              </ui-default-button>
            </v-row>
          </v-form>
        </v-card>
      </v-col>


      <v-spacer></v-spacer>

      <v-col class="col-6">
        <v-card class="pa-2" elevation="0">
          <div class="font-title fs-20">Сессии</div>
          <v-card
              class="pa-2 ma-1"
              v-for="session in sessions"
              :key="session.device"
              elevation="0"
              :class="{'green lighten-5': session.device === userAgent}"
              outlined
          >
            <v-row align="center">
              <ui-agent-visualizer :user-agent="session.device"></ui-agent-visualizer>

              <v-col class="ml-2 pa-0 fs-12">
                <div>
                  <code class="font-weight-bold font-title">Вход:</code> {{ $moment(session.date).format('lll') }}
                </div>

                <div>
                  <code class="font-weight-bold font-title">Активность:</code>
                  {{ $moment(session.activity).format('lll') }}
                </div>

                <div>
                  <code class="font-weight-bold font-title">IP Адрес:</code> {{ session.ip }}
                </div>

                <div>
                  <code class="font-weight-bold font-title">Устройство:</code>{{ session.device }}
                </div>
              </v-col>

              <v-btn absolute x-small fab style="top: 5px; right: 5px" elevation="0" outlined color="red"
                     @click="deleteSession(session.device)">
                <v-icon>mdi-close</v-icon>
              </v-btn>

            </v-row>


          </v-card>
        </v-card>


      </v-col>

      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import PasswordInput from "@/components/UI/Inputs/PasswordInput";
import RepeatPasswordInput from "@/components/UI/Inputs/RepeatPasswordInput";
import UiAgentVisualizer from "@/components/UI/UiAgentVisualizer";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import requests from "@/mixins/requests";

export default {
  name: "SecurityTab",
  components: {
    UiDefaultButton,
    UiAgentVisualizer,
    RepeatPasswordInput,
    PasswordInput,
    UiFullWidthBanner
  },
  mixins: [requests],
  data() {
    return {
      sessions: undefined,
      userAgent: undefined,
      password: '',
      newPassword: '',
      valid: true
    }
  },
  methods: {
    getSessions() {
      this.getData('http://localhost:3000/any/sessions', {handleError: true, handleErrorResponse: true})
          .then(resp => {
            this.sessions = resp.data
          })
          .catch()
    },
    deleteSession(device) {
      this.$root.$emit('show-confirm',
          {
            text: 'Сессия выбранном устройстве будет завершена, для продолжения работы потребуется повторный вход.'
          }
      )

      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delData(`http://localhost:3000/any/sessions?device=${device}`,
              {
                handleError: true,
                handleErrorResponse: true
              })
              .then(() => {
                this.sessions = this.sessions.filter(session => session.device !== device)
                if (device === this.userAgent) this.logOut()
              })
              .catch()
        }
      })
    },
    changePassword() {
      if (this.$refs.form.validate()) {

        this.$root.$emit('show-confirm',
            {
              text: 'Пароль от вашей учетной записи будет изменен, а все активные сессии завершены в течении 5 минут.'
            }
        )

        this.$root.$once('close-confirm', v => {
              if (v) {
                this.postData(`http://localhost:3000/auth/changePassword`,
                    {
                      password: this.password,
                      newPassword: this.newPassword,
                      email: this.$store.state.email
                    },
                    {
                      handleError: true,
                      handleErrorResponse: true
                    })
                    .then(() => {
                      this.logOut()
                    })
                    .catch()
              }
            }
        )

      }
    }
  },
  mounted() {
    this.getSessions()
    this.userAgent = window.navigator.userAgent
  },
  metaInfo: {
    title: 'Безопасность'
  }
}
</script>

<style scoped>
.password-input >>> .v-input {
  max-width: 600px;
}
</style>