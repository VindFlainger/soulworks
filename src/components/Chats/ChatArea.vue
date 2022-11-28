<template>
  <v-card color="white" class="fill-height bordered pr-4 pl-4" outlined v-if="user">

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

    <chat-area-list :messages="messages"
                    :user-id="user._id"
                    class="pb-10 mt-1"
                    style="max-height: 560px; overflow-y: auto"
    >

    </chat-area-list>
    <div class="chats-area__message-input pt-1 pb-1 pr-4 pl-4">
      <v-text-field
          outlined
          dense
          hide-details
          style="border-radius: 15px"
          color="black"
      >
        <template v-slot:append>
          <v-btn icon class="ma-0">
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
      user: {}
    }
  },
  methods: {
    getMessages() {
      this.getData(`http://localhost:3000/any/chats/messages?userId=${this.$route.params.id}`)
          .then(resp => {
            this.messages.push(...resp.data)
          })
    },
    getUser() {
      this.getData(`http://localhost:3000/data/short?userId=${this.$route.params.id}`)
          .then(resp => {
            this.user = resp.data
          })
    }
  },
  mounted() {
    this.getUser()
    this.getMessages()
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