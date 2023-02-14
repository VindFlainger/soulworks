// Do not caching (keep-alive) this =)
<template>
  <div style="position:relative;">
    <v-progress-linear
        reverse
        class="mb-1"
        :class="right?'scroll-container__right':''"
        :value="scrollTop/(scrollableHeight-height)*100">
    </v-progress-linear>
    <div
        ref="scrollable"
        class="pa-2"
        style="max-height: 400px; overflow-y: auto" @scroll="refreshScrollTop"
    >
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiScrollContainer",
  props: {
    right: {
      type: Boolean,
      default: true
    },
    top: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      scrollableHeight: 0,
      scrollTop: 0,
      height: 0,
      id: 0
    }
  },
  methods: {
    refreshHeight() {
      this.height = this.$refs.scrollable.clientHeight
    },
    refreshScrollableHeight() {
      this.scrollableHeight = this.$refs.scrollable.scrollHeight
    },
    refreshScrollTop() {
      this.scrollTop = this.$refs.scrollable.scrollTop
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.refreshScrollableHeight()
      this.refreshHeight()
    })

    this.id = setInterval(() => {
      this.refreshScrollableHeight()
      this.refreshHeight()
    }, 300)

    // low performance
    /*const observer = new MutationObserver(() => {
      this.refreshScrollableHeight()
      this.refreshHeight()
    })

    observer.observe(this.$refs.scrollable, {
      childList: true,
      attributes: true,
      subtree: true
    })*/
  },
  destroyed() {
    clearInterval(this.id)
  },
}

</script>

<style scoped>
.scroll-container__right {
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
  transform-origin: right center;
  transform: rotate(90deg);

}
</style>