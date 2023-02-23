<template>
  <v-date-picker
      :title-date-format="v => $dj(v).format('DD MMMM, YYYY')"
      v-on="$listeners"
      v-bind="$attrs"
      :month-format="v => $dj(v).format('MMMM')"
      :weekday-format="v => $dj(v).format('dd')"
      :first-day-of-week="1"
      :header-date-format="v => $dj(v).format('MMMM')"
      class="picker pa-1"
      color="blue lighten-3"
      style="border: 1px solid black; border-radius: 14px"
      :style="{maxWidth: $maxWidth}"
  >
  </v-date-picker>
</template>

<script>
import metrics from "@/mixins/metrics";

export default {
  name: "DateInput",
  mixins: [metrics]
}
</script>

<style scoped>

</style>