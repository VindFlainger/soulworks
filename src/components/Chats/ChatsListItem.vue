<template>
  <v-row align="center" style="width: 320px; cursor: pointer" class="white pa-1 bordered" v-on="$listeners">
    <v-badge overlap dot bottom offset-x="10" offset-y="12">
      <ui-avatar :images="avatar?.images"
                 :img-size="64"
                 :size="50"
      ></ui-avatar>
    </v-badge>
    <div class="ml-3">
      <div class="font-weight-medium">
        {{name}} {{surname}}
      </div>
      <div class="chat-list-item__message fs-12 grey--text text--darken-1 mt-n1">
        {{message}}
      </div>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-column justify-start align-self-start mt-2 align-end">
      <div class="fs-12">
        {{date | date}}
      </div>
      <div class="chat-list-item__message-indicator fs-10 font-weight-bold text-center"
           v-if="newCount">
        {{newCount<100?newCount:'99+'}}
      </div>
    </div>
  </v-row>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar";
import {date} from "@/filters/logic";
export default {
  name: "ChatsListItem",
  components: {UiAvatar},
  props: {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    newCount: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    avatar: {
      type: Object,
      required: false
    }
  },
  filters: {
    date
  }
}
</script>

<style scoped>
.chat-list-item__message{
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis
}

.chat-list-item__message-indicator{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #BBDEFB;
  line-height: 200%;
}
</style>