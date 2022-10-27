<template>
  <v-card class="pa-4" elevation="0" v-if="timetable">
    <ui-full-width-banner :img="require('@/assets/images/profile/timetable.png')">
      <div class="fill-height d-flex align-center justify-center">
        <div class="font-title pa-5 rounded"
             style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px">
          Ваше расписание
        </div>
      </div>
    </ui-full-width-banner>

    <v-row >
      <v-col class="col-3">
        <v-list-item-group class="pa-0" @change="changeDay" :value="activeDay-1" mandatory ref="day-list">
          <v-list-item v-for="(day,index) in days" :key="day" dense class="rounded overflow-x-hidden"
                       :ref="`day-${index+1}`">
            {{ day }}
          </v-list-item>
        </v-list-item-group>

      </v-col>

      <v-col class="col-6 pa-0">
        <v-row>
          <v-col class="col-4 pa-0" v-for="i in [0,1,2]" :key="i">
            <v-list>
              <v-list-item
                  v-for="j in [0,1,2,3,4,5,6,7]" :key="j"
                  :class="timetable[activeDay].includes(j + i * 8)?'green lighten-5':''"
                  class="d-inline-block pt-2 ma-1 rounded">
            <span class="fs-18" style="font-weight: 600">
              {{ j + i * 8 < 10 ? `0${j + i * 8}` : j + i * 8 }}:00
            </span>
                <v-btn fab outlined x-small class="rounded ml-3" elevation="0"
                       style="position:relative; border: 2px #C8E6C9 solid;"
                       :class="{'d-none': timetable[activeDay].includes(j + i * 8)}"
                       @click="timetable[activeDay].push(j + i * 8); unsaved = true"
                >
                  <div class="plus"></div>
                </v-btn>
                <v-btn fab outlined color="blue lighten-4" x-small class="rounded ml-3" elevation="0"
                       style="position:relative; border: 2px #FFCDD2 solid"
                       @click="timetable[activeDay].splice(timetable[activeDay].indexOf(j + i * 8), 1); unsaved = true"
                       :class="{'d-none': !timetable[activeDay].includes(j + i * 8)}"
                >
                  <div class="close"></div>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>


      <v-col class="pa-0 pt-1 d-flex align-center">
        <div>
          <div class="font-title fs-14 font-weight-bold ">Справка</div>
          <div class="fs-12">
            Данное расписание является статическим и переносится на каждую неделю автоматически.
            Пользователем доступна запись на это расписание на 7 дней вперед.
            В случае если вы не успеете изменить расписание заблаговременно пользователю сможет записаться к
            вам на консультацию, а за ее отмену или пропуск Вам будут начислены штрафные баллы.
          </div>
          <v-row class="align-self-end mt-3">
            <v-btn color="red lighten-3" outlined @click="deleteTimetable(activeDay)">Очистить</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green lighten-3" outlined @click="setTimetable(activeDay, timetable[activeDay])">Сохранить
            </v-btn>
          </v-row>
        </div>


      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
export default {
  name: "SpecTimetableTab",
  components: {UiFullWidthBanner},

  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      activeDay: 1,
      timetable: undefined,
      unsaved: false
    }
  },
  methods: {
    getTimetable() {
      this.getData('http://localhost:3000/spec/timetable', {handleError: true, handleErrorResponse: true})
          .then(resp => {
            this.timetable = resp.data.timetable
          })
          .catch()
    },
    setTimetable(day, timetable) {
      this.putData('http://localhost:3000/spec/timetable', {
        day, timetable
      })
          .then(() => {
            this.showAlert('success', 'Расписание успешно обновлено', 2000)
            this.unsaved = false
          })
          .catch()
    },
    deleteTimetable(day) {
      this.delData(`http://localhost:3000/spec/timetable?day=${day}`)
          .then(() => {
            this.timetable[day] = []
            this.showAlert('success', 'Расписание успешно удалено', 2000)
          })
          .catch()
    },
    changeDay(v) {
      console.log(v)
      if (this.unsaved) {
        this.$root.$emit('show-confirm', {text: 'Вы не сохранили внесенные изменения'})

        this.$root.$once('close-confirm', (confirm) => {
          if (confirm) {
            this.activeDay = v + 1;
            this.unsaved = false
          } else {
            this.$refs["day-list"].$data.internalLazyValue = this.activeDay - 1
          }
        })
      } else {
        this.activeDay = v + 1
        this.unsaved = false
      }
    },
  },

  mounted() {
    this.getTimetable()
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