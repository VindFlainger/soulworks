<template>
  <v-row class="pa-2 ma-1 mb-3 bordered" align="center" justify="space-between">
    <v-chip
        v-for="chip in chips"
        :key="chip.name"
        class="ma-1 ma-sm-0">
      {{ chip.name }}
      <span class="font-weight-bold ml-1">{{ chip.value }}</span>
    </v-chip>
    <slot></slot>
  </v-row>
</template>

<script>
export default {
  name: "AccountBaseChips",
  props: {
    chips: {
      type: Array,
      required: false
    }
  }
}
</script>

<style scoped>

</style>