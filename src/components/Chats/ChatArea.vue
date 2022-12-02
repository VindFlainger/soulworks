<template>
  <v-card color="white" class="bordered pr-4 pl-4" outlined v-if="user">

    <v-row align="center" class="pa-1 mt-2" style="border-radius: 15px; border: 1px solid #616161">
      <ui-avatar :images="user.avatar?.images" :size="45" :img-size="64"></ui-avatar>
      <div class="ml-3 fs-18 font-weight-medium">
        {{ user.name }}
        {{ user.surname }}
      </div>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="black" size="30">mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="ml-2">
        <v-icon color="black" size="30">mdi-dots-vertical</v-icon>
      </v-btn>
    </v-row>

    <chat-area-list :history-messages="historyMessages"
                    :loading-messages="loadingMessages"
                    :viewed-offset="viewedOffset"
                    :user-id="user._id"
                    @load:previous="loadPreviousMessages"
                    @load:next="loadNextMessages"
                    :loading="loading"
                    class="mt-1"
    >
    </chat-area-list>
    <div class="chats-area__message-input pt-1 pb-1 pr-4 pl-4">
      <v-text-field
          outlined
          dense
          hide-details
          style="border-radius: 15px"
          color="black"
          v-model="message"
          @keydown.enter="sendMessage"
      >
        <template v-slot:append>
          <v-btn icon class="ma-0"
                 @click="sendMessage">
            <v-icon color="black">mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </div>

  </v-card>
</template>

<script>
import requests from "@/mixins/requests";
import ChatAreaList from "@/components/Chats/ChatAreaList";
import UiAvatar from "@/components/UI/UiAvatar";

export default {
  name: "ChatArea",
  components: {UiAvatar, ChatAreaList},
  data() {
    return {
      messages: [],
      offset: 0,
      totalOffset: 0,
      user: {},
      message: '',
      loading: true
    }
  },
  methods: {
    getUser() {
      this.getData(`http://localhost:3000/data/short?userId=${this.$route.params.id}`)
          .then(resp => {
            this.user = resp.data
          })
    },
    loadPreviousMessages() {
      this.loading = true
      this.$store.dispatch('loadPreviousHistoryMessages', this.$route.params.id)
          .then(() => this.loading = false)
    },
    loadNextMessages() {
      this.loading = true
      this.$store.dispatch('loadNextHistoryMessages', this.$route.params.id)
          .then(() => this.loading = false)
    },
    sendMessage() {
      const tmpMessage = {
        text: this.message,
        to: this.$route.params.id,
        tmpId: Date.now()
      }

      this.$store.dispatch('addLoadingMessage', tmpMessage)

      this.$socket.emit('message:add', this.$route.params.id, this.message, (message) => {
        this.$store.dispatch('delLoadingMessage', tmpMessage)
        this.$store.dispatch('addNewMessage', message)
      })
      this.message = ''
    },

  },
  mounted() {
    this.getUser()
    this.$store.dispatch('loadHistory', this.$route.params.id)
        .then(() => this.loading = false)
  },
  computed: {
    historyMessages() {
      return this.$store.state.chat.chats[this.$route.params.id]?.historyMessages || []
    },
    loadingMessages() {
      return this.$store.state.chat.chats[this.$route.params.id]?.loadingMessages || []
    },
    viewedOffset(){
      return this.$store.state.chat.chats[this.$route.params.id]?.viewedOffset || 0
    }
  },
  mixins: [requests]
}
</script>

<style scoped>
.chats-area__message-input {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
}


.chats-area__message-input >>> fieldset {
  border: 1px solid black !important;
}

.chats-area__message-input >>> .v-input__append-inner {
  margin-top: 2px !important;
}


</style>