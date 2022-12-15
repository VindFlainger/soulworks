<template>
  <div
      class="white"
      style="width: 430px; max-height: calc(100vh - 134px);overflow-y: auto"
  >

    <div
        class="pa-2 fs-22 font-weight-bold font-title text-center"
        style="border-bottom: 2px solid black"
    >
      <v-icon
          class="mr-1"
          style="position:relative; top: -2px"
          color="black"
          size="30"
      >
        mdi-bell-outline
      </v-icon>
      Уведомления
    </div>

    <v-list class="pa-2">
      <div
          v-for="notification in notifications"
          :key="notification._id"
      >
        <notification-booking-card
            v-if="notification.type === 'booking'"
            :read="notification.read"
            :date="notification.createdAt"
            :opportunities="notification.content.booking.opportunities"
            :method="notification.content.booking.method.text"
            :specialization="notification.content.booking.specialization.text"
            :user-id="notification.content.booking.user._id"
            :user-name="notification.content.booking.user.name"
            :user-surname="notification.content.booking.user.surname"
            :avatar="notification.content.booking.user.avatar"
            :classDate="notification.content.booking.date"
            @read="$emit('read', notification._id)"
        ></notification-booking-card>

        <notification-message-card
            v-if="notification.type === 'message'"
            :read="notification.read"
            :date="notification.createdAt"
            :text="notification.content.message.text"
            :title="notification.content.message.title"
            :url="notification.content.message.url"
            :icon="notification.content.message.icon"
            @read="$emit('read', notification._id)"
        ></notification-message-card>

        <notification-media-card
            v-if="notification.type === 'media'"
            :read="notification.read"
            :date="notification.createdAt"
            :text="notification.content.media.text"
            :title="notification.content.media.title"
            :url="notification.content.media.url"
            :icon="notification.content.media.icon"
            :documents="notification.content.media.documents"
            :img="notification.content.media.img.url"
            @read="$emit('read', notification._id)"
        ></notification-media-card>

        <v-divider></v-divider>

      </div>
    </v-list>

    <div
        class="fs-20 font-weight-medium pa-2"
        v-if="!notifications.length && isLastLoaded"
    >
      <ui-fullscreen-no-content-banner>
        <template v-slot:append>
          <div>
            Вы еще не получали уведомлений!
          </div>
        </template>
      </ui-fullscreen-no-content-banner>
    </div>

    <v-row
        v-if="!isLastLoaded"
        class="pa-2"
        justify="center">
      <ui-default-button @click="$emit('load-more')">
        Загрузить еще
      </ui-default-button>
    </v-row>

  </div>
</template>

<script>
import NotificationBookingCard from "@/components/Specialized/Notification/NotificationBookingCard";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import NotificationMessageCard from "@/components/Specialized/Notification/NotificationMessageCard";
import NotificationMediaCard from "@/components/Specialized/Notification/NotificationMediaCard";

export default {
  name: "HeaderNotifications",
  components: {
    NotificationMediaCard,
    NotificationMessageCard,
    UiFullscreenNoContentBanner,
    UiDefaultButton,
    NotificationBookingCard
  },
  props: {
    notifications: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    isLastLoaded: {
      type: Boolean,
      required: true
    }
  },
}
</script>

<style scoped>

</style>