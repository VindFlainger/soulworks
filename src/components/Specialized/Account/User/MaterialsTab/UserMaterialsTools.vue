<template>
  <div>
    <v-row align="center" class="user-materials-tools__content pa-2">
      <div>
        <span class="fs-18 font-weight-bold">{{ readers }}</span>
        <v-icon style="position:relative; top: -4px;" color="white" >mdi-book-account-outline</v-icon>
      </div>
      <div class="ml-4">
        <span class="fs-18 font-weight-bold">{{ likes }}</span>
        <v-btn
            icon
            small
            @click="!likeLoading?$emit('like-change'):undefined"
        >
          <v-icon :color="liked?'red':'white'" style="position:relative; top: -4px;">mdi-heart</v-icon>
        </v-btn>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UserMaterialsTools",
  props: {
    readers: {
      type: Number,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    liked: {
      type: Boolean,
      required: true
    },
    likeLoading: {
      type: Boolean,
      required: true
    },
  }
}
</script>

<style scoped>
.user-materials-tools__content {
  height: 40px;
  background: rgba(0, 0, 0, 0.74);
  border-radius: 15px;
  color: white;
}

</style>