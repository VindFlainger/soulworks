<template>
  <v-card
      class="pa-4"
      elevation="0"
  >

    <ui-full-width-banner :img="require('@/assets/images/account/classes.png')">
      <div class="fill-height d-flex align-center justify-center">
        <div
            class="font-title pa-5 rounded"
            style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px"
        >
          Ваши консультации
        </div>
      </div>
    </ui-full-width-banner>

    <v-row class="mt-3">
      <date-input
          v-model="date"
          @change="getClasses(new Date($event).getTime())"
      ></date-input>

      <v-col class="ml-16">
        <div class="font-title fs-22 font-weight-bold">
          {{ $moment(date).format('LL') }}
        </div>

        <div v-if="classes">
          <div
              v-for="_class in classes"
              :key="_class.time"
          >
            <v-row
                style="max-width: 400px"
                align="center pa-3 pl-0"
            >
              <div>
                <span class="fs-20 font-weight-bold">{{ `${_class.time < 10 ? '0' : ''}${_class.time}:00` }}</span>
              </div>

              <ui-avatar
                  class="ml-3"
                  size="70"
                  :img-size="64"
                  :images="_class.participant.avatar?.images"
              ></ui-avatar>

              <div class="ml-4 pa-0">
                <div
                    class="fs-18"
                    style="font-weight: 600"
                >
                  <router-link
                      class="text-decoration-none black--text"
                      :to="{name: 'profile', params: {id: _class.participant._id}}">
                    {{ _class.participant.surname }} {{ _class.participant.name }}
                  </router-link>
                </div>
                <div class="fs-12 grey--text text--darken-2"> {{ _class.participant.email }}</div>
              </div>

              <v-spacer></v-spacer>

              <div class="d-flex flex-column mr-1">
                <v-icon :disabled="!_class.state.cancelled" color="red lighten-3">mdi-close-octagon-outline</v-icon>
                <v-icon :disabled="!_class.state.confirmed" color="green lighten-3">mdi-check-decagram-outline</v-icon>
                <v-icon :disabled="!_class.state.missed" color="orange lighten-3">mdi-alert-octagon-outline</v-icon>
              </div>

              <v-btn
                  :disabled="_class.state.cancelled || _class.state.confirmed || _class.state.missed"
                  elevation="0"
                  color="red"
                  fab
                  outlined
                  small
                  @click="delClass(_class._id)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>


          </div>
          <div
              class="d-flex flex-column align-center mt-4"
              v-if="classes.length === 0"
          >
            <v-img
                :src="require('@/assets/images/content/no-content-1.png')"
                max-width="50"
                height="50"
            ></v-img>

            <div
                class="text-center fs-14"
                style="font-weight: 600; max-width: 200px"
            >
              На выбранную дату нету засписей
            </div>
          </div>
        </div>
      </v-col>
    </v-row>


  </v-card>
</template>

<script>

import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import UiAvatar from "@/components/UI/UiAvatar";
import requests from "@/mixins/requests";
import DateInput from "@/components/UI/Inputs/DateInput";

export default {
  name: "SpecClassesTab",
  components: {DateInput, UiAvatar, UiFullWidthBanner},
  mixins: [requests],
  data() {
    return {
      date: new Date().toISOString().substring(0, 10),
      classes: null
    }
  },
  methods: {
    getClasses(date) {
      this.getData(`http://localhost:3000/spec/classes?date=${date}&timeOffset=${-new Date().getTimezoneOffset() / 60}`)
          .then(resp => {
            this.classes = resp.data
          })
          .catch()
    },
    delClass(id) {
      this.$root.$emit('show-confirm',
          {
            text: 'За отмену занятия Вам будут начислены штрафные баллы. ' +
                'Если инициатива исходит не от Вас сообщите клиенту о возможности отмены им занятия без штрафных санкций!'
          }
      )
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delData(`http://localhost:3000/spec/classes?id=${id}`)
              .then(() => {
                this.classes.find(_class => _class._id === id).state.cancelled = true
              })
              .catch()
        }
      })
    }
  },
  mounted() {
    this.getClasses(new Date(this.date).getTime())
  },
  metaInfo: {
    title: 'Консультации'
  }
}
</script>

<style scoped>
.picker >>> .v-date-picker-title__date {
  font-size: 20px !important;
}

.picker >>> .v-date-picker-title__year {
  display: none;
}

</style>