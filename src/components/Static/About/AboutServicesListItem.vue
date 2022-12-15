<template>
  <div class="pa-4">
    <v-card class="d-flex flex-column align-center pa-8 rounded-xl bordered" elevation="4" height="100%">
      <v-avatar  size="120">
        <v-img :src="img">

        </v-img>
      </v-avatar>
      <h4 class="text-center fs-16 mt-2">
        {{ title }}
      </h4>
      <p class="text-center fs-14 pl-4 pr-4 mt-4">
        {{ text }}
      </p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AboutServicesListItem",
  props: {
    title: String,
    text: String,
    img: String
  }
}
</script>

<style scoped>

</style>