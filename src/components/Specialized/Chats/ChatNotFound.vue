<template>
  <div class="d-flex flex-column align-center justify-center">
    <ui-fullscreen-no-content-banner>
      <template v-slot:append>
        <div
            class="fs-18 text-center mt-4"
            style="width: 50%"
        >
          К сожалению выбранный вами пользователь не был найден, вы не можете начать чат с данным пользователем.
          Возможно вы совершили ошибку при копировании ссылки.
        </div>
        <ui-confirm-button
            class="mt-2"
            x-large
            @click="$router.push({name: 'chats'})"
        >
          Чаты
        </ui-confirm-button>
      </template>
    </ui-fullscreen-no-content-banner>
  </div>
</template>

<script>
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";

export default {
  name: "ChatNotFound",
  components: {
    UiConfirmButton,
    UiFullscreenNoContentBanner
  }
}
</script>

<style scoped>

</style>