<!--Components group for easy future scaling-->
<template>
  <div :is="content.type" v-bind="content[content.type]"></div>
</template>

<script>
import AlertsRequestError from "@/components/Specialized/Main/Alerts/Request/AlertsRequestError.vue";
import AlertsRequestWarn from "@/components/Specialized/Main/Alerts/Request/AlertsRequestWarn.vue";
import AlertsRequestSuccess from "@/components/Specialized/Main/Alerts/Request/AlertsRequestSuccess.vue";

export default {
  name: "AlertsRequest",
  components: {
    error: AlertsRequestError,
    warn: AlertsRequestWarn,
    success: AlertsRequestSuccess
  },
  props: {
    content: {
      type: Object,
    }
  },
}
</script>

<style scoped>

</style>