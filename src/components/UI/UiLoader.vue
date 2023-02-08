<template>
  <div :class="row?'d-flex justify-center':''" >
    <v-progress-circular
        :size="size"
        indeterminate
        width="8"
        color="black">
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "UiLoader",
  props: {
    size: {
      type: Number,
      default: 80
    },
    row: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
</style>