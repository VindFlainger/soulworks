<template>
  <account-base-layout
      :preview-title="$t('account.spec.timetable.section-name')"
      :preview-image="require('@/assets/images/account/timetable.png')"
  >
    <v-row>
      <v-col class="col-12 col-sm-4 col-lg-3">
        <v-list-item-group
            class="pa-0"
            v-model="activeDay"
            mandatory
        >
          <v-list-item
              class="rounded overflow-x-hidden"
              v-for="day in days"
              :key="day" dense
          >
            {{ day }}
          </v-list-item>
        </v-list-item-group>
      </v-col>

      <v-col class="col-12 col-sm-7 col-md-8 col-lg-6 pa-0">
        <v-row>
          <v-col
              class="col-4 pa-0"
              v-for="i in [0,1,2]"
              :key="i"
          >
            <v-list>
              <!-- TODO: rewrite this freaking code with css cols-->
              <v-list-item
                  class="d-inline-block pa-2 ma-1 rounded pa-md-3"
                  v-for="j in [0,1,2,3,4,5,6,7]"
                  :key="j"
                  :class="timetable.includes((24 * activeDay + (j + i * 8)))?'green lighten-5':''"
              >
                <span
                    class="text-body-2 text-md-h6 font-weight-medium"
                    style="font-weight: 600"
                >
                  {{ j + i * 8 < 10 ? `0${j + i * 8}` : j + i * 8 }}:00
                </span>

                <v-btn
                    class="rounded ml-1"
                    style="position:relative; border: 2px #C8E6C9 solid;"
                    :class="{'d-none': timetable.includes(24 * activeDay + (j + i * 8))}"
                    fab
                    outlined
                    x-small
                    elevation="0"
                    @click="addTime(24 * activeDay + (j + i * 8))"
                >
                  <div class="plus"></div>
                </v-btn>

                <v-btn
                    class="rounded ml-1"
                    style="position:relative; border: 2px #FFCDD2 solid"
                    :class="{'d-none': !timetable.includes(24 * activeDay + (j + i * 8))}"
                    elevation="0"
                    color="blue lighten-4"
                    fab
                    outlined
                    x-small
                    @click="delTime(24 * activeDay + (j + i * 8))"
                >
                  <div class="close"></div>
                </v-btn>

              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>


      <v-col class="pa-0 pt-1 d-flex align-center col-12 col-lg-3">
        <div>
          <h5 class="font-title comfortaa text-body-1 font-weight-bold">
            {{$t('account.spec.timetable.info')}}
          </h5>
          <p class="text-caption sans">
            {{$t('account.spec.timetable.info-text')}}
          </p>
        </div>
      </v-col>
    </v-row>
  </account-base-layout>

</template>

<script>
import requests from "@/mixins/requests";
import {mapGetters} from "vuex";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";

export default {
  name: "SpecTimetableTab",
  components: {AccountBaseLayout},
  mixins: [requests],
  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      activeDay: 0,
      timetable: undefined,
    }
  },
  computed: {
    ...mapGetters({
      timeZoneOffset: 'getTimeZoneOffset'
    })
  },
  mounted() {
    this.getTimetable()
  },
  methods: {
    getTimetable() {
      this.getDataAuthed(`spec/timetable/getTime?timeOffset=${this.timeZoneOffset}`, {handleError: true})
          .then(resp => {
            this.timetable = resp.data
          })
          .catch(() => {
          })
    },
    addTime(time) {
      this.postDataAuthed('spec/timetable/setTime',
          {
            time,
            timeOffset: this.timeZoneOffset
          },
          {
            handleError: true,
            handleSuccess: true,
            successMessage: 'Расписание успешно обновлено'
          }
      )
          .then(() => {
            this.timetable.push(time)
          })
          .catch(() => {
          })
    },
    delTime(time) {
      this.delDataAuthed(`spec/timetable/deleteTime?time=${time}&timeOffset=${this.timeZoneOffset}`, {
        handleError: true,
        handleSuccess: true,
        successMessage: 'Расписание успешно обновлено'
      })
          .then(() => {
            this.timetable = this.timetable.filter(el => el !== time)
          })
          .catch(() => {
          })
    },
  },
  metaInfo() {
    return {
      title: this.$t('account.spec.timetable.section-name')
    }
  }
}
</script>

<style scoped>
.close {
  position: relative;
  width: 30px;
  height: 30px;
}

.close::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 32px;
  transform: rotate(45deg);
  transform-origin: left center;
  height: 1px;
  background: #FFCDD2;
  z-index: 10;
}

.close::before {
  content: '';
  position: absolute;
  top: 4px;
  right: 4px;
  width: 32px;
  transform: rotate(-45deg);
  transform-origin: right center;
  height: 1px;
  background: #FFCDD2;
  z-index: 10;
}


.plus {
  position: relative;
  width: 30px;
  height: 30px;
}

.plus::after {
  content: '';
  position: absolute;
  top: 2px;
  left: calc(50%);
  width: 1px;
  height: 26px;
  background: #C8E6C9;
  z-index: 10;
}

.plus::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 2px;
  width: 26px;
  height: 1px;
  background: #C8E6C9;
  z-index: 10;
}
</style>