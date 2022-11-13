<template>
  <v-row>
    <v-tooltip
        v-for="user in users.slice(0,max)"
        :key="user._id" bottom>
      <template v-slot:activator="{on, attrs}">
        <router-link :to="{name: 'profile', params: {id: user._id}}">
          <v-avatar v-on="on" v-bind="attrs" class="ma-1" :size="size" color="grey lighten-3">
            <v-img :src="user.avatar || require('@/assets/images/nophoto.png')">

            </v-img>
          </v-avatar>
        </router-link>
      </template>
      {{ user.surname }} {{ user.name }}
    </v-tooltip>
    <v-avatar :size="size" class="ma-1 fs-12" color="grey lighten-3" v-if="users.length > max">
      +{{ users.length - max }}
    </v-avatar>

  </v-row>
</template>

<script>
export default {
  name: "UiSignedAvatars",
  props: {
    users: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: 40
    },
    max: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style scoped>

</style>