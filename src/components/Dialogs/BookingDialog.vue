<template>
  <base-dialog :value="value" @close="$emit('close')" max-width="700">

    <div v-if="bookingData && timetable">
      <div class="fs-18">
        Специалист: <span class="font-title font-weight-bold">{{ bookingData.name }} {{ bookingData.surname }}</span>
      </div>

      <v-row v-if="value && bookingData" class="mt-2">
        <v-col class="pa-0">
          <select-input
              label="Методология"
              small-chips
              :items="bookingData.methods.map(method => {return {text: method.text, value: method._id}})"
          >
          </select-input>

          <select-input
              small-chips
              label="Специализация"
              :items="bookingData.specializations.map(specialization => {return {text: specialization.text, value: specialization._id}})"
          >
          </select-input>
        </v-col>

        <v-col class="pa-0">
          <select-input
              small-chips
              multiple
              :required="false"
              label="Условия"
              :items="[
              {
              text: 'Очная консультация',
              value: 'internal'
              },
              {
              text: 'Работа с детьми',
              value: 'children'
              },
              {
              text: 'Работа с подростками',
              value: 'teens'
              },
              {
              text: 'Семейный психолог',
              value: 'family'
              }
            ]"
          >
          </select-input>
        </v-col>
      </v-row>

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
                  :label="(_time < 10 ? `0${_time}` : _time) + ':00'"
                  :value="_time"
                  color="blue lighten-4"
                  :class="{active: time === _time}"
              ></v-radio>
            </div>
          </v-radio-group>
          <div v-else class="d-flex flex-column align-center mt-4">
            <v-img :src="require('@/assets/images/sad.png')" max-width="50" height="50"></v-img>
            <div class="text-center fs-14" style="font-weight: 600; max-width: 200px">На выбранную дату нет свободный
              мест
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex justify-space-between mt-3">
        <ui-default-button large @click="$emit('close')"></ui-default-button>
        <ui-confirm-button large>Записаться</ui-confirm-button>
      </div>
    </div>


  </base-dialog>
</template>


<script>
import SelectInput from "@/components/Inputs/SelectInput";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiCloseButton from "@/components/UI/Buttons/UiCloseButton";
import BaseDialog from "@/components/Dialogs/BaseDialog";

export default {
  name: "BookingDialog",
  components: {UiDefaultButton, BaseDialog, UiCloseButton, UiConfirmButton, SelectInput},
  data() {
    return {
      date: this.$moment().format().substring(0, 10),
      timetable: [],
      bookingData: null,
      time: -1
    }
  },
  props: {
    value: {
      type: Boolean,
    },
    specId: { // wrapper over content for prevent mounted loading
      type: String,
      default: '634d7e3bd6689065d4dee330'
    },

  },
  methods: {
    getBookingTimetable(date) {
      this.time = -1
      this.getData(`http://localhost:3000/user/classes/bookingTimetable?specId=${this.specId}&date=${date}`)
          .then(resp => {
                this.timetable = resp.data || []
                this.time = resp.data[0] ?? -1
              }
          )
          .catch()
    },
    getBookingData() {
      this.getData(`http://localhost:3000/user/classes/bookingData?specId=${this.specId}`)
          .then(resp => {
                this.bookingData = resp.data
              }
          )
          .catch()
    }
  },
  watch: {
    specId() {
      this.timetable = []
      this.bookingData = null
      this.getBookingData()
      this.getBookingTimetable(new Date(this.date).getTime())
    },
  },
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