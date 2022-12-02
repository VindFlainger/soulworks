<template>
  <div ref="container" class="chat-area-list__wrapper">
    <div class="chat-area-list__top-observer" v-observer="loadPrevious"></div>

    <div v-for="(message, index) in historyMessages" :key="message._id" class="fs-14">
      <div v-if="!$moment(message.createdAt).isSame(historyMessages[index - 1]?.createdAt, 'day')"
           class="text-center pa-2"
      >
        {{ $moment().isSame(message.createdAt, 'day') ? 'сегодня' : $moment(message.createdAt).format('D MMMM Y') }}
      </div>
      <v-row v-if="message.to === userId" class="message mb-2">
        <v-spacer></v-spacer>
        <div class="pa-2 pr-15 blue lighten-4 rounded d-inline-block" style="max-width: 70%; position:relative;">
          {{ message.text }}
          <div class="message-hint">
            {{ $moment(message.createdAt).format('HH:mm') }}
            <v-icon size="19" :class="{'green--text text--accent-4': message.offset <= viewedOffset}">mdi-check-all</v-icon>
          </div>
        </div>
      </v-row>
      <v-row v-else class="mb-2">
        <div class="pa-2 pr-11 grey lighten-4 rounded" style="max-width: 70%; position:relative;">
          {{ message.text }}
          <div class="message-hint">
            {{ $moment(message.createdAt).format('HH:mm') }}
          </div>
        </div>
      </v-row>
    </div>

    <div v-show="historyMessages.length && !loading" class="chat-area-list__bottom-observer"
         v-observer="loadPrevious"></div>


    <div v-for="message in loadingMessages" :key="message.tmpId" class="fs-14">
      <v-row class="message mb-2">
        <v-spacer></v-spacer>
        <div class="pa-2 pr-15 blue lighten-4 rounded d-inline-block" style="max-width: 70%; position:relative;">
          {{ message.text }}
          <div class="message-hint">
            <v-icon size="19">mdi-check</v-icon>
          </div>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import observer from "@/directives/observer";

export default {
  name: "ChatAreaList",
  data() {
    return {
      savedScrollHeight: 0,
      savedScrollPosition: 0,
      lazyLoading: false
    }
  },
  props: {
    loadingMessages: Array,
    historyMessages: Array,
    userId: String,
    loading: Boolean,
    viewedOffset: Number
  },
  methods: {
    scrollDown() {
      this.$refs.container.scrollTop = this.$refs.container.scrollHeight
    },
    loadPrevious() {
      if (!this.lazyLoading) {
        this.lazyLoading = true
        this.$emit('load:previous')
      }
    },
    loadNext() {
      this.$emit('load:next')
    }

  },
  watch: {
    messages() {
      this.scrollDown()
    },
    historyMessages() {
      this.savedScrollHeight = this.$refs.container.scrollHeight
      this.savedScrollPosition = this.$refs.container.scrollTop
      this.$nextTick(() => {
        this.$refs.container.scrollTo({top: this.$refs.container.scrollHeight - this.savedScrollHeight + this.savedScrollPosition})
      })
    },
    loadingMessages() {
      this.$nextTick(() => {
        this.$refs.container.scrollTo({top: this.$refs.container.scrollHeight})
      })
    },
    loading(val) {
      if (!val) {
        this.$nextTick(() => {
          this.lazyLoading = false
        })
      }
    }
  },
  directives: {
    observer
  },
}
</script>

<style scoped>


.message-hint {
  position: absolute;
  right: 2px;
  bottom: 0;
  font-size: 12px;
}

.chat-area-list__wrapper {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 120px);
}

.chat-area-list__top-observer {
  position: absolute;
  left: 0;
  right: 0;
}

.chat-area-list__bottom-observer {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>