<template>
  <div style="position:fixed; bottom: 5px; right: 15px; z-index: 1000" v-if="$store.state.alerts.length">
    <transition-group name="alerts">
      <v-alert v-for="message in messages" :key="message.id" class="pa-2" style="background: rgba(255,0,0,0)">
        <v-card
            min-width="300"
            max-width="700"
            elevation="0"
            style="outline: 1px solid grey"
            class="pa-0 black"
            color="green lighten-5"
        >

          <v-row class="pa-2" v-if="message.text" align="center">
            <v-icon :color="message.type" class="mr-2" size="35">
              {{ getIcon(message.type) }}
            </v-icon>
            <span class="fs-16 font-weight-medium">{{ message.text }}</span>

          </v-row>
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
      messages: [],
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
        }, message.time || 2000)
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