<template>
  <div :is="content.type" v-bind="content.content[content.type]"></div>
</template>

<script>


import AlertsNotificationMessageCard
  from "@/components/Specialized/Main/Alerts/Notification/AlertsNotificationMessageCard.vue";
import AlertsNotificationBookingCard
  from "@/components/Specialized/Main/Alerts/Notification/AlertsNotificationBookingCard.vue";
import AlertsNotificationMediaCard
  from "@/components/Specialized/Main/Alerts/Notification/AlertsNotificationMediaCard.vue";

export default {
  name: "AlertsNotification",
  components: {
    message: AlertsNotificationMessageCard,
    booking: AlertsNotificationBookingCard,
    media: AlertsNotificationMediaCard,
  },
  props: {
    content: {
      type: Object,
    }
  },
}
</script>

<style scoped>

</style>