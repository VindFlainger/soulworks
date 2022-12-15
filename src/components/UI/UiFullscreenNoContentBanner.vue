<template>
  <div class="mt-3 d-flex flex-column align-center">
    <slot name="prepend"></slot>

    <v-img
        :max-width="180"
        :src="getRandomIcon()"
        class="mt-2"
    ></v-img>

    <slot name="append"
          class="mt-4"
    ></slot>
  </div>
</template>

<script>


export default {
  name: "UiFullscreenNoContentBanner",
  methods: {
    getRandomIcon() {
      return require(`@/assets/images/content/no-content-${Math.floor(Math.random() * 3)}.png`)
    }
  }
}
</script>

<style scoped>

</style>