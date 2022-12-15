<template>
  <v-row justify="center">
    <about-services-list-item
        class="col-sm-6 col-md-4"
        title="Онлайн запись"
        :img="require('@/assets/images/about/booking.jpg')"
        text="Записывайтесь на консультации к специалистам когда Вам удобно всего в несколько нажатий"
    ></about-services-list-item>
    <about-services-list-item
        class="col-sm-6 col-md-4"
        title="Просмотр материалов"
        :img="require('@/assets/images/about/material.png')"
        text="Специалисты могут создавать и делиться своими уникальными материалами как со своими клиентами, так и с любыми другими пользователями"
    ></about-services-list-item>
    <about-services-list-item
        class="col-sm-6 col-md-4"
        title="Чаты"
        :img="require('@/assets/images/about/chat.jpg')"
        text="Общайтесь с другими пользователями используя чат платформы, он предлагает безопасность и удобство"
    ></about-services-list-item>
  </v-row>
</template>

<script>
import AboutServicesListItem from "@/components/Static/About/AboutServicesListItem";

export default {
  name: "AboutServicesList",
  components: {AboutServicesListItem}

}
</script>

<style scoped>

</style>