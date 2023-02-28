<template>
  <div class="pa-2">
    <v-card
        class="d-flex flex-column align-center pa-8 rounded-xl bordered"
        elevation="4"
        height="100%"
    >
      <v-img
          :src="img"
          max-width="80"
          max-height="80"
          class="rounded-0"
      ></v-img>

      <h4 class="text-center fs-16 mt-2">
        {{ title }}
      </h4>

      <p class="text-center fs-14 pl-4 pr-4 mt-2">
        {{ text }}
      </p>

    </v-card>
  </div>
</template>

<script>
export default {
  name: "AboutAdvListItem",
  props: {
    title: String,
    text: String,
    img: String
  }
}
</script>

<style scoped>

</style>