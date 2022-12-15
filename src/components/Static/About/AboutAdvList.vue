<template>
  <v-row justify="center">
    <about-adv-list-item
        class="col-md-3 col-sm-4"
        title="Удобство использования"
        :img="require('@/assets/images/about/ui.png')"
        text="Простой интерфейс позволяет быстро и эффективно находить нужный Вам функционал"
    >
    </about-adv-list-item>
    <about-adv-list-item
        class="col-md-3 col-sm-4"
        title="Безопасность"
        :img="require('@/assets/images/about/security.png')"
        text="Ваши персональные данные, переписки и пароли надежно защищены от утечек"
    >
    </about-adv-list-item>
    <about-adv-list-item
        class="col-md-3 col-sm-4"
        title="Доступность"
        :img="require('@/assets/images/about/calendar.png')"
        text="Планируйте свое расписание с помощью системы бронирования консультаций"
    >
    </about-adv-list-item>
    <about-adv-list-item
        class="col-md-3 col-sm-4"
        title="Интеграция"
        :img="require('@/assets/images/about/integration.png')"
        text="Взаимодействие с социальными сетями и мессенджерами"
    >
    </about-adv-list-item>
  </v-row>
</template>

<script>
import AboutAdvListItem from "@/components/Static/About/AboutAdvListItem";
export default {
  name: "AboutAdvList",
  components: {AboutAdvListItem}
}
</script>

<style scoped>

</style>