<template>
 <div>
   <specialist-card v-for="specialist in specialists" :specialist="specialist" :key="specialist._id" class="mb-4">

   </specialist-card>
 </div>
</template>

<script>
import SpecialistCard from "@/components/SpecialistCard";
export default {
  name: "SpecialistList",
  components: {SpecialistCard},
  props: {
    specialists: Array
  }
}
</script>

<style scoped>

</style>