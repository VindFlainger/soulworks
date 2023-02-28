<template>
  <v-row justify="center">
    <about-services-list-item
        v-for="service in services"
        :key="service.title"
        class="col-sm-6 col-md-4"
        :title="service.title"
        :text="service.text"
        :img="service.image"
    ></about-services-list-item>
  </v-row>
</template>

<script>
import AboutServicesListItem from "@/components/Static/About/AboutServicesListItem";

export default {
  name: "AboutServicesList",
  components: {AboutServicesListItem},
  props: {
    services: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>