<template>
  <v-btn
      class="button"
      elevation="0"
      color="blue lighten-4"
      v-on="$listeners"
      v-bind="$attrs"
  >
    <div class="text-title">
      <slot>
        {{ $t('common.buttons.confirm') }}
      </slot>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "UiConfirmButton"
}
</script>

<style scoped>
.button {
  border-radius: 15px;
  text-transform: none
}

.button::before {
  display: none;
}
</style>