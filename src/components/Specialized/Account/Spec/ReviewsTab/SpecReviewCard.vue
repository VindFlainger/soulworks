<template>
  <v-card  :key="reviewerId" outlined class="pa-4 mt-4 bordered">
    <v-row>
      <ui-avatar :images="reviewerAvatar?.images" :size="100"></ui-avatar>
      <v-col class="pa-0 ml-5">
        <div class="font-title fs-18 font-weight-bold">
          <router-link
              class="text-decoration-none black--text"
              :to="{name: 'profile', params: {id: reviewerId}}">
            {{ reviewerSurname }} {{ reviewerName }}
          </router-link>
        </div>
        <div class="fs-16">
          {{$moment(date).format('lll')}}
        </div>
        <v-rating class="ml-n2 mt-n1" readonly color="blue lighten-3"
                  background-color="grey"
                  :value="stars"
        ></v-rating>
      </v-col>
    </v-row>
    <div class="mt-2">
      <code class="font-title fs-16 font-weight-bold">{{ title }}</code>
      <div class="fs-16 font-weight-light">{{ text }}</div>
    </div>
  </v-card>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar";
export default {
  name: "ReviewCard",
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
      type: Number,
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