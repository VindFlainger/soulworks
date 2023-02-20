<template>
  <div class="requesting-visualizer">
    <ui-problem
        :class="{'display-none': !problem}"
        row
        @retry="$emit('retry')"
    >
    </ui-problem>
    <ui-loader
        :class="{'display-none': !loading}"
        row
        class="mt-2 mb-2"
    ></ui-loader>
  </div>
</template>

<script>
import UiLoader from "@/components/UI/UiLoader.vue";
import UiProblem from "@/components/UI/UiProblem.vue";

export default {
  name: "UiRequestingVisualizer",
  components: {UiProblem, UiLoader},
  props: {
    problem: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.requesting-visualizer >>> .display-none {
  display: none !important;
}
</style>