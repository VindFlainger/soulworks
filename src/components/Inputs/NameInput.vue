<template>
  <ui-input-badge :value="required">
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
        :rules="[
          v => (!!v || !required) || 'Это обязательное поле',
          v => $validator.isAlpha(v, 'ru-RU') || 'Некорректный ввод, доступны только кириллические буквы'
      ]"
        validate-on-blur
        v-bind="$attrs"
    >

    </v-text-field>
  </ui-input-badge>
</template>

<script>
import inputs from "@/mixins/inputs";
import UiInputBadge from "@/components/UI/UiInputBadge";

export default {
  name: "NameInput",
  components: {UiInputBadge},
  props: {
    value: String
  },
  mixins: [inputs]
}
</script>

<style scoped>

</style>