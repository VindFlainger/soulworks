<!--TODO: add requesting machine and animation-->
<template>
  <account-base-layout
      :preview-title="$t('account.spec.classes.section-name')"
      :preview-image="require('@/assets/images/account/classes.png')"
  >
    <v-row class="mt-3 align-start" justify="center" justify-md="start">

      <date-input
          class="col-md-4"
          :width="viewportHook({base: 250, lg: 310})"
          style="max-width: 320px"
          v-model="date"
          @change="getClasses"
      ></date-input>

      <div class="ml-md-4 ml-xl-16 col-md-7 col-auto pa-0">

        <spec-classes-card
            class="mb-3"
            v-for="_class in classes"
            :key="_class.time"
            :state="_class.state"
            :participant="_class.participant"
            :id="_class.id"
            :date="_class.date"
            :time="_class.time"
            :method="_class.method"
            :specialization="_class.specialization"
            :opportunities="_class.opportunities"
            @del-class="delClass(_class.id)"
            @report-class="reportClass(_class.id)"
        ></spec-classes-card>

        <ui-fullscreen-no-content-banner
            v-if="classes.length === 0"
            :title="$t('account.spec.classes.no-classes')"
        ></ui-fullscreen-no-content-banner>

      </div>
    </v-row>

  </account-base-layout>


</template>

<script>

import requests from "@/mixins/requests";
import DateInput from "@/components/UI/Inputs/DateInput.vue";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner.vue";
import SpecClassesCard from "@/components/Specialized/Account/Spec/ClassesTab/SpecClassesCard.vue";

export default {
  name: "SpecClassesTab",
  components: {SpecClassesCard, UiFullscreenNoContentBanner, AccountBaseLayout, DateInput},
  mixins: [requests],
  data() {
    return {
      date: new Date().toISOString().substring(0, 10),
      classes: []
    }
  },
  methods: {
    getClasses(date) {
      const UNIXDate = new Date(date).getTime()
      this.getDataAuthed(`spec/classes/getClasses?date=${UNIXDate}&timeOffset=${this.$store.getters.getTimeZoneOffset}`)
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
  metaInfo() {
    return {
      title: this.$t('account.spec.classes.section-name')
    }
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