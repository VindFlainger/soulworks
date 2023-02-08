<template>
  <notification-bottom-base-card>
    <v-row class="flex-nowrap" align="center">
      <div>
        <h4 class="font-weight-bold text-h6 line-height-1rem">
          Новая консультация
        </h4>

        <h5 class="font-weight-medium text-subtitle-1 text-uppercase mt-2 ">
          Данные
        </h5>
        <div class="text-subtitle-1 font-weight-regular line-height-1rem">
          <p class="ma-0 mt-1">
            <v-icon>mdi-calendar-month</v-icon>
            {{ $moment(date).format('DD.MM.YYYY') }}
          </p>
          <p class="ma-0 mt-1">
            <v-icon>mdi-clock-time-eleven-outline</v-icon>
            {{ $moment(date).format('hh:mm') }}
          </p>
          <p class="ma-0 mt-1">
            <v-icon>mdi-cube</v-icon>
            {{ method.text }}
          </p>
          <p class="ma-0 mt-1">
            <v-icon>mdi-vector-polyline</v-icon>
            {{ specialization.text }}
          </p>
        </div>

        <h5 class="font-weight-medium text-subtitle-1 text-uppercase mt-2">
          Клиент
        </h5>
        <v-row>
          <router-link :to="{name: 'profile', params: {id: user.id}}">
            <ui-avatar
                :images="user.avatar?.images"
                :size="55"
                :img-size="64">
            </ui-avatar>
          </router-link>
          <div class="ml-3">
            <router-link
                :to="{name: 'profile', params: {id: user.id}}"
                class="ma-0 text-subtitle-1 font-weight-bold blue--text text-decoration-none">
              {{ user.name }}
              {{ user.surname }}
            </router-link>
            <p class="ma-0 text-body-2 line-height-1rem">
              {{ user.email }}
            </p>
          </div>
        </v-row>
      </div>
    </v-row>
  </notification-bottom-base-card>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar.vue";
import NotificationBottomBaseCard from "@/components/Specialized/Notification/Bottom/NotificationBottomBaseCard.vue";

export default {
  name: "NotificationBottomBookingCard",
  components: {NotificationBottomBaseCard, UiAvatar},
  props: {
    user: {
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