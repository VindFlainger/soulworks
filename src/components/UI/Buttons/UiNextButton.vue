<template>
  <v-btn
      class="button"
      outlined
      color="green"
      v-on="$listeners"
      v-bind="$attrs"
  >
    <slot>
      <div class="text-title"> {{$t('common.buttons.next')}}</div>
      <div class="next ml-2"></div>
    </slot>
  </v-btn>
</template>

<script>
export default {
  name: "UiNextButton"
}
</script>

<style scoped>
.button{
  border-radius: 15px;
  text-transform: none
}

.next{
  position: relative;
  width: 10px;
  height: 20px;
}

.next::after{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 1px;
  background: green;
  transform-origin: left center;
  transform: rotate(45deg);
}

.next::before{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 14px;
  height: 1px;
  background: green;
  transform-origin: left center;
  transform: rotate(-45deg);
}

.v-btn--disabled .next::before, .v-btn--disabled .next::after{
  background: rgba(0, 0, 0, 0.26);
}
</style>