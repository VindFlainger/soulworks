<template>
  <div>
    <v-text-field
        filled
        background-color="grey lighten-3"
        class="rounded-pill ma-1"
        style="max-width: 300px;"
        dense
        outlined
        color="grey darken-2"
        @input="$emit('input', $event)"
        :value="value"
        validate-on-blur
        v-bind="$attrs"
        v-on="$listeners"
    >
    </v-text-field>
    <div class="ml-3 mt-n1">  <slot name="message"></slot></div>

  </div>


</template>

<script>
export default {
  name: "DefaultInput",
  props: {
    value: String,
  }
}
</script>

<style scoped>

</style>