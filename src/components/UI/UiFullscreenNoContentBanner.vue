<template>
  <div class="mt-3 d-flex flex-column align-center">
    <slot name="prepend"></slot>

    <v-img
        :max-width="180"
        :src="getRandomIcon()"
        class="mt-2"
    ></v-img>

    <slot>
      <div class="d-flex flex-column align-center" style="max-width: 350px">
        <p class="text-h6 sans font-weight-bold text-center">
          {{title}}
        </p>
        <p class="text-body-2 text-center">
          {{caption}}
        </p>
      </div>
    </slot>

    <slot
        name="append"
        class="mt-4"
    ></slot>
  </div>
</template>

<script>


export default {
  name: "UiFullscreenNoContentBanner",
  props: {
    title: String,
    caption: String
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