<template>
  <v-row justify="center">
    <about-adv-list-item
        v-for="advantage in advantages"
        :key="advantage.title"
        class="col-md-3 col-sm-4"
        :title="advantage.title"
        :img="advantage.image"
        :text="advantage.text"
    ></about-adv-list-item>
  </v-row>
</template>

<script>
import AboutAdvListItem from "@/components/Static/About/AboutAdvListItem";

export default {
  name: "AboutAdvList",
  components: {AboutAdvListItem},
  props: {
    advantages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>