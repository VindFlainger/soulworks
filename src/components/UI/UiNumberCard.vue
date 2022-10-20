<template>
    <v-card max-width="450" elevation="0" class="ma-5" color="transparent">
      <v-card-title class="fs-28 font-title font-weight-bold text-left" style="z-index: 5; position:relative;">
        {{title}}
      </v-card-title>
      <v-card-text class="fs-18 black--text text-left" style="z-index: 5; position:relative;">
        {{text}}
      </v-card-text>

      <div class="number"  >
        {{number}}
      </div>
    </v-card>


</template>

<script>
export default {
  name: "UiNumberCard",
  props: {
      title: String,
      text: String,
      number: [Number, String],
  }
}
</script>

<style scoped>
.number{
  position: absolute;
  font-family: Comfortaa, sans-serif;
  top: 0;
  left: 0;
  font-size: 200px;
  color: rgba(187, 222, 251, 0.59);
  line-height: 80%;
  z-index: 1;
}
</style>