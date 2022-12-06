<template>
  <v-dialog :value="$store.state.loading" fullscreen>
    <div class="d-flex align-center justify-center" style="width: 100%; height: 100%; background: rgba(128,128,128,0.37)">

      <v-progress-circular size="115"  width="12" color="blue lighten-3" indeterminate style="position:absolute; z-index: 1" rotate="0"></v-progress-circular>
      <v-progress-circular size="85"  width="12" color="purple lighten-3" indeterminate style="position:absolute; z-index: 1" rotate="90"></v-progress-circular>
      <v-progress-circular size="50"  width="12" color="indigo lighten-3" indeterminate style="position:absolute; z-index: 1" rotate="180" ></v-progress-circular>


      <div style="position:relative; z-index: 2; font-size: 24px; text-shadow: 0 0  2px  black" class="font-weight-bold white--text"
      >Загрузка...</div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "MainLoader"
}
</script>

<style scoped>

</style>