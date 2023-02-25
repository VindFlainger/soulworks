<template>
  <div
      class="mb-2 mt-2 pb-1 pt-1 pr"
      :class="{'notification-base-card__unread': !read}"
  >
    <v-row
        class="flex-nowrap ml-1"
        style="position:relative"
    >
      <v-sheet width="80" class="d-flex flex-column align-center">
        <slot name="preview"></slot>

        <p class="font-weight-medium text-body-2 date-container mt-2">
          <code>{{ dynamicDate(date) }}</code>
        </p>
      </v-sheet>

      <v-col style="max-width: calc(100% - 80px)" class="pl-2 pr-2 pa-0 pr flex-grow-1">
        <slot name="title">
          <h4 class="font-weight-bold text-h6">
            {{ title }}
          </h4>
        </slot>

        <slot name="content"></slot>

        <v-row class="mt-2" justify="space-between">
          <slot name="actions"></slot>
        </v-row>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import time from "@/mixins/filters/time";

export default {
  name: "NotificationBaseCard",
  mixins: [time],
  props: {
    read: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
.notification-base-card__unread::before {
  content: "";
  left: -3px;
  top: 5px;
  position: absolute;
  height: 100%;
  width: 2px;
  background: #9ec99d;
}
</style>