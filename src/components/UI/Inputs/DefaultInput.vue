<template>
  <v-text-field
      class="input"
      :style="{maxWidth: $maxWidth, minWidth: $minWidth}"
      @input="$emit('input', $event)"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      filled
      background-color="white"
      dense
      outlined
      color="grey darken-2"
      validate-on-blur
      :rules="[
          v => (!!v || !required) || $t('common.validation.field-required'),
          ...rules
      ]"
  ></v-text-field>
</template>

<script>
import inputs from "@/mixins/inputs";
import UiInputBadge from "@/components/UI/UiInputBadge";


export default {
  name: "DefaultInput",
  components: {UiInputBadge},
  mixins: [inputs],
  props: {
    value: String,
    rules: {
      type: Array,
      default: () => []
    },
  },
}
</script>

<style scoped>

.input {
  border-radius: 14px
}

.input >>> fieldset {
  border-color: black;
}

.input >>> .v-select__selections {
  padding-top: 5px !important;
}

.error--text >>> fieldset {
  border-color: red !important;
}

.input >>> .v-label:first-letter {
  text-transform: uppercase;
}
</style>