<template>
  <account-base-layout
      :preview-image="require('@/assets/images/account/security.png')"
      :preview-title="$t('account.spec.security.section-name')"
  >
    <v-row class="mt-3 pa-lg-10 flex-lg-nowrap" justify="center" justify-md="flex-start">
      <div class="rounded">
        <v-card elevation="0" max-width="300">

          <h5 class="font-title comfortaa text-h6">
            {{ $t('account.spec.security.password-change') }}
          </h5>

          <p class="text-caption">
            {{ $t('account.spec.security.about-password-change') }}
          </p>

          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >

            <div class="mt-3">
              <password-input
                  class="password-input"
                  v-model="password"
                  :label="$t('common.labels.old-password')"
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
              <ui-default-button
                  color="red"
                  outlined
                  @click="password = ''; newPassword=''"
              >
                {{ $t('common.buttons.clear') }}
              </ui-default-button>

              <v-spacer></v-spacer>

              <ui-default-button
                  color="green"
                  :disabled="!valid"
                  outlined
                  @click="changePassword"
              >
                {{ $t('common.buttons.change') }}
              </ui-default-button>
            </v-row>
          </v-form>
        </v-card>
      </div>


      <div class="ml-md-10 col-12 col-sm-10 col-lg pa-0 mt-5 mt-lg-0">
        <h5 class="font-title comfortaa text-h6">
          {{ $t('account.spec.security.sessions') }}
        </h5>

        <v-card elevation="0" max-height="650" class="overflow-y-auto">
          <security-session-card
              class="pa-2 ma-1"
              v-for="(session,i) in sessions"
              v-show="i < 3 || showAll"
              :key="session.device"
              :user-agent="userAgent"
              :session="session"
              @delete-session="deleteSession"
          ></security-session-card>

          <v-row justify="center">
            <ui-default-button small @click="showAll=true">
              {{ $t('common.buttons.show-more') }}
            </ui-default-button>
          </v-row>

        </v-card>
      </div>

    </v-row>
  </account-base-layout>
</template>

<script>
import PasswordInput from "@/components/UI/Inputs/PasswordInput.vue";
import RepeatPasswordInput from "@/components/UI/Inputs/RepeatPasswordInput.vue";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton.vue";
import requests from "@/mixins/requests";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";
import SecuritySessionCard from "@/components/Specialized/Account/Any/SecurityTab/SecuritySessionCard.vue";

export default {
  name: "SecurityTab",
  components: {
    SecuritySessionCard,
    AccountBaseLayout,
    UiDefaultButton,
    RepeatPasswordInput,
    PasswordInput,
  },
  mixins: [requests],
  data() {
    return {
      sessions: undefined,
      userAgent: undefined,
      password: '',
      newPassword: '',
      valid: true,
      showAll: false
    }
  },
  methods: {
    getSessions() {
      this.getDataAuthed('any/sessions', {handleError: true, handleErrorResponse: true})
          .then(resp => {
            this.sessions = resp.data
          })
          .catch()
    },
    deleteSession(device) {
      this.$root.$emit('show-confirm',
          {
            text: this.$t('account.spec.security.delete-session-confirm')
          }
      )

      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delDataAuthed(`any/sessions?device=${device}`,
              {
                handleError: true,
                handleSuccess: true,
                successMessage: this.$t('account.spec.security.delete-session-success')
              })
              .then(() => {
                this.sessions = this.sessions.filter(session => session.device !== device)
                if (device === this.userAgent) this.logOut()
              })
              .catch(() => {
              })
        }
      })
    },
    changePassword() {
      if (this.$refs.form.validate()) {

        this.$root.$emit('show-confirm',
            {
              text: this.$t('account.spec.security.change-password-confirm')
            }
        )

        this.$root.$once('close-confirm', v => {
              if (v) {
                this.postDataAuthed(`auth/changePassword`,
                    {
                      password: this.password,
                      newPassword: this.newPassword,
                      email: this.$store.state.email
                    },
                    {
                      handleError: true,
                      handleSuccess: true,
                      successMessage: this.$t('account.spec.security.change-password-success')
                    })
                    .then(() => {
                      this.logOut()
                    })
                    .catch(() => {
                    })
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
  metaInfo() {
    return {
      title: this.$t('account.spec.security.section-name')
    }
  }
}
</script>

<style scoped>
.password-input >>> .v-input {
  max-width: 600px;
}
</style>