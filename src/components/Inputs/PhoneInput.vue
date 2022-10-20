<template>
  <ui-input-badge :value="required">
    <v-text-field
        v-mask="'+375 (##) ###-##-##'"
        :label="focused?'Телефон':value?.length?'Телефон':'+375 (__) ___-__-__'"
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
          v => !!v || 'Введите номер телефона',
          v => v.replace(/[\+ \()-]/g, '').length === 12 || 'Некорректный номер телефона',
          v => codes.some(code => v.replace(/[\+ \()-]/g, '').substring(3,5) === code) || 'Некорректный код'
      ]"
        validate-on-blur
        @focus="paste(); focused = true"
        @blur="focused = false"
    >

    </v-text-field>
  </ui-input-badge>
</template>

<script>
import {mask} from 'vue-the-mask'
import UiInputBadge from "@/components/UI/UiInputBadge";
import inputs from "@/mixins/inputs";

export default {
  name: 'PhoneInput',
  components: {UiInputBadge},
  data() {
    return {
      focused: false
    }
  },
  props: {
    codes: {
      type: Array,
      default: () => ['33', '29', '44']
    },
    value: String
  },
  methods: {
    paste() {
      if (!this.phone?.length) {
        this.$emit('input', '+375 (')
      }
    }
  },
  mixins: [inputs],
  directives: {mask}
}
</script>

<style scoped>

</style>