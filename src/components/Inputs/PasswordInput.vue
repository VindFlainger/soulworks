<template>
  <v-text-field
      label="Пароль"
      type="password"
      filled
      background-color="grey lighten-3"
      class="rounded-pill"
      style="max-width: 300px;"
      dense
      outlined
      color="grey darken-2"
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
    value: String
  }

}
</script>

<style scoped>

</style>