<template>
  <v-date-picker
      :title-date-format="v => $moment(v).format('LL')"
      v-on="$listeners"
      v-bind="$attrs"
      :month-format="v => $moment(v).format('MMMM')"
      :weekday-format="v => $moment(v).format('dd')"
      :first-day-of-week="1"
      :header-date-format="v => $moment(v).format('MMMM')"
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