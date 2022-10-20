<template>
  <v-row class="switcher"
         style="height: 60px; cursor: pointer"
         :class="{'switcher_left': value, 'switcher_right': !value}"
         @click="$emit('input', !value)">
    <v-col class="pa-0">
      <v-row justify="center" align="center">
        <div class="d-flex flex-column">
          <v-icon size="40" :color="value?'black':''">{{prependIcon}}</v-icon>
          <small style="font-size: 10px; text-align: center">{{prependLabel}}</small>
        </div>
      </v-row>

    </v-col>
    <v-col class="pa-0">
      <v-row justify="center" align="center">
        <div class="d-flex flex-column">
          <v-icon size="40" :color="!value?'black':''">{{appendIcon}}</v-icon>
          <small style="font-size: 10px; text-align: center">{{appendLabel}}</small>
        </div>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UiSwitchPicker",
  props: {
    value: Boolean,
    prependIcon: String,
    appendIcon: String,
    appendLabel: String,
    prependLabel: String
  }
}
</script>

<style scoped>
.switcher {
  overflow-x: hidden;
  position: relative;
  height: 50px;
  background: rgba(236, 232, 232, 0.62);
  border-radius: 15px !important;
}

.switcher::after {
  content: '';
  position: absolute;
  transition: .2s linear;
  width: 50%;
  height: 100%;
  background: rgba(192, 255, 253, 0.33);
}

.switcher_left::after {
  content: '';
  top: 0;
  left: 0;
}

.switcher_right::after {
  content: '';
  left: 50%;
  top: 0
}
</style>