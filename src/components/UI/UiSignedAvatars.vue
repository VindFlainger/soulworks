<template>
  <v-row>
    <v-tooltip
        v-for="user in users.slice(0,max)"
        :key="user._id" bottom>
      <template v-slot:activator="{on, attrs}">
        <router-link :to="{name: 'profile', params: {id: user._id}}" >
          <ui-avatar :size="size" :images="user.avatar?.images" :img-size="64" class="ma-1" v-bind="attrs" v-on="on"></ui-avatar>
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
import UiAvatar from "@/components/UI/UiAvatar";
export default {
  name: "UiSignedAvatars",
  components: {UiAvatar},
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