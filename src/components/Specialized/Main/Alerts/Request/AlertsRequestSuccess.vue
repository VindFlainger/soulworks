<template>
  <div>
    <h4 class="font-weight-bold text-h5 line-height-1-25rem green--text ubuntu">
      {{ $t('common.ui.alerts.success') }}
      <v-icon color="green" size="25" class="crc-l-2 crc-t-n2">
        mdi-check-bold
      </v-icon>
    </h4>
    <h5
        v-if="message"
        class="font-weight-bold mt-1 ubuntu subtitle-1 line-height-1rem"
    >
      {{ $t('common.ui.alerts.description') }}:
      <span class="body-2 ubuntu">{{ message }}</span>
    </h5>
  </div>
</template>

<script>
export default {
  name: "AlertsRequestSuccess",
  props: {
    message: {
      type: String,
    },
  }
}
</script>

<style scoped>

</style>