<template>
  <notification-bottom-base-card>
    <v-row class="flex-nowrap" align="center">

      <div>
        <h4 class="text-h6 font-weight-bold line-height-1-25rem">
          <v-icon
              v-if="icon"
              class="crc-t-n2"
              :size="viewportHook({base: 20, lg: 30})"
          >
            {{ icon }}
          </v-icon>
          {{ title }}
        </h4>
        <p class="body-1 ma-0">{{ text }}</p>
      </div>

      <v-btn
          v-if="url"
          :href="url"
          v-bind="viewportHook({
              base: {small: true},
              md: {large: true},
              xl: {'x-large': true},
            })"
          icon
          color="black"
      >
        <v-icon>mdi-send-outline</v-icon>
      </v-btn>
    </v-row>
  </notification-bottom-base-card>
</template>

<script>
import NotificationBottomBaseCard from "@/components/Specialized/Notification/Bottom/NotificationBottomBaseCard.vue";

export default {
  name: "NotificationBottomMessageCard",
  components: {NotificationBottomBaseCard},
  props: {
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
      required: false
    }
  }
}
</script>

<style scoped>

</style>