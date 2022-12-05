<template>
  <ui-content-wrapper>
    <div class="chats-wrapper">
      <v-row>
        <div class="col-3">
          <!--TODO: add bookmarks-->
          Bookmarks
        </div>
        <chats-list :chats="chats"
                    class="col-6"
                    @pick="$router.push({name: 'chat', params: {id: $event}})"
        ></chats-list>
      </v-row>
    </div>
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
.chats-wrapper {
  height: calc(100vh - 142px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>