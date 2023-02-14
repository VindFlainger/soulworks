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

    <v-row class="mt-3 align-start" justify="center" justify-md="start">

      <date-input
          class="col-md-4"
          :width="viewportHook({base: 250, lg: 310})"
          style="max-width: 320px"
          v-model="date"
          @change="getClasses(new Date($event).getTime())"
      ></date-input>

      <div class="ml-md-4 ml-xl-16 col-md-7 col-auto pa-0">

        <div class="d-none font-title fs-22 font-weight-bold">
          {{ $moment(date).format('LL') }}
        </div>

        <div
            class="mb-3"
            style="max-width: 550px"
            v-for="_class in classes"
            :key="_class.time"
        >
          <v-row
              align="center"
          >

            <h4 class="col-12 text-h5 font-weight-bold pa-1">
              {{ `${_class.time < 10 ? '0' : ''}${_class.time}:00` }}
            </h4>

            <v-row class="pa-0 flex-nowrap ml-2" align="center">
              <ui-class-indicators
                  :state="_class.state"
                  class="d-flex flex-column"
              ></ui-class-indicators>

              <ui-avatar
                  class="ml-1"
                  size="70"
                  :img-size="64"
                  :images="_class.participant.avatar?.images"
              ></ui-avatar>

              <div class="ml-3">
                <router-link
                    class="text-decoration-none black--text text-subtitle-1 font-weight-bold text-subtitle-1"
                    :to="{name: 'profile', params: {id: _class.participant._id}}">
                  {{ _class.participant.surname }} {{ _class.participant.name }}
                </router-link>

                <p class="text-caption" style="overflow-wrap: anywhere">
                  {{ _class.participant.email }}
                </p>
              </div>

              <v-spacer></v-spacer>

              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="ma-1"
                        :disabled="!!_class.state || new Date(_class.date).setHours(_class.time) < Date.now()"
                        elevation="0"
                        color="red"
                        fab
                        outlined
                        x-small
                        @click="delClass(_class._id)"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>Отменить занятие</span>
                </v-tooltip>


                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="ma-1"
                        :disabled="!!_class.state || new Date(_class.date).setHours(_class.time) > Date.now()"
                        elevation="0"
                        color="orange"
                        fab
                        outlined
                        x-small
                        @click="reportClass(_class._id)"
                    >
                      <v-icon>mdi-alert-box-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Сообщить о пропуске</span>
                </v-tooltip>
              </div>

            </v-row>

          </v-row>

          <ui-class-data
              class="ml-2"
              :opportunities="_class.opportunities"
              :method="_class.method.text"
              :specialization="_class.specialization.text"
          ></ui-class-data>


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
    </v-row>


  </v-card>
</template>

<script>

import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import UiAvatar from "@/components/UI/UiAvatar";
import requests from "@/mixins/requests";
import DateInput from "@/components/UI/Inputs/DateInput";
import UiClassData from "@/components/UI/UiClassData.vue";
import UiClassIndicators from "@/components/UI/UiClassIndicators.vue";

export default {
  name: "SpecClassesTab",
  components: {UiClassIndicators, UiClassData, DateInput, UiAvatar, UiFullWidthBanner},
  mixins: [requests],
  data() {
    return {
      date: new Date().toISOString().substring(0, 10),
      classes: []
    }
  },
  methods: {
    getClasses(date) {
      this.getDataAuthed(`spec/classes/getClasses?date=${date}&timeOffset=${-new Date().getTimezoneOffset() / 60}`)
          .then(resp => {
            this.classes = resp.data
          })
          .catch()
    },
    delClass(id) {
      this.$root.$emit('show-confirm',
          {
            text: 'За отмену занятия Вам будут начислены штрафные баллы. ' +
                'Если инициатива исходит не от Вас - сообщите клиенту о возможности отмены им занятия без штрафных санкций!'
          }
      )
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delDataAuthed(`spec/classes/cancelClass?classId=${id}`,
              {
                handleError: true,
                handleSuccess: true,
                successMessage: 'Консультация успешно отменена'
              }
          )
              .then(() => {
                this.classes.find(_class => _class._id === id).state = 'cancelled'
              })
              .catch(() => {
              })
        }
      })
    },
    reportClass() {
      this.$root.$emit('show-confirm',
          {
            text: 'Ваше обращение будет обработано в ближайшее время'
          }
      )
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