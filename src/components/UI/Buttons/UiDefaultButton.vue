<template>
  <v-btn class="button" outlined color="black" v-on="$listeners" v-bind="$attrs">
    <slot>Отмена</slot>
  </v-btn>
</template>

<script>
export default {
  name: "UiDefaultButton"
}
</script>

<style scoped>
.button{
  border-radius: 15px;
  text-transform: none
}
</style>