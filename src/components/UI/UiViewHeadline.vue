<template>
  <div class="about-view">
    <h2>{{ title }}</h2>
    <p class="fs-18 grey--text text--darken-2" style="max-width: 800px">
      {{ subtitle }}
    </p>
  </div>
</template>

<script>
export default {
  name: "UiViewHeadline",
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>