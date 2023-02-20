<template>
  <div
      style="max-width: 550px"
  >
    <v-row align="center">

      <h4 class="col-12 text-h5 font-weight-bold pa-1">
        {{ `${time < 10 ? '0' : ''}${time}:00` }}
      </h4>

      <v-row class="pa-0 flex-nowrap ml-2" align="center">
        <ui-class-indicators
            :state="state"
            class="d-flex flex-column"
        ></ui-class-indicators>

        <ui-avatar
            class="ml-1"
            size="70"
            :img-size="64"
            :images="participant.avatar?.images"
        ></ui-avatar>

        <div class="ml-3">
          <router-link
              class="text-decoration-none black--text text-subtitle-1 font-weight-bold text-subtitle-1"
              :to="{name: 'profile', params: {id: participant._id}}">
            {{ participant.surname }} {{ participant.name }}
          </router-link>

          <p class="text-caption" style="overflow-wrap: anywhere">
            {{ participant.email }}
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
                  :disabled="!!state || new Date(date).setHours(time) < Date.now()"
                  elevation="0"
                  color="red"
                  fab
                  outlined
                  x-small
                  @click="$emit('del-class')"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('account.spec.classes.cancel-tooltip') }}</span>
          </v-tooltip>


          <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  class="ma-1"
                  :disabled="!!state || new Date(date).setHours(time) > Date.now()"
                  elevation="0"
                  color="orange"
                  fab
                  outlined
                  x-small
                  @click="$emit('report-class')"
              >
                <v-icon>mdi-alert-box-outline</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('account.spec.classes.report-tooltip') }}</span>
          </v-tooltip>
        </div>

      </v-row>

    </v-row>

    <ui-class-data
        class="ml-2"
        :opportunities="opportunities"
        :method="method.text"
        :specialization="specialization.text"
    ></ui-class-data>

  </div>
</template>

<script>
import UiClassData from "@/components/UI/UiClassData.vue";
import UiClassIndicators from "@/components/UI/UiClassIndicators.vue";
import UiAvatar from "@/components/UI/UiAvatar.vue";

export default {
  name: "SpecClassesCard",
  components: {UiAvatar, UiClassIndicators, UiClassData},
  props: {
    id: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: false
    },
    participant: {
      type: Object,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    method: {
      type: Object,
      required: true
    },
    specialization: {
      type: Object,
      required: true
    },
    opportunities: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>