<template>
  <default-input
      :label="label"
      type="password"
      @input="$emit('input', $event)"
      :value="value"
      :rules="[
          v => v.length>= 8 || 'Пароль должен содержать не менее 8 символов',
          v => v.length<= 40 || 'Максимальная длина пароля 40 символов',
          v => /[!@#$%^&*()_+]/.test(v) || 'Пароль должен содержать хотябы один специальный символ'
      ]"
  >
  </default-input>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
export default {
  name: "PasswordInput",
  components: {DefaultInput},
  props: {
    value: String,
    label: {
      type: String,
      default: 'Пароль'
    },
  }
}
</script>

<style scoped>

</style>