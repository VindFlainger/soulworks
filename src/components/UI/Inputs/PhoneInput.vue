<template>
  <default-input
      v-bind="$attrs"
      v-on="$listeners"
      v-mask="'+375 (##) ###-##-##'"
      type="tel"
      :label="focused?label:lazyValue?.length?label:'+375 (__) ___-__-__'"
      :required="required"
      @focus="paste(); focused = true"
      @blur="focused = false"
      @input="$emit('input', $event); lazyValue = $event"
      :value="value"
      :rules="[
          v => (!required && !lazyValue) || (v && v.replace(/[\+ \()-]/g, '').length === 12) || 'Некорректный номер телефона',
          v => (!required && !lazyValue) || (v && codes.some(code => v.replace(/[\+ \()-]/g, '').substring(3,5) === code)) || 'Некорректный код'
      ]"
      ref="phoneInput"
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
      lazyValue: '',
    }
  },
  props: {
    codes: {
      type: Array,
      default: () => ['25','33', '29', '44']
    },
    label: {
      type: String,
      default: 'Телефон'
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
      setTimeout(()=>{
        this.lazyValue = val
      },0)
    }
  },
  mixins: [inputs],
  directives: {mask}
}
</script>

<style scoped>

</style>