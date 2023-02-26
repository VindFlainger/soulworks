<template>
  <base-dialog
      :value="value"
      @close="$emit('close')"
      max-width="640"
      :empty="this.isLoading"
  >
    <div class="pa-sm-1" v-if="!this.isLoading">
      <div class="text-h6 text-title font-weight-regular sans">
        {{ $t('common.roles.specialist') }}:
        <span class="font-title font-weight-bold text-capitalize">{{ name }} {{ surname }}</span>
      </div>

      <v-row class="justify-center align-center flex-column flex-sm-row" style="min-height: 460px">
        <date-input
            v-model="date"
            max-width="270"
            :width="260"
            @change="getBookingTimetable(new Date($event).getTime())"
            :min="this.$dj().toISOString()"
            :max="this.$dj().add(7, 'days').toISOString()"
        ></date-input>

        <v-form class="ml-0 ml-sm-3 mt-3 mt-sm-0 flex-grow-1" ref="form">

          <select-input
              :label="$t('common.labels.method')"
              min-width="250"
              small-chips
              v-model="method"
              :items="methods.map(method => {return {text: method.text, value: method._id}})"
          ></select-input>

          <select-input
              :label="$t('common.labels.specialization')"
              min-width="250"
              small-chips
              v-model="specialization"
              :items="specializations.map(specialization => {return {text: specialization.text, value: specialization._id}})"
          ></select-input>

          <select-input
              small-chips
              multiple
              :required="false"
              :label="$t('common.labels.opportunities')"
              min-width="250"
              v-model="opportunities"
              :items="$store.getters['params/getOpportunities']"
          ></select-input>

        </v-form>

        <v-col class="pa-0 col-auto">
          <v-radio-group v-if="timetable.length > 0" v-model="time" class="radios ma-0">
            <div style="column-count: 3; column-fill: auto"
                 class="mt-2">
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
            <v-sheet max-width="200" class="text-center text-body-1">
              {{ $t('booking.no-time') }}
            </v-sheet>
          </div>

        </v-col>
      </v-row>

      <div class="d-flex justify-space-between mt-3">
        <ui-default-button large @click="$emit('close')"></ui-default-button>
        <ui-confirm-button
            large
            :disabled="time<=0 || this.internalLoading"
            @click="booking"
        >
          {{ $t('common.buttons.order') }}
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
import DateInput from "@/components/UI/Inputs/DateInput.vue";

export default {
  name: "BookingDialog",
  components: {
    DateInput,
    UiDefaultButton,
    BaseDialog,
    UiConfirmButton,
    SelectInput
  },
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
    specId: {
      type: String,
    },
  },
  methods: {
    getBookingTimetable(date) {
      this.addInternalLoading()
      this.time = -1
      this.getDataAuthed(`user/classes/bookingTimetable`, {handleError: true},
          {
            params: {
              specId: this.specId,
              date,
              timeOffset: this.$store.getters.getTimeZoneOffset
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
      this.getDataAuthed(`user/classes/bookingData?specId=${this.specId}`, {handleError: true})
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
        this.postDataAuthed('user/classes/booking', {
          specId: this.specId,
          date: new Date(this.date).setUTCHours(0, 0, 0, 0),
          method: this.method,
          specialization: this.specialization,
          opportunities: this.opportunities,
          time: this.time,
          timeOffset: this.$store.getters.getTimeZoneOffset
        }, {
          handleError: true,
          handleSuccess: true,
          successMessage: this.$t('booking.add-success')
        })
            .then(() => {
              this.$emit('close')
            })
            .catch(() => {
            })

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