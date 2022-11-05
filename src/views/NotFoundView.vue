<template>
  <ui-content-wrapper>
    <div class="d-flex align-center justify-center fill-height flex-column not-found__wrapper"

    >
      <div class="fs-32 font-title font-weight-bold">
        Страница не найдена
      </div>
      <div style="max-width: 500px; text-align: center" class="mt-5">
        К сожалению, нам не удалось найти страницу по вашему запросу. Попробуйте перейти на предыдущую страницу или
        обратитесь в
        <router-link :to="{name: 'support'}" class="text-decoration-none" style="font-weight: 600">техническую
          поддержку
        </router-link>
        для получения дополнительной информации.
      </div>
      <v-btn class="mt-5 mb-16" color="blue lighten-3" outlined @click="$router.go(-1)">
        Вернуться
      </v-btn>
    </div>
  </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";

export default {
  name: "NotFoundView",
  components: {UiContentWrapper}
}
</script>

<style scoped>
.not-found__wrapper {
  background: url("@/assets/images/not-found_background.png") bottom/  cover;
  border-radius: 15px;
  box-shadow: 0 0 16px 8px rgb(236, 239, 241) inset,
  0 0 64px 8px rgb(236, 239, 241);
}
</style>