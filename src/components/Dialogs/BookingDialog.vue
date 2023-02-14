<template>
  <base-dialog :value="value" @close="$emit('close')" max-width="700" :empty="this.isLoading">
    <div v-if="!this.isLoading">
      <div class="fs-18">
        Специалист: <span class="font-title font-weight-bold">{{ name }} {{ surname }}</span>
      </div>

      <v-form ref="form">
        <v-row class="mt-2">
          <v-col class="pa-0">
            <select-input
                label="Методология"
                small-chips
                v-model="method"
                :items="methods.map(method => {return {text: method.text, value: method._id}})"
            >
            </select-input>

            <select-input
                small-chips
                label="Специализация"
                v-model="specialization"
                :items="specializations.map(specialization => {return {text: specialization.text, value: specialization._id}})"
            >
            </select-input>
          </v-col>

          <v-col class="pa-0">
            <select-input
                small-chips
                multiple
                :required="false"
                label="Условия"
                v-model="opportunities"
                :items="$store.state.params.opportunities"
            >
            </select-input>
          </v-col>
        </v-row>
      </v-form>

      <v-row style="min-height: 380px">
        <v-col class="pa-0">
          <v-date-picker v-model="date"
                         :title-date-format="v => $moment(v).format('LL')"
                         :month-format="v => $moment(v).format('MMMM')"
                         :weekday-format="v => $moment(v).format('dd')"
                         :first-day-of-week="1"
                         :header-date-format="v => $moment(v).format('MMMM')"
                         class="picker datepicker"
                         color="blue lighten-4"
                         elevation="1"
                         @change="getBookingTimetable(new Date($event).getTime())"
                         :min="this.$moment().toISOString()"
                         :max="this.$moment().add(7, 'days').toISOString()"
          >
          </v-date-picker>
        </v-col>
        <v-col class="pa-0 ml-5">
          <div class="font-title fs-22 font-weight-bold">
            {{ $moment(date).format('LL') }}
          </div>
          <v-radio-group v-if="timetable.length > 0" v-model="time" class="radios ma-0">
            <div style="-webkit-column-count: 2; -moz-column-count: 2; column-count: 2; column-fill: auto" class="mt-2">
              <v-radio
                  :ripple="false"
                  class="mb-4"
                  v-for="_time in timetable"
                  :key="_time"
                  :label="(_time < 10 ? `0${_time}` : _time) + ':00'"
                  :value="_time"
                  color="blue lighten-4"
                  :class="{active: time === _time}"
              ></v-radio>
            </div>
          </v-radio-group>
          <div v-else class="d-flex flex-column align-center mt-4">
            <v-img :src="require('@/assets/images/content/no-content-1.png')" max-width="50" height="50"></v-img>
            <div class="text-center fs-14" style="font-weight: 600; max-width: 200px">На выбранную дату нет свободный
              мест
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex justify-space-between mt-3">
        <ui-default-button large @click="$emit('close')"></ui-default-button>
        <ui-confirm-button large :disabled="time<=0 || this.internalLoading" @click="booking">Записаться
        </ui-confirm-button>
      </div>
    </div>


  </base-dialog>
</template>


<script>
import SelectInput from "@/components/UI/Inputs/SelectInput";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import BaseDialog from "@/components/Dialogs/BaseDialog";
import requests from "@/mixins/requests";

export default {
  name: "BookingDialog",
  components: {UiDefaultButton, BaseDialog, UiConfirmButton, SelectInput},
  data() {
    return {
      name: '',
      surname: '',
      date: this.$moment().format().substring(0, 10),
      timetable: [],
      methods: [],
      specializations: [],
      time: -1,
      specialization: null,
      method: null,
      opportunities: []
    }
  },
  props: {
    value: {
      type: Boolean,
    },
    specId: { // wrapper over content for prevent mounted loading
      type: String,
    },
  },
  methods: {
    getBookingTimetable(date) {
      this.addInternalLoading()
      this.time = -1
      this.getData(`http://localhost:3000/user/classes/bookingTimetable`, null, false,
          {
            params: {
              specId: this.specId,
              date,
              timeOffset: -new Date().getTimezoneOffset() / 60
            }
          })
          .then(resp => {
                this.timetable = resp.data || []
                this.time = resp.data[0] ?? -1
              }
          )
          .catch()
          .finally(this.removeInternalLoading)
    },
    getBookingData() {
      this.addLoadingProcess()
      this.getDataAuthed(`http://localhost:3000/user/classes/bookingData?specId=${this.specId}`)
          .then(resp => {
            this.specializations = resp.data.specializations
            this.methods = resp.data.methods
            this.name = resp.data.name
            this.surname = resp.data.surname
          })
          .catch(() => this.$emit('close'))
          .finally(this.removeLoadingProcess)
    },
    booking() {
      if (this.$refs.form.validate()) {
        this.postDataAuthed('http://localhost:3000/user/classes/booking', {
          specId: this.specId,
          date: new Date(this.date).setUTCHours(0, 0, 0, 0),
          method: this.method,
          specialization: this.specialization,
          opportunities: this.opportunities,
          time: this.time,
          timeOffset: this.$store.state.timeZoneOffset
        })
            .then(() => {
              this.$emit('close')
              this.$root.$emit('push-message', {
                time: 2000,
                type: 'success',
                text: 'Вы успешно записались на консультацию'
              })
            })
            .catch()

      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.timetable = []
        this.method = null
        this.specialization = null
        this.opportunities = []
        this.time = -1
        this.date = this.$moment().format().substring(0, 10)
        this.getBookingData()
        this.getBookingTimetable(new Date(this.date).getTime())
      }
    },
  },
  mixins: [requests]
}
</script>

<style scoped>
.datepicker >>> .v-date-picker-title__date {
  font-size: 22px !important;
}

.radios >>> .theme--light.v-icon {
  color: #BBDEFB !important;
}

.radios >>> .v-label {
  font-size: 16px;
  font-weight: 600;
  color: grey;
}

.radios >>> .active .v-label {
  color: black;
}


.radios >>> .v-input--selection-controls__input {
  position: relative;
  transform: scale(1.3);
}

.radios >>> .v-input--selection-controls__ripple::before {
  display: none;
}
</style>