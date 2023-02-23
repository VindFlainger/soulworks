<template>
  <ui-input-badge :value="required && showRequiredBadge">
    <v-text-field
        @input="$emit('input', $event)"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
        :style="{...$attrs.style, maxWidth: `${maxWidth}px`, minWidth: `${minWidth}px`}"
        filled
        background-color="white"
        class="input"
        dense
        outlined
        color="grey darken-2"
        validate-on-blur
        :rules="[
          v => (!!v || !required) || 'Это обязательное поле',
          ...rules
      ]"
    >
    </v-text-field>
    <div class="ml-3 mt-n1">
      <slot name="message"></slot>
    </div>
  </ui-input-badge>
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
    minWidth: {
      type: [Number, String],
      default: 270
    },
    maxWidth: {
      type: [Number, String],
      default: 300
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