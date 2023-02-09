<template>
  <v-speed-dial
      fixed
      v-model="fab"
      bottom
      left
      transition="slide-y"
  >
    <template v-slot:activator>
      <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-cog
        </v-icon>
      </v-btn>
    </template>
    <v-btn
        fab
        dark
        small
        color="black"
        outlined
        @click="isMute?unmute():mute(1000 * 60 * 60)"
    >
      <v-icon v-if="isMute">mdi-volume-off</v-icon>
      <v-icon v-else>mdi-volume-high</v-icon>
    </v-btn>
    <v-btn
        fab
        dark
        small
        color="black"
        outlined
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
        fab
        dark
        small
        color="black"
        outlined
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {REMOVE_MUTE, SET_MUTE} from "@/store/mutation-types";

export default {
  name: "SpeedDial",
  data() {
    return {
      fab: false
    }
  },
  computed: {
    ...mapGetters({
      isMute: 'isMute'
    })
  },
  methods: {
    ...mapMutations({
      mute: SET_MUTE,
      unmute: REMOVE_MUTE
    })
  }
}
</script>

<style scoped>

</style>