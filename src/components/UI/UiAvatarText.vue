<template>
  <div class="pt-3 pb-3">
    <v-row align="center" :class="[color]" class="avatar-text__container">
      <v-avatar size="80" class="mt-n1 ml-2 avatar-text__avatar" :color="color">
        <v-img :src="avatar"></v-img>
      </v-avatar>
      <div class="ml-4 fs-28 font-weight-bold font-title">{{text}}</div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UiAvatarText",
  props: {
    avatar: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'blue lighten-5'
    }
  }
}
</script>

<style scoped>
.avatar-text__container{
  height: 70px;
  border-radius: 15px
}

.avatar-text__avatar{
  box-shadow: 0 0 0 3px white
}
</style>