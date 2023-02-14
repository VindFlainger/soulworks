<template>
  <v-dialog v-on="$listeners"
            v-bind="$attrs"
            @click:outside="$emit('close')"
            content-class="rounded-xl white"
  >

    <v-row v-if="!easyContainer" style="position: sticky; z-index: 2; top: 0;">
      <v-spacer></v-spacer>
      <slot name="close-button" >
        <v-btn
            icon
            class="mr-1 white"
            @click="$emit('close')"
            style="outline: 1px solid black; position:relative; top: 8px; right: 4px"
            small
        >
          <v-icon color="black">mdi-window-close</v-icon>
        </v-btn>
      </slot>
    </v-row>


    <div v-if="!empty" class="pa-2 pa-md-4 mt-n6" style="background: none; position:relative;">
      <div style="position:relative; z-index: 1">
        <slot></slot>
      </div>
      <div v-if="background" class="base-dialog"></div>
    </div>
  </v-dialog>
</template>

<script>

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

.no-overflow{}

</style>