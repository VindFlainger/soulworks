<template>
  <div class="d-flex flex-column align-center mt-10">
    <ui-fullscreen-no-content-banner :to="{name: 'specialists'}">
      <template v-slot:append>
        <div
            class="fs-20 font-weight-medium text-center"
            style="max-width: 350px">
          К сожалению, по Вашему запросу специалисты не были найдены
        </div>
        <ui-confirm-button @click="$emit('back')">
          Вернуться
        </ui-confirm-button>
      </template>
    </ui-fullscreen-no-content-banner>
  </div>
</template>

<script>
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";

export default {
  name: "SpecialistsNotFound",
  components: {UiConfirmButton, UiFullscreenNoContentBanner}
}
</script>

<style scoped>

</style>