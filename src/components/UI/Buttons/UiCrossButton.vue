<template>
  <v-btn icon v-bind="$attrs" v-on="$listeners" outlined color="red">
    <v-icon color="red" v-bind="$attrs">mdi-close</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "UiCrossButton"
}
</script>

<style scoped>

</style>