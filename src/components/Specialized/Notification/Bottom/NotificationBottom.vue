<template>
  <div :is="data.type" v-bind="data.content[data.type]"></div>
</template>

<script>
import NotificationBottomMessageCard
  from "@/components/Specialized/Notification/Bottom/NotificationBottomMessageCard.vue";
import NotificationBottomBookingCard
  from "@/components/Specialized/Notification/Bottom/NotificationBottomBookingCard.vue";
import NotificationBottomMediaCard from "@/components/Specialized/Notification/Bottom/NotificationBottomMediaCard.vue";

export default {
  name: "NotificationBottom",
  components: {
    message: NotificationBottomMessageCard,
    booking: NotificationBottomBookingCard,
    media: NotificationBottomMediaCard,
  },
  props: {
    data: {
      type: Object,
    }
  },
}
</script>

<style scoped>

</style>