<template>
  <v-menu offset-y max-width="250">
    <template v-slot:activator = "{on, attrs}">
      <v-btn x-small color="red lighten-4" class="ma-2" fab elevation="0" v-on="on" v-bind="attrs">
        <v-icon size="25" color="black">mdi-close</v-icon>
      </v-btn>

    </template>
    <slot></slot>
  </v-menu>
</template>

<script>
export default {
  name: "UiConfirmActionMenu"
}
</script>

<style scoped>

</style>