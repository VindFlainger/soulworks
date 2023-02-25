<template>
  <notification-base-card
      :read="read"
      :title="title"
      :date="date"
  >
    <template v-slot:preview>
      <v-icon size="64">
        {{ icon }}
      </v-icon>

    </template>
    <template v-slot:content>
      <div class="fs-16">
        {{ text }}
      </div>
    </template>

    <template v-slot:actions>
      <ui-default-button
          v-if="url"
          :href="url"
          small
      >
        {{ $t('common.buttons.follow') }}
      </ui-default-button>

      <ui-confirm-button
          v-if="!read"
          @click="$emit('read')"
          small
      >
        {{ $t('common.buttons.read') }}
      </ui-confirm-button>
    </template>
  </notification-base-card>
</template>

<script>
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import NotificationBaseCard from "@/components/Specialized/Notification/NotificationBaseCard";

export default {
  name: "NotificationMessageCard",
  components: {
    NotificationBaseCard,
    UiDefaultButton,
    UiConfirmButton
  },
  props: {
    read: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      default: 'mdi-bell-ring',
      validator: v => v.startsWith('mdi-')
    },
  }
}
</script>

<style scoped>

</style>