<template>
  <v-dialog v-on="$listeners"
            v-bind="$attrs"
            @click:outside="$emit('close')"
            content-class="rounded-xl"
  >
    <v-card v-if="!empty" class="pa-4">
      <slot name="close-button" v-if="!easyContainer">
        <ui-close-button absolute style="right: 5px; top: 5px; z-index: 1" @click="$emit('close')"></ui-close-button>
      </slot>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
import UiCloseButton from "@/components/UI/Buttons/UiCloseButton";
export default {
  name: "BaseDialog",
  props: {
    easyContainer: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    }
  },
  components: {UiCloseButton}
}
</script>

<style scoped>

</style>