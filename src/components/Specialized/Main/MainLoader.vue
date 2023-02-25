<template>
  <v-dialog fullscreen v-bind="$attrs">
    <div class="loader d-flex align-center justify-center">

      <v-progress-circular size="115"  width="12" color="blue lighten-3" indeterminate style="position:absolute; z-index: 1" rotate="0"></v-progress-circular>
      <v-progress-circular size="85"  width="12" color="purple lighten-3" indeterminate style="position:absolute; z-index: 1" rotate="90"></v-progress-circular>
      <v-progress-circular size="50"  width="12" color="indigo lighten-3" indeterminate style="position:absolute; z-index: 1" rotate="180" ></v-progress-circular>

      <div class="loader__hint font-weight-bold white--text">
        {{ $t('common.ui.loading') }}
      </div>

    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "GlobalLoader",
}
</script>

<style scoped>
.loader{
  width: 100%;
  height: 100%;
  background: rgba(128,128,128,0.37)
}

.loader__hint{
  position:relative;
  z-index: 2;
  font-size: 24px;
  text-shadow: 0 0  2px  black
}
</style>