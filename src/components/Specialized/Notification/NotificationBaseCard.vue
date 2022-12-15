<template>
  <div
      class="mb-2 mt-2 pb-1 pt-1"
      style="border-radius: 14px; position:relative;"
      :class="{'notification-base-card__unread': !read}"
  >
    <v-row
        class="flex-nowrap"
        style="position:relative"
    >
      <div style="width: 64px">
        <slot name="preview"></slot>
      </div>
      <v-col
          class="pl-2 pr-2 pa-0"
          style="position:relative; width: calc(100% - 70px)"
      >

        <div
            class="font-weight-medium fs-14"
            style="position:absolute; top: 2px; right: 3px"
        >
          <code>{{ date | date }}</code>
        </div>

        <slot name="title">
          <div class="font-weight-bold fs-18">
            {{ title }}
          </div>
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
import {date} from "@/filters/logic";

export default {
  name: "NotificationBaseCard",
  filters: {
    date
  },
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
  width: 4px;
  background: #7da67c;
  border-radius: 5px 0 0 5px;
}
</style>