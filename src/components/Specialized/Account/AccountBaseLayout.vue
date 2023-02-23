<template>
  <v-card class="pa-4" elevation="0">
    <ui-full-width-banner v-if="previewImage && previewTitle" :img="previewImage">
      <div class="fill-height d-flex align-center justify-center">
        <div
            class="font-title pa-5 rounded text-title"
            style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px"
        >
          {{ previewTitle }}
        </div>
      </div>
    </ui-full-width-banner>

    <div class="mt-3">
      <slot>

      </slot>
    </div>

  </v-card>
</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner.vue";

export default {
  name: "AccountBaseLayout",
  components: {UiFullWidthBanner},
  props: {
    previewImage: {
      type: String,
      required: false
    },
    previewTitle: {
      type: String,
      required: false
    },
  }
}
</script>

<style scoped>

</style>