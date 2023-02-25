<template>
  <div>
    <h4 class="font-weight-bold text-h5 line-height-1-25rem red--text ubuntu">
      {{ $t('common.ui.alerts.error') }}
      <v-icon color="red" size="25" class="crc-l-2 crc-t-n2">
        mdi-fire
      </v-icon>
    </h4>
    <h5 class="font-weight-bold mt-1 ubuntu subtitle-1 line-height-1rem">
      {{ $t('common.ui.alerts.code') }}: <span class="body-2 ubuntu">{{ code }}</span>
    </h5>
    <h5 class="font-weight-bold mt-1 ubuntu subtitle-1 line-height-1rem">
      {{ $t('common.ui.alerts.description') }}:
      <span class="body-2 ubuntu">{{ message }}</span>
    </h5>
  </div>
</template>

<script>
export default {
  name: "AlertsRequestError",
  props: {
    message: {
      type: String,
    },
    code: {
      type: [Number, String]
    }
  }
}
</script>

<style scoped>

</style>