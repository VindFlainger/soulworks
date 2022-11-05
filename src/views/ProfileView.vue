<template>
  <ui-content-wrapper>
    <div>
      Страница не найдена
    </div>
  </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";

export default {
  name: "UserProfileView",
  components: {UiContentWrapper},
  data(){
      return {
        profileInfo: undefined
      }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>