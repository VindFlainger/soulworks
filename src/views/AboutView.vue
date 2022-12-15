<template>
  <ui-content-wrapper>
    <ui-view-headline
        title="О платформе"
        subtitle="В данном разделе собрана наиболее актуальная информация об основании, целях, функционале и версиях платформы."
    ></ui-view-headline>

    <v-img
        :src="require('@/assets/images/about/preview.gif')"
        max-height="350"
        class="rounded-xl"
    ></v-img>

    <div class="about-view">

      <h3 class="text-center mt-16">
        Преимущества
      </h3>
      <about-adv-list class="mt-8"></about-adv-list>

      <h3 class="text-center mt-16">
        Функциональность
      </h3>
      <about-services-list class="mt-8"></about-services-list>

      <h3 class="text-center mt-16">
        Показатели
      </h3>
      <about-statistic class="mt-8"></about-statistic>

    </div>
  </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import UiViewHeadline from "@/components/UI/UiViewHeadline";
import AboutAdvList from "@/components/Static/About/AboutAdvList";
import AboutServicesList from "@/components/Static/About/AboutServicesList";
import AboutStatistic from "@/components/Static/About/AboutStatistic";

export default {
  name: "AboutView",
  components: {AboutStatistic, AboutServicesList, AboutAdvList, UiContentWrapper, UiViewHeadline},

  data() {
    return {}
  },
  metaInfo: {
    title: 'О нас'
  }
}
</script>

<style scoped>
.about-view h3 {
  font-size: 27px;
}
</style>