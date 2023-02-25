<template>
  <default-input
      :label="label"
      type="password"
      @input="$emit('input', $event)"
      :value="value"
      :rules="[
          v => v.length>= minPasswordLength || $tc('common.validation.password-min-length', minPasswordLength),
          v => v.length<= maxPasswordLength || $tc('common.validation.password-max-length', maxPasswordLength),
          v => /[!@#$%^&*()_+]/.test(v) || $t('common.validation.password-need-specsymbol')
      ]"
      id="current-password"
      name="current-password"
  >
  </default-input>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import I18n from "@/i18n";

export default {
  name: "PasswordInput",
  components: {DefaultInput},
  props: {
    value: String,
    label: {
      type: String,
      default: I18n.t('common.labels.password')
    },
    minPasswordLength: {
      type: Number,
      default: 8
    },
    maxPasswordLength: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style scoped>

</style>