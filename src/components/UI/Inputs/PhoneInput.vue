<template>
  <default-input
      v-mask="'+375 (##) ###-##-##'"
      :label="focused?'Телефон':lazyValue?.length?'Телефон':'+375 (__) ___-__-__'"
      @focus="paste(); focused = true"
      @blur="focused = false"
      @input="$emit('input', $event); lazyValue = $event"
      :value="value"
      :rules="[
          v => v && v.replace(/[\+ \()-]/g, '').length === 12 || 'Некорректный номер телефона',
          v => v && codes.some(code => v.replace(/[\+ \()-]/g, '').substring(3,5) === code) || 'Некорректный код'
      ]"
  >
  </default-input>
</template>

<script>
import {mask} from 'vue-the-mask'
import inputs from "@/mixins/inputs";
import DefaultInput from "@/components/UI/Inputs/DefaultInput";

export default {
  name: 'PhoneInput',
  components: {DefaultInput},
  data() {
    return {
      focused: false,
      lazyValue: ''
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
  watch: {
    value(val){
      this.lazyValue = val
    }
  },
  mixins: [inputs],
  directives: {mask}
}
</script>

<style scoped>

</style>