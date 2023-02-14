<template>
  <v-row class="flex-wrap">
    <router-link
        class="text-subtitle-1 font-weight-bold text-md-h6 text-decoration-none black--text pa-2 ma-1 d-block"
        v-for="tab in tabs"
        :key="tab.title"
        :to="tab.link"
        active-class="white"
        style="border-radius: 15px"
    >
      <p class="ma-0 font-title text-title d-inline-block">{{tab.title}}</p>
    </router-link>
  </v-row>
</template>

<script>
export default {
  name: "AccountMenuMobile",
  props: {
    tabs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>