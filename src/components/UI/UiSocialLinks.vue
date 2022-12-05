<template>
  <v-row align="center">
    <a v-for="link in links" :key="link.name"
       :href="linkPrefixes.find(lp => lp.network === link.name).link + link.link">
      <v-img
          :src="require(`@/assets/images/networks/${link.name}.png`)"
          :max-width="size" :height="size"
          class="d-inline-block ma-1">
      </v-img>
    </a>
  </v-row>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UiSocialLinks",
  props: {
    links: Array,
    size: {
      type: [Number, String],
      default: 25
    }
  },
  computed: {
    ...mapState('params', {
      linkPrefixes: state => state.linkPrefixes
    })
  }
}
</script>

<style scoped>

</style>