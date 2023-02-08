<!--TODO: rewrite with special vuex module-->
<template>
  <div
      style="position:fixed; bottom: 5px; right: 15px; z-index: 1000"
      :class="viewportHook({base: 'message-box__align', sm: ''})"
  >
    <transition-group name="alerts">
      <v-alert
          v-for="message in notifications"
          :key="message.id"
          class="pa-2 ma-0"
          style="background: rgba(255,0,0,0);"
      >
        <v-card
            min-width="320"
            max-width="700"
            elevation="0"
            class="pa-2 bordered"
            style="background: rgba(255,255,255,0.89)"
        >
          <v-icon
              :color="getColor(message.type)"
              class="mr-3 blue lighten-4"
              style="position:absolute; top: 5px; left: 5px; border-radius: 30%; outline: 1px solid black"
              :size="25"
          >
            {{ getIcon(message.type) }}
          </v-icon>

          <v-row class="pa-2 flex-nowrap" align="center">
            <div class="ml-5">
              <span class="fs-16 font-weight-medium">{{ message.text }}</span>
              <notification-bottom
                  v-if="message.type='notification'"
                  :data="message.notification"
              ></notification-bottom>
            </div>
          </v-row>
        </v-card>
      </v-alert>
    </transition-group>
  </div>
</template>

<script>
import NotificationBottom from "@/components/Specialized/Notification/Bottom/NotificationBottom.vue";

export default {
  name: "MessageBox",
  components: {NotificationBottom},
  data() {
    return {
      messages: [],
    }
  },
  computed: {
    // rewrite with vuex (one notification center)
    notifications() {
      return [...this.$store.getters["notifications/getDisplayingNotifications"].map(el => ({
        type: 'notification',
        id: Date.now(),
        notification: el
      })), ...this.messages]
    },
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
        case 'notification':
          return 'mdi-bell-outline'
      }
    },
    getColor(type) {
      switch (type) {
        case 'error':
          return 'red lighten-3'
        case 'success':
          return 'green lighten-3'
        case 'primary':
          return 'blue lighten-3'
        case 'notification':
          return 'black'
      }
    },
    listenEvents() {
      this.$root.$on('push-message', message => {
        const id = Date.now()
        this.messages.push({...message, id})
        setTimeout(() => {
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

.message-box__align {
  position: fixed;
  left: 5px;
  right: 5px;
  bottom: 5px;
  width: calc(100% - 10px);
}


</style>