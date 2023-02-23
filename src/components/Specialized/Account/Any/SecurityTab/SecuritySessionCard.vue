<template>
  <v-card
      elevation="0"
      :class="{'green lighten-5': session.device === userAgent}"
      outlined
  >
    <v-row align="center">
      <ui-agent-visualizer :user-agent="session.device"></ui-agent-visualizer>

      <v-col class="ml-2 pa-0 fs-12">
        <p class="ma-0">
          <code class="font-weight-bold font-title">{{ $t('account.spec.security.login') }}:</code>
          {{ $moment(session.date).format('lll') }}
        </p>

        <p class="ma-0">
          <code class="font-weight-bold font-title">{{ $t('account.spec.security.activity') }}:</code>
          {{ $moment(session.activity).format('lll') }}
        </p>

        <p class="ma-0">
          <code class="font-weight-bold font-title">{{ $t('account.spec.security.ip') }}:</code>
          {{ session.ip }}
        </p>

        <p class="ma-0">
          <code class="font-weight-bold font-title">{{ $t('account.spec.security.device') }}:</code>
          {{ session.device }}
        </p>
      </v-col>

      <v-btn
          absolute
          x-small
          fab
          style="top: 5px; right: 5px"
          elevation="0"
          outlined
          color="red"
          @click="$emit('delete-session', session.device)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

    </v-row>
  </v-card>
</template>

<script>
import UiAgentVisualizer from "@/components/UI/UiAgentVisualizer.vue";

export default {
  name: "SecuritySessionCard",
  components: {UiAgentVisualizer},
  props: {
    userAgent: {
      type: String,
      required: true
    },
    session: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>