<template>
  <v-btn
      v-bind="$attrs"
      v-on="$listeners"
      class="link-button"
      outlined
      rounded
      small
      :href="href"
      :to="to"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "UiLinkButton",
  props: {
    href: String,
    to: [String, Object]
  }
}
</script>

<style scoped>
</style>