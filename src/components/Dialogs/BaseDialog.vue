<template>
  <v-dialog v-on="$listeners"
            v-bind="$attrs"
            @click:outside="$emit('close')"
            content-class="rounded-xl white"
  >


    <v-row v-if="!easyContainer" style="position: sticky; z-index: 2; top: 0;">
      <v-spacer></v-spacer>
      <slot name="close-button">
        <ui-close-button class="mr-1" @click="$emit('close')"></ui-close-button>
      </slot>

    </v-row>


    <v-card v-if="!empty" class="pa-2 pa-md-4 mt-n8" style="background: none; position:relative;">
      <div style="position:relative; z-index: 1">
        <slot></slot>
      </div>
      <div v-if="background" class="base-dialog"></div>
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
    },
    background: {
      type: Boolean,
      default: false
    }
  },
  components: {UiCloseButton}
}
</script>

<style>

.base-dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  background: url('@/assets/images/dialogs/background.png') repeat-y !important;
  opacity: 0.4;
}

.v-dialog {
  position: relative;
}

</style>