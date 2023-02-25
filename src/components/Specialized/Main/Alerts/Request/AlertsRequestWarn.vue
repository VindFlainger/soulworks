<template>
  <div>
    <h4 class="font-weight-bold text-h5 line-height-1-25rem orange--text ubuntu">
      {{ $t('common.ui.alerts.warn') }}
      <v-icon color="orange" size="25" class="crc-l-2 crc-t-n2">
        mdi-alert-octagram-outline
      </v-icon>
    </h4>
    <h5 class="font-weight-bold mt-1 ubuntu subtitle-1 line-height-1rem">
      {{ $t('common.ui.alerts.description') }}:
      <span class="body-2 ubuntu">{{ message }}</span>
    </h5>
  </div>
</template>

<script>
export default {
  name: "AlertsRequestWarn",
  props: {
    message: {
      type: String,
    },
  }
}
</script>

<style scoped>

</style>