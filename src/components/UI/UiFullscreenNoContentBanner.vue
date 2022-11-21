<template>
  <div class="mt-3 d-flex flex-column align-center">
    <slot></slot>
    <v-img :max-width="180" :src="getRandomIcon()" class="mt-2"></v-img>
    <ui-link-button v-if="to" :to="to" class="mt-2">
      <slot name="link">
        Узнать больше
      </slot>
    </ui-link-button>
  </div>
</template>

<script>
import UiLinkButton from "@/components/UI/Buttons/UiLinkButton";

export default {
  name: "UiFullscreenNoContentBanner",
  components: {UiLinkButton},
  props: {
    to: [Object, String]
  },
  methods: {
    getRandomIcon() {
      return require(`@/assets/images/content/no-content-${Math.floor(Math.random() * 3)}.png`)
    }
  }
}
</script>

<style scoped>

</style>