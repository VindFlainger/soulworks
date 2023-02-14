<template>
  <div>
    <v-icon :disabled="state !== 'cancelled'" color="red lighten-3">mdi-close-octagon-outline</v-icon>
    <v-icon :disabled="state !== 'confirmed'" color="green lighten-3">mdi-check-decagram-outline</v-icon>
    <v-icon :disabled="state !== 'missed'" color="orange lighten-3">mdi-alert-octagon-outline</v-icon>
  </div>
</template>

<script>
export default {
  name: "UiClassIndicators",
  props: {
    state: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>