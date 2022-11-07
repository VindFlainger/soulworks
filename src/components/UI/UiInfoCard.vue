<template>
  <v-row class="info-card ma-1" align="center">
    <v-img :src="img" max-width="70" height="70"></v-img>
    <div class="ml-2">
      <div class="font-weight-light fs-22" style="line-height: 100%">{{title}}</div>
      <div style="font-weight: 600">{{ text }}</div>
    </div>
  </v-row>
</template>

<script>
export default {
  name: "UiInfoCard",
  props: {
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.info-card {
  border: 1px solid black;
  border-radius: 15px;
  flex-grow: 0;
  box-shadow: inset 0 0 0 3px white, inset 0 0 0 4px black;
  padding: 12px;
}
</style>