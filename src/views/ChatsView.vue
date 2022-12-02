<template>
  <ui-content-wrapper>
    <v-row style="height: calc(100vh - 142px); overflow: hidden">
      <chats-list :chats="chats"
                  @pick="$router.push({name: 'chat', params: {id: $event}})"
      ></chats-list>

      <keep-alive>
        <router-view :key="$route.params.id" class="flex-grow-1 ml-3" style="height: inherit"></router-view>
      </keep-alive>


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