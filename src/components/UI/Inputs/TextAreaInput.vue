<template>
  <v-textarea
      class="input textarea-input"
      :style="{maxWidth: $maxWidth, minWidth: $minWidth}"
      @input="$emit('input', $event)"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      outlined color="black"
      :auto-grow="autoGrow"
      :rules="[
          v => (!!v || !required) || $t('common.validation.field-required'),
          ...rules
      ]"
  ></v-textarea>
</template>

<script>
import inputs from "@/mixins/inputs";
import UiInputBadge from "@/components/UI/UiInputBadge";

export default {
  name: "TextAreaInput",
  components: {UiInputBadge},
  mixins: [inputs],
  props: {
    rules: {
      type: Array,
      default: () => []
    },
    autoGrow: {
      type: Boolean,
      default: true
    },
    value: String,
  }
}
</script>

<style scoped>
.textarea-input {
  border-radius: 15px;
  outline-color: black
}

.textarea-input >>> fieldset {
  border-color: black;
}

.error--text >>> fieldset {
  border-color: red !important;
}

.input >>> .v-label:first-letter {
  text-transform: uppercase;
}
</style>