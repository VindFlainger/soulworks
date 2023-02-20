<template>
  <div
      :class="row?'d-flex justify-center':''"
  >
    <div class="d-flex flex-column align-center">
      <v-icon
          class="d-block"
          color="red"
          :size="size"
      >
        mdi-alert
      </v-icon>
      <p class="ma-0 red--text font-weight-bold">
        {{ title }}
      </p>
      <span class="fs-10 text-center red--text">{{ message }}</span>
      <ui-default-button
          v-if="retrying"
          color="red"
          class="mt-2"
          @click="$emit('retry')"
      >
        Повторить
      </ui-default-button>
    </div>
  </div>
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
    row: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style scoped>
</style>