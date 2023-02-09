<template>
  <div
      style="position:fixed; bottom: 5px; right: 15px; z-index: 1000"
      :class="viewportHook({base: 'alerts-box__align', sm: ''})"
  >
    <transition-group name="alerts" tag="div" class="d-flex flex-column align-end">
      <v-alert
          v-for="alert in alerts"
          :key="alert.id"
          class="pa-2 ma-0"
          style="background: rgba(255,0,0,0)"
          @mouseenter="stopAlertRemoving(alert.id)"
          @mouseleave="startAlertRemoving({alertId: alert.id})"
      >
        <v-card
            min-width="320"
            max-width="700"
            elevation="0"
            class="pa-2 bordered"
            style="background: rgba(255,255,255,0.89)"
        >
          <v-icon
              color="black"
              class="mr-3"
              style="position:absolute; top: 5px; left: 5px; border-radius: 30%; outline: 1px solid black"
              :size="25"
          >
            {{ getIcon(alert.type) }}
          </v-icon>

          <v-row class="pa-2 flex-nowrap" align="center">
            <div class="ml-7">
              <alerts-request
                  v-if="alert.type === 'request'"
                  :content="alert.content"
              ></alerts-request>

              <alerts-notification
                  v-if="alert.type === 'notification'"
                  :content="alert.content"
              ></alerts-notification>
            </div>
          </v-row>
        </v-card>
      </v-alert>
    </transition-group>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {startAlertRemoving, stopAlertRemoving} from "@/store/action-types";
import AlertsNotification from "@/components/Specialized/Main/Alerts/Notification/AlertsNotification.vue";
import AlertsRequest from "@/components/Specialized/Main/Alerts/Request/AlertsRequest.vue";

export default {
  name: "AlertsBox",
  components: {AlertsRequest, AlertsNotification},
  computed: {
    ...mapGetters({
      alerts: 'getAlerts'
    })
  },
  methods: {
    ...mapActions({
      stopAlertRemoving,
      startAlertRemoving
    }),
    getIcon(type) {
      switch (type) {
        case 'request':
          return 'mdi-swap-vertical'
        case 'notification':
          return 'mdi-bell-outline'
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

.alerts-box__align {
  position: fixed;
  left: 5px;
  right: 5px;
  bottom: 5px;
  width: calc(100% - 10px);
}


</style>