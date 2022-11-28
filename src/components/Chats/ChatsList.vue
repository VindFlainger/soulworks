<template>
<div>
  <chats-list-item v-for="(chat, index) in chats"
                   :key="index"
                   :name="chat.user.name"
                   :surname="chat.user.surname"
                   :avatar="chat.user.avatar"
                   :date="chat.last.createdAt"
                   :message="chat.last.text"
                   :new-count="chat.new"
                   class="mb-2"
                   @click="$emit('pick', chat.user._id)"
  ></chats-list-item>
</div>
</template>

<script>
import ChatsListItem from "@/components/Chats/ChatsListItem";
export default {
  name: "ChatsList",
  components: {ChatsListItem},
  props: {
    chats: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>