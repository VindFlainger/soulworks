<template>
  <div ref="container" class="chat-area-list__wrapper">

    <div v-if="messages[0]?.offset >= 0"
         v-show="!loading"
         class="chat-area-list__top-observer"
         v-observer:top="loadPrevious">
    </div>


    <div ref="list">
      <div v-for="(message, index) in messages"
           :key="message._id"
           :offset="message.offset"
           :class="[message.to === userId?'my-message__wrapper':'other-message__wrapper']"
           class="fs-14"
      >
        <div v-if="!$moment(message.createdAt).isSame(messages[index - 1]?.createdAt, 'day')"
             class="text-center pa-2"
        >
          {{ $moment().isSame(message.createdAt, 'day') ? 'сегодня' : $moment(message.createdAt).format('D MMMM Y') }}
        </div>

        <div :class="[message.to === userId?'my-message__content':'other-message__content']"
             class="message__content mb-2">
          {{ message.text }}
          <div class="message__hint">
            {{ $moment(message.createdAt).format('HH:mm') }}
            <v-icon v-if="message.to === userId"
                    size="19"
                    :class="{'green--text text--accent-4': message.offset <= viewedOffset}">
              mdi-check-all
            </v-icon>
          </div>
        </div>
      </div>
    </div>


    <div
        v-if="!historyLoaded"
        v-show="!loading"
        class="chat-area-list__bottom-observer"
        v-observer:bottom="loadNext">
    </div>

    <div v-for="message in loadingMessages" :key="message._id" class="fs-14">
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
  name: "ChatList",
  mounted() {
    const cb = (entries) => {
      const intersected = entries.filter(ent => ent.isIntersecting)
      intersected.forEach(ent => {
        const offset = intersected[intersected.length - 1]?.target.getAttribute('offset')
        this.$emit('change:read-offset', Number(offset))
        this.observer.unobserve(ent.target)
      })
    }

    this.observer = new IntersectionObserver(cb, {
      root: this.$refs.container
    });

    [...this.$refs.list.children].filter(el => el.getAttribute('offset') > this.readOffset).forEach(el => {
      this.observer.observe(el)
    })
  },
  data() {
    return {
      observer: null,
      savedScrollHeight: 0,
      savedScrollPosition: 0,
      lazyLoading: false,
      scrollBehavior: null,
      historyLoaded: false
    }
  },
  props: {
    loadingMessages: Array,
    messages: Array,
    userId: String,
    loading: Boolean,
    finalOffset: Number,
    readOffset: Number,
    viewedOffset: Number
  },
  methods: {
    loadPrevious() {
      if (!this.lazyLoading) {
        this.scrollBehavior = 'previous'
        this.lazyLoading = true
        this.$emit('load:previous')
      }
    },
    loadNext() {
      if (!this.lazyLoading) {
        this.scrollBehavior = 'next'
        this.lazyLoading = true
        this.$emit('load:next')
      }
    },
  },
  watch: {
    messages() {
      if (this.messages[this.messages.length - 1].offset >= this.finalOffset) {
        this.historyLoaded = true
      }
      if (this.scrollBehavior === 'previous') {
        this.savedScrollHeight = this.$refs.container.scrollHeight
        this.savedScrollPosition = this.$refs.container.scrollTop
        this.$nextTick(() => {
          this.$refs.container.scrollTo({top: this.$refs.container.scrollHeight - this.savedScrollHeight + this.savedScrollPosition})
        })
      } else if (this.scrollBehavior === 'next') {
        this.savedScrollPosition = this.$refs.container.scrollTop
        this.$nextTick(() => {
          [...this.$refs.list.children].filter(el => el.getAttribute('offset') > this.readOffset).forEach(el => {
            this.observer.observe(el)
          })
          this.$refs.container.scrollTo({top: this.savedScrollPosition})
        });
      } else {
        this.$nextTick(() => {
          [...this.$refs.list.children].filter(el => el.getAttribute('offset') > this.readOffset).forEach(el => {
            this.observer.observe(el)
          })
          this.$refs.container.scrollTo({top: this.$refs.container.scrollHeight})
        })
      }
      this.scrollBehavior = null
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
    },
  },
  directives: {
    observer
  },
}
</script>

<style scoped>
.my-message__wrapper {
  text-align: right;
}

.message__content {
  border-radius: 8px;
  display: inline-block;
  max-width: 70%;
  position: relative;
  overflow-wrap: anywhere;
}

.my-message__content {
  background: #BBDEFB;
  text-align: left;
  padding: 8px 60px 8px 8px;
}

.other-message__content {
  background: #e7e6e6;
  text-align: left;
  padding: 8px 40px 8px 8px;
}

.message__hint {
  position: absolute;
  right: 3px;
  bottom: 1px;
  font-size: 12px;
}

.chat-area-list__wrapper {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 120px);
}

.chat-area-list__top-observer {
  height: 1px;
}

.chat-area-list__bottom-observer {
  height: 1px;
}
</style>