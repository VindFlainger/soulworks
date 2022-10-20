<template>
  <v-text-field
      label="Повторите пароль"
      type="password"
      filled
      background-color="grey lighten-3"
      class="rounded-pill"
      style="max-width: 300px;"
      dense
      outlined
      color="grey darken-2"
      :rules="[
          v => !!v || 'Повторите пароль',
          v => v === value || 'Пароли не совпадают'


      ]"
      validate-on-blur
  >

  </v-text-field>
</template>

<script>
export default {
  name: "RepeatPasswordInput",
  props: {
    value: String
  }
}
</script>

<style scoped>

</style>