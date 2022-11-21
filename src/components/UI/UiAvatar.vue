<template>
  <v-avatar :size="size" v-on="$listeners" v-bind="$attrs">
    <v-img :src="images?.find(el => el.width === imgSize)?.url || require('@/assets/images/nophoto.png')">

    </v-img>
  </v-avatar>
</template>

<script>
export default {
  name: "UiAvatar",
  props: {
    images: {
      type: Array,
      required: false
    },
    size: {
      type: [Number, String],
      default: 250
    },
    imgSize: {
      type: [Number, String],
      default: 256
    }
  }
}
</script>

<style scoped>

</style>