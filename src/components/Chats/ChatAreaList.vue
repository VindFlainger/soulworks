<template>
  <div>
    <div v-for="(message, index) in messages" :key="message._id" class="fs-14">
      <div v-if="!$moment(message.createdAt).isSame(messages[index - 1]?.createdAt, 'day')"
           class="text-center pa-2"
      >
        {{$moment().isSame(message.createdAt, 'day')?'сегодня':$moment(message.createdAt).format('D MMMM Y')}}
      </div>
      <v-row v-if="message.to === userId" class="message mb-2">
        <v-spacer></v-spacer>
        <div class="pa-2 pr-15 blue lighten-4 rounded d-inline-block" style="max-width: 70%; position:relative;">
          {{message.text}}
          <div class="message-hint">
            {{$moment(message.createdAt).format('HH:mm')}}
            <v-icon size="19" :class="{'green--text text--accent-4': message.read}" >mdi-check-all</v-icon>
          </div>
        </div>
      </v-row>
      <v-row v-else class="mb-2">
        <div class="pa-2 pr-11 grey lighten-4 rounded" style="max-width: 70%; position:relative;">
          {{message.text}}
          <div class="message-hint">
            {{$moment(message.createdAt).format('HH:mm')}}
          </div>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatAreaList",
  props: {
    messages: Array,
    userId: Object
  },
}
</script>

<style scoped>
.message-hint{
  position: absolute;
  right: 2px;
  bottom: 0;
  font-size: 12px;
}
</style>