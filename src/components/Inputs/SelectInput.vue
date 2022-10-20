<template>
  <ui-input-badge :value="required">
  <v-select
      filled
      background-color="grey lighten-3"
      class="ma-1"
      :class="{'rounded-pill': !bigContent, 'rounded': bigContent}"
      style="max-width: 300px;"
      dense
      outlined
      color="grey darken-2"
      @input="$emit('input', $event)"
      :value="value"
      :rules="[
          v => (!!v || !required) || 'Это обязательное поле',
          v => $attrs.multiple === undefined || (!required || v.length !== 0)  || 'Необходимо выбрать как минимум один вариант'
      ]"
      validate-on-blur
      v-bind="$attrs"
  >
  </v-select>
  </ui-input-badge>
</template>

<script>
import inputs from "@/mixins/inputs";
import UiInputBadge from "@/components/UI/UiInputBadge";

export default {
  name: "SelectInput",
  components: {UiInputBadge},

  props: {
    value: [String, Array],
    bigContent: {
      type: Boolean,
      default: false
    }
  },
  mixins: [inputs]
}
</script>

<style scoped>

</style>