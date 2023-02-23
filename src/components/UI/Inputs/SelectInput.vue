<template>
  <v-select
      class="input"
      :style="{maxWidth: $maxWidth, minWidth: $minWidth}"
      v-bind="$attrs"
      v-on="$listeners"
      filled
      background-color="white"
      off
      dense
      outlined
      color="black"
      @input="$emit('input', $event)"
      :value="value"
      :rules="[
          v => (!!v || !required) || $t('common.validation.field-required'),
          v => $attrs.multiple === undefined || (!required || v.length !== 0)  || $t('common.validation.at-least-one-required')
      ]"
      :menu-props="{bottom: true, offsetY: true, rounded: 'b-xl t-xl', 'nudge-top': -3}"
      validate-on-blur
  >
    <template v-slot:append>
      <div class="append">

      </div>
    </template>
  </v-select>
</template>

<script>
import inputs from "@/mixins/inputs";

export default {
  name: "SelectInput",
  props: {
    value: [String, Array, Number],
  },
  mixins: [inputs]
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


.append {
  position: relative;
  width: 20px;
  height: 20px;
  top: 7px;
}

.append::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 1.5px;
  left: 0;
  top: 0;
  background: black;
  transform-origin: left;
  transform: rotate(45deg);
}

.append::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 1.5px;
  right: 0;
  top: 0;
  background: black;
  transform-origin: right;
  transform: rotate(-45deg);
}

.error--text >>> .append::before, .error--text >>> .append::after {
  background: red;
}

.input >>> .v-label:first-letter {
  text-transform: uppercase;
}
</style>
