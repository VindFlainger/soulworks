<template>
  <v-btn
      class="button"
      outlined
      color="red"
      v-on="$listeners"
      v-bind="$attrs"
  >
    <slot>
      <div class="back mr-2"></div>
      <div class="text-title">{{ $t('common.buttons.back') }}</div>
    </slot>
  </v-btn>
</template>

<script>
export default {
  name: "UiBackButton"
}
</script>

<style scoped>
.button {
  border-radius: 15px;
  text-transform: none
}

.back {
  position: relative;
  width: 10px;
  height: 20px;
}

.back::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 14px;
  height: 1px;
  background: red;
  transform-origin: right center;
  transform: rotate(-45deg);
}

.back::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 14px;
  height: 1px;
  background: red;
  transform-origin: right center;
  transform: rotate(45deg);
}

.v-btn--disabled .next::before, .v-btn--disabled .next::after {
  background: rgba(0, 0, 0, 0.26);
}
</style>