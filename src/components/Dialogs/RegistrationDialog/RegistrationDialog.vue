<template>
  <base-dialog easy-container
               :value="true"
               max-width="1200"
               content-class="white"
               @close="$root.$emit('close-registration')"
  >
    <v-stepper v-model="step" elevation="0" flat class="stepper">
      <v-stepper-header>
        <v-divider></v-divider>
        <v-stepper-step step="1" :complete="step > 1" color="green lighten-3">
          <span class="fs-16 font-title">Выбор профиля</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2">
          <span class="fs-16 font-title">Личная/рабочая информация</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step > 3">
          <span class="fs-16 font-title">Аутенцификация</span>
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>

      <v-stepper-content step="1" class="pb-16">
        <ui-next-button absolute right bottom min-width="100" :disabled="!role"
                        @click="step = 2">
        </ui-next-button>
        <v-row justify="space-around">
          <v-card width="300" height="400" outlined class="pa-2">
            <v-img :src="require('@/assets/images/spec.png')"
                   height="330"
                   contain>
            </v-img>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab small elevation="0" @click="role='spec'" :ripple="false">
                <v-avatar :color="role==='spec'?'blue lighten-4':''" size="28"
                          style="outline: solid #BBDEFB 1px"></v-avatar>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

          <v-card width="300" height="400" outlined class="pa-2">
            <v-img :src="require('@/assets/images/user.png')" height="330" contain>

            </v-img>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab small elevation="0" @click="role='user'" :ripple="false">
                <v-avatar :color="role==='user'?'blue lighten-4':''" size="28"
                          style="outline: solid #BBDEFB 1px"></v-avatar>

              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-stepper-content>


      <registration-user v-if="role === 'user'" v-model="step">

      </registration-user>


      <registration-spec v-if="role === 'spec'" v-model="step">

      </registration-spec>


    </v-stepper>
  </base-dialog>
</template>

<script>

import RegistrationUser from "@/components/Dialogs/RegistrationDialog/RegistrationUser";
import RegistrationSpec from "@/components/Dialogs/RegistrationDialog/RegistrationSpec";
import BaseDialog from "@/components/Dialogs/BaseDialog";
import UiNextButton from "@/components/UI/Buttons/UiNextButton";

export default {
  name: "RegistrationDialog",

  data() {
    return {
      step: 1,
      role: 'spec',
    }
  },
  components: {
    UiNextButton,
    BaseDialog,
    RegistrationSpec,
    RegistrationUser,
  },
}
</script>

<style scoped>
.v-btn::before {
  background-color: transparent;
}

.v-stepper__header {
  box-shadow: none;
  background: rgba(197, 154, 197, 0.29);
}

.stepper >>> .v-stepper__step__step {
  background-color: #757575 !important;
}

.stepper >>> .v-stepper__step--complete .v-stepper__step__step {
  background-color: #A5D6A7 !important;
}

.licence >>> .v-card__text::-webkit-scrollbar {
  width: 10px !important;
  background: black !important;
}

</style>