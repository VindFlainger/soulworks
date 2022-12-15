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
import ChatsList from "@/components/Specialized/Chats/ChatsList";
import requests from "@/mixins/requests";
import loader from "@/mixins/loader";


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
      this.addGlobalLoadingProcess()
      this.getData('http://localhost:3000/any/chats')
          .then(resp => this.chats = resp.data)
          .catch()
          .finally(this.removeGlobalLoadingProcess)
    }
  },
  mixins: [requests, loader],
  mounted() {
    this.getChats()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'chat') {
      this.$store.dispatch('getNewMessagesCount')
          .catch()
          .finally(() => next(true))
    } else {
      next(true)
    }
  },
  metaInfo() {
    return {
      title: !this.isGlobalLoading ? 'Чаты' : null
    }
  }
}
</script>

<style scoped>
.chats-wrapper {
  height: calc(100vh - 110px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>