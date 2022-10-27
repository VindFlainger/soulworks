<template>
  <v-text-field
      :label="label"
      type="password"
      filled
      background-color="white"
      class="rounded-pill"
      style="outline-color: black;"
      :style="{'max-width': maxWidth}"
      dense
      outlined
      color="black"
      @input="$emit('input', $event)"
      :value="value"
      :rules="[
          v => !!v || 'Введите пароль',
          v => v.length>= 8 || 'Пароль должен содержать не менее 8 символов',
          v => v.length<= 40 || 'Максимальная длина пароля 40 символов',
          v => /[!@#$%^&*()_+]/.test(v) || 'Пароль должен содержать хотябы один специальный символ'
      ]"
      validate-on-blur
  >

  </v-text-field>
</template>

<script>
export default {
  name: "PasswordInput",
  props: {
    value: String,
    label: {
      type: String,
      default: 'Пароль'
    },
    maxWidth: {
      type: String,
      default: '300px'
    }
  }

}
</script>

<style scoped>

</style>