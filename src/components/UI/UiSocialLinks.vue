<template>
  <v-row align="center">
    <!-- TODO: Implement prefixes to links-->
    <a v-for="link in links" :key="link.name" :href="link.link">
      <v-img
          :src="require(`@/assets/images/networks/${link.name}.png`)"
          :max-width="size" :height="size"
          class="d-inline-block ma-1">
      </v-img>
    </a>
  </v-row>
</template>

<script>
export default {
  name: "UiSocialLinks",
  props: {
    links: Array,
    size: {
      type: [Number, String],
      default: 25
    }
  }
}
</script>

<style scoped>

</style>