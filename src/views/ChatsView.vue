<template>
    <ui-content-wrapper >
      <v-row class="fill-height">
        <chats-list :chats="chats"
                    @pick="$router.push({name: 'chat', params: {id: $event}})"

        ></chats-list>
        <v-col class="pa-0 ml-2">
            <keep-alive>
              <router-view :key="$route.params.id"></router-view>
            </keep-alive>
        </v-col>

      </v-row>
    </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import ChatsList from "@/components/Chats/ChatsList";
import requests from "@/mixins/requests";

export default {
  name: "ChatsView",
  data() {
    return {
      chats: [],
      activeUser: ''
    }
  },
  components: {ChatsList, UiContentWrapper},
  methods: {
    getChats() {
      this.getData('http://localhost:3000/any/chats')
          .then(resp => this.chats = resp.data)
          .catch()
    }
  },
  mixins: [requests],
  mounted() {
    this.getChats()
    this.$root.$emit('close-footer')
  },
  destroyed() {
    this.$root.$emit('show-footer')
  }

}
</script>

<style scoped>

</style>