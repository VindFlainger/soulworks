<template>
  <ui-content-wrapper>
    <ui-view-headline
        :title="$t('about.section-name')"
        :subtitle="$t('about.description')"
    ></ui-view-headline>

    <v-img
        :src="require('@/assets/images/about/preview.gif')"
        max-height="350"
        class="rounded-xl"
    ></v-img>

    <div class="about-view">

      <h3 class="text-center mt-16">
        {{ $t('about.categories.advantages') }}
      </h3>
      <about-adv-list
          class="mt-8"
          :advantages="advantages"
      ></about-adv-list>

      <h3 class="text-center mt-16">
        {{ $t('about.categories.services') }}
      </h3>
      <about-services-list
          class="mt-8"
          :services="services"
      ></about-services-list>

      <h3 class="text-center mt-16">
        {{ $t('about.categories.metrics') }}
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
  components: {
    AboutStatistic,
    AboutServicesList,
    AboutAdvList,
    UiContentWrapper,
    UiViewHeadline
  },
  data() {
    return {
      advantagesImages: [
        require('@/assets/images/about/ui.png'),
        require('@/assets/images/about/security.png'),
        require('@/assets/images/about/calendar.png'),
        require('@/assets/images/about/integration.png')
      ],
      servicesImages: [
        require('@/assets/images/about/booking.jpg'),
        require('@/assets/images/about/material.png'),
        require('@/assets/images/about/chat.jpg'),
      ]
    }
  },
  computed: {
    advantages() {
      return this.$t('about.advantages').map((el, index) => ({image: this.advantagesImages[index], ...el}))
    },
    services() {
      return this.$t('about.services').map((el, index) => ({image: this.servicesImages[index], ...el}))
    }
  },
  metaInfo() {
    return {
      title: this.$t('about.section-name')
    }
  }
}
</script>

<style scoped>
.about-view h3 {
  font-size: 27px;
}
</style>