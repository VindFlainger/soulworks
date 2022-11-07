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

    <v-card class="pa-2 mt-4" style="border-radius: 15px; border-color: black" outlined>
      <v-chip>Всего отзывов: <span class="font-weight-bold ml-1">{{ reviewsInfo.length }}</span></v-chip>
      <v-chip class="ml-4">Средняя оценка: <span class="font-weight-bold ml-1">
        {{ reviewsInfo.reduce((acc, el) => acc + el.stars, 0) / reviewsInfo.length }}
      </span></v-chip>
    </v-card>

    <v-card v-for="review in reviewsInfo" :key="review._id" outlined class="pa-4 mt-4"
            style="border-radius: 15px; border-color: black">
      <v-row>
        <v-avatar size="100">
          <v-img :src="review.reviewer.avatar"></v-img>
        </v-avatar>
        <v-col class="pa-0 ml-5">
          <div class="font-title fs-18 font-weight-bold">
            <router-link
                class="text-decoration-none black--text"
                :to="{name: 'profile', params: {id: review.reviewer._id}}">
              {{ review.reviewer.surname }} {{ review.reviewer.name }}
            </router-link>
          </div>
          <div class="fs-16">
            {{ new Date(review.date).toLocaleDateString() }}
            {{ new Date(review.date).toLocaleTimeString().substring(0, 5) }}
          </div>
          <v-rating class="ml-n2 mt-n1" readonly color="blue lighten-3"
                    background-color="grey"
                    :value="review.stars"

          >
          </v-rating>
        </v-col>
      </v-row>
      <div class="mt-2">
        <code class="font-title fs-16 font-weight-bold">{{ review.title }}</code>
        <div class="fs-16 font-weight-light">{{ review.text }}</div>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";

export default {
  name: "SpecReviewsTab",
  components: {UiFullWidthBanner},
  data() {
    return {
      reviewsInfo: undefined
    }
  },
  methods: {
    getReviewsInfo() {
      this.getData('http://localhost:3000/spec/profile/reviews', {handleErrorResponse: true, handleError: true})
          .then(resp => {
            this.reviewsInfo = resp.data
          })
          .catch()
    }
  },
  mounted() {
    this.getReviewsInfo()
  }
}
</script>

<style scoped>

</style>