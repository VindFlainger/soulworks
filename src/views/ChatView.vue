<template>
  <ui-content-wrapper>
    <v-row style="height: calc(100vh - 142px)" justify="center">
      <v-card style="height: inherit" color="white" class="bordered pr-4 pl-4 col-8" outlined v-if="user">

        <v-row v-once align="center" class="pa-1 mt-2" style="border-radius: 15px; border: 1px solid #616161">
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

        <chat-area-list v-if="isInit"
                        :final-offset="finalOffset"
                        :read-offset="readOffset"
                        :viewed-offset="viewedOffset"
                        :messages="messages"
                        :loading-messages="loadingMessages"
                        :user-id="user._id"
                        @load:previous="loadPreviousMessages"
                        @load:next="loadNextMessages"
                        @change:read-offset="changeReadOffset"
                        :loading="loading"
                        class="mt-1"
        ></chat-area-list>

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

      <chat-not-found v-if="isUnknownUser">

      </chat-not-found>

    </v-row>
  </ui-content-wrapper>
</template>

<script>
import requests from "@/mixins/requests";
import ChatAreaList from "@/components/Specialized/Chats/ChatList";
import UiAvatar from "@/components/UI/UiAvatar";
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import store from "../store/index";
import ChatNotFound from "@/components/Specialized/Chats/ChatNotFound";

export default {
  name: "ChatView",
  components: {ChatNotFound, UiContentWrapper, UiAvatar, ChatAreaList},
  data() {
    return {
      offset: 0,
      totalOffset: 0,
      user: null,
      message: '',
      loading: true,
      isUnknownUser: false
    }
  },
  methods: {
    getUser() {
      this.getData(`http://localhost:3000/data/short?userId=${this.$route.params.id}`)
          .then(resp => {
            this.user = resp.data
            this.$store.dispatch('initChat', this.$route.params.id)
              .then(()=>{
                this.loading = false
              })
          })
          .catch(() => {
            this.isUnknownUser = true
          })
    },
    loadPreviousMessages() {
      this.loading = true
      this.$store.dispatch('loadChatPreviousMessages', this.$route.params.id)
          .then(() => this.loading = false)
    },
    loadNextMessages() {
      this.loading = true
      this.$store.dispatch('loadChatNextMessages', this.$route.params.id)
          .then(() => this.loading = false)
    },
    changeReadOffset(offset) {
      store.dispatch('changeReadOffset', [this.$route.params.id, offset])
    },
    sendMessage() {
      this.loading = true
      store.dispatch('sendMessage', [this.$route.params.id, this.message])
          .then(() => this.loading = false)
      this.message = ''
    },

  },
  computed: {
    chat() {
      return this.$store.state.chat.chats[this.$route.params.id]
    },
    messages() {
      return this.chat?.messages || []
    },
    loadingMessages() {
      return this.chat?.loadingMessages || []
    },
    isInit() {
      return !!this.chat?.isInit
    },
    finalOffset() {
      return this.chat?.finalOffset || 0
    },
    readOffset() {
      return this.chat?.readOffset || 0
    },
    viewedOffset() {
      return this.chat?.viewedOffset || 0
    }
  },
  mixins: [requests],
  mounted() {
    this.getUser()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'chats') {
      this.$store.dispatch('getNewMessagesCount')
          .catch()
          .finally(() => next())
    } else {
      next()
    }
  },
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