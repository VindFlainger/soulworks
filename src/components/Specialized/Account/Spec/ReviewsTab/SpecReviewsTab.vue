<template>

  <account-base-layout
      :preview-title="$t('account.spec.reviews.section-name')"
      :preview-image="require('@/assets/images/account/reviews.png')"
  >


    <account-base-chips
        :chips="[
              {name: $t('account.spec.reviews.count'), value: totalCount},
              {name: $t('account.spec.reviews.average-rating'), value: avgStars},
          ]"
    ></account-base-chips>

    <div v-if="state.matches('resolved')">
      <div v-if="reviews.length">
        <review-card
            class="mt-4"
            v-for="review in reviews"
            :key="review._id"
            :reviewer-id="review._id"
            :date="review.createdAt"
            :title="review.title"
            :text="review.text"
            :reviewer-name="review.reviewer.name"
            :reviewer-surname="review.reviewer.surname"
            :reviewer-avatar="review.reviewer.avatar"
            :stars="review.stars"
        ></review-card>
      </div>
      <ui-fullscreen-no-content-banner
          v-else
          :title="$t('account.spec.reviews.no-reviews')"
          :caption="$t('account.spec.reviews.no-reviews-explain')"
      ></ui-fullscreen-no-content-banner>
    </div>

    <ui-requesting-visualizer
        :loading="['fetching','rejected'].some(state.matches)"
        :problem="state.matches('unavailable')"
        @retry="getReviewsInfo(page)"
    ></ui-requesting-visualizer>

    <ui-pagination
        class="mt-2"
        v-show="['resolved'].some(state.matches)"
        :value="page"
        :length="totalPages"
        @input="loadReviewsInfo"
    ></ui-pagination>

  </account-base-layout>

</template>

<script>
import requests from "@/mixins/requests";
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import ReviewCard from "@/components/Specialized/Account/Spec/ReviewsTab/SpecReviewCard";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";
import UiPagination from "@/components/UI/UiPagination.vue";
import fetchingMachine from "@/mixins/fetchingMachine";
import matches from "validator/es/lib/matches";
import UiRequestingVisualizer from "@/components/UI/UiRequestingVisualizer.vue";
import AccountBaseChips from "@/components/Specialized/Account/AccountBaseChips.vue";

export default {
  name: "SpecReviewsTab",
  components: {
    AccountBaseChips,
    UiRequestingVisualizer,
    UiPagination,
    AccountBaseLayout,
    ReviewCard,
    UiFullscreenNoContentBanner,
  },
  mixins: [requests, fetchingMachine],
  data() {
    return {
      reviews: undefined,
      page: 0,
      totalCount: 0,
      limit: 5,
      avgStars: 0
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.limit)
    }
  },
  watch: {
    'state.value': function (val, oldVal) {
      if (val === 'waiting' && oldVal === 'rejected') {
        this.getReviewsInfo(this.page)
      }
    }
  },
  mounted() {
    this.loadReviewsInfo(Number.parseInt(this.$route.query.page))
  },
  methods: {
    matches,
    loadReviewsInfo(page) {
      page = page ? page : 1
      this.page = page
      if (page !== 1) {
        this.$router.push({name: this.$route.name, query: {page}})
      }
      if (this.$route.query.page && page === 1) {
        this.$router.push({name: this.$route.name})
      }
      this.getReviewsInfo(page)
    },
    getReviewsInfo(page) {
      this.send('CONTENT_FETCH')
      this.getDataAuthed(`spec/account/getReviews?offset=${(page ? page - 1 : page) * this.limit}&limit=${this.limit}`)
          .then(resp => {
            this.reviews = resp.data.reviews
            this.totalCount = resp.data.totalCount
            this.avgStars = resp.data.avg
            this.send('CONTENT_RESOLVE')
          })
          .catch(() => this.send('CONTENT_REJECT'))
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.page !== Number.parseInt(to.query.page)) {
      this.page = Number.parseInt(to.query.page) || 1
      this.getReviewsInfo(this.page)
    }
    next()
  },
  metaInfo() {
    return {
      title: this.$t('account.spec.reviews.section-name')
    }
  }
}
</script>

<style scoped>

</style>