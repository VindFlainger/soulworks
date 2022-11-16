<template>
  <div style="position:fixed; bottom: 5px; right: 15px; z-index: 1000; opacity: 0.7" v-if="$store.state.alerts.length">
    <transition-group name="alerts">
      <v-alert v-for="message in messages" :key="message.id" class="pa-2" style="background: rgba(255,0,0,0)">
        <v-card
            width="300"
            elevation="0"
            v-if="!!message.title"
            style="outline: 1px solid grey"
            class="pa-0"
            color=""
        >
          <v-row align="center" class="white pa-2 flex-nowrap">
            <v-icon :color="message.type" class="mr-2" size="37">
              {{ getIcon(message.type) }}
            </v-icon>
            <div class="font-title font-weight-bold fs-16 black--text">{{ message.title }}</div>
          </v-row>

          <div class="pa-2" v-if="message.text">{{ message.text }}</div>
        </v-card>
      </v-alert>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  data() {
    return {
      messages: []
    }
  },
  methods: {
    getIcon(type) {
      switch (type) {
        case 'error':
          return 'mdi-alert'
        case 'success':
          return 'mdi-check-circle'
        case 'primary':
          return 'mdi-information'
      }
    },
    listenEvents() {
      this.$root.$on('push-message', message => {
        const id = Date.now()
        this.messages.push({...message, id})
        setTimeout(()=>{
          this.messages = this.messages.filter(message => message.id !== id)
        }, message.time)
      })
    }
  },
  mounted() {
    this.listenEvents()
  }

}
</script>

<style scoped>
.alerts-enter-active {
  transition: .8s linear;
  transform: translateY(200px);
}

.alerts-leave-active {
  transition: .8s linear;
  transform: translateX(0);
}

.alerts-enter-to {
  transform: translateY(0);
}

.alerts-leave-to {
  transform: translateX(300px);
}


</style>