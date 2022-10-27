<template>
  <div style="width: 100%; overflow: hidden; position:relative;" class="rounded overflow-hidden" :style="{height}">
    <div style="position:absolute; z-index: 1; height: 100%; width: 100%">
        <slot></slot>
    </div>
    <v-img :src="img" max-width="100%" height="100%" position="center center"></v-img>
  </div>
</template>

<script>
export default {
  name: "UiFullWidthBanner",
  props: {
    img: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '130px'
    }
  }
}
</script>

<style scoped>

</style>