<template>
  <v-row
      class="flex-column d-inline-flex pa-1"
      align="center"
      :style="{width: `${maxWidth}px`, maxWidth: `${maxWidth}px`}"
  >
    <v-icon
        color="red"
        :size="size"
    >
      {{ icon }}
    </v-icon>
    <span class="mt-1 red--text font-weight-bold">
        {{ title }}
    </span>
    <span class="fs-10 text-center red--text">{{message}}</span>
    <ui-default-button
        v-if="retrying"
        color="red"
        class="mt-2"
        @click="$emit('retry')"
    >
      Повторить
    </ui-default-button>
  </v-row>
</template>

<script>
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton.vue";

export default {
  name: "UiProblem",
  components: {UiDefaultButton},
  props: {
    size: {
      type: Number,
      default: 40
    },
    retrying: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Произошла ошибка"
    },
    message: {
      type: String,
    },
    maxWidth: {
      type: Number,
      default: 350
    },
    kind: {
      type: String,
    }
  },
  computed: {
    icon() {
      switch (this.kind) {
        case 'request':
          return 'mdi-alert-octagon'
        default:
          return 'mdi-alert'
      }
    },
  }
}
</script>

<style scoped>
</style>