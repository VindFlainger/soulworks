<template>
  <v-text-field
      label="Повторите пароль"
      type="password"
      filled
      background-color="white"
      class="rounded-pill"
      :style="{maxWidth}"
      dense
      outlined
      color="black"
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
    value: String,
    maxWidth: {
      type: String,
      default: '300px'
    }
  }
}
</script>

<style scoped>

</style>