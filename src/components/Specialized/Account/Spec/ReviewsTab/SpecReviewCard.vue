<template>
  <v-card
      class="pa-4 bordered"
      outlined
  >
    <v-row>

      <ui-avatar
          :images="reviewerAvatar?.images"
          :size="viewportHook({base: 70, sm: 90})"
      ></ui-avatar>

      <v-col class="pa-0 ml-2 ml-md-5 ">

        <h4 class="font-title comfortaa text-subtitle-1 text-sm-h6 font-weight-bold">
          <router-link
              class="text-decoration-none black--text"
              :to="{name: 'profile', params: {id: reviewerId}}">
            {{ reviewerSurname }} {{ reviewerName }}
          </router-link>
        </h4>

        <div class="text-body-1">
          {{ $dj(date).format('DD MMMM, YYYY') }}
        </div>

        <v-rating
            class="ml-n1 ml-sm-n2"
            color="blue lighten-3"
            background-color="grey"
            :value="stars"
            readonly
            :dense="viewportHook({base: true, sm: false})"
        ></v-rating>

      </v-col>
    </v-row>
    <div class="mt-2">
      <code class="font-title text-subtitle-1 font-weight-bold">{{ title }}</code>
      <p class="text-body-1 font-weight-light">{{ text }}</p>
    </div>
  </v-card>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar";
import dayjs from "dayjs";

export default {
  name: "ReviewCard",
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {UiAvatar},
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    reviewerId: {
      type: String,
      required: true
    },
    reviewerName: {
      type: String,
      required: true
    },
    reviewerSurname: {
      type: String,
      required: true
    },
    reviewerAvatar: {
      type: Object
    },
    stars: {
      type: Number
    },
  }
}
</script>

<style scoped>

</style>