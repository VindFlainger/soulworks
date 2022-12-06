<!--TODO: add pagination and rewrite server-side avg stars aggregation-->
<template>
  <v-card class="pa-4" elevation="0">

    <ui-full-width-banner :img="require('@/assets/images/account/reviews.png')">
      <div class="fill-height d-flex align-center justify-center">
        <div class="font-title pa-5 rounded"
             style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px">
          Отзывы на Вас
        </div>
      </div>
    </ui-full-width-banner>

    <v-card v-if="reviews" class="pa-2 mt-4 bordered" outlined >
      <v-chip>Всего отзывов:
        <span class="font-weight-bold ml-1">{{ reviews.length }}</span>
      </v-chip>
      <v-chip class="ml-4">Средняя оценка:
        <span class="font-weight-bold ml-1">{{ avgStars }}</span>
      </v-chip>
    </v-card>

    <div v-if="reviews && reviews.length">
      <review-card v-for="review in reviews"
                   :key="review._id"
                   :reviewer-id="review._id"
                   :date="review.date"
                   :title="review.title"
                   :text="review.text"
                   :reviewer-name="review.reviewer.name"
                   :reviewer-surname="review.reviewer.surname"
                   :reviewer-avatar="review.reviewer.avatar"
                   :stars="review.stars"
      ></review-card>
    </div>
    <ui-fullscreen-no-content-banner v-else :to="{path: '*'}">
          <span class="text-center fs-20 font-weight-medium">
            На вас еще никто не оставил отзыв!
          </span>
          <span class="text-center fs-14" style="max-width: 500px">
            Просите своих клиентов оставлять отзывы о консультациях. Отзывы помогают найти вас другим клиентам.
          </span>
    </ui-fullscreen-no-content-banner>

  </v-card>
</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import requests from "@/mixins/requests";
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import ReviewCard from "@/components/Specialized/Account/Spec/ReviewsTab/SpecReviewCard";

export default {
  name: "SpecReviewsTab",
  components: {ReviewCard, UiFullscreenNoContentBanner, UiFullWidthBanner},
  data() {
    return {
      reviews: undefined
    }
  },
  methods: {
    getReviewsInfo() {
      this.getData('http://localhost:3000/spec/account/reviews')
          .then(resp => {
            this.reviews = resp.data
          })
          .catch()
    }
  },
  mounted() {
    this.getReviewsInfo()
  },
  computed: {
    avgStars() {
      return (this.reviews.reduce((acc, el) => acc + el.stars, 0) / this.reviews.length) || 0
    }
  },
  mixins: [requests]
}
</script>

<style scoped>

</style>