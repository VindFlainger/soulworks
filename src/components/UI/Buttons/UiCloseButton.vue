<template>
  <v-btn icon v-bind="$attrs" v-on="$listeners">
      <div class="cross"></div>
  </v-btn>
</template>

<script>
export default {
  name: "UiCloseButton"
}
</script>

<style scoped>
.cross {
  position: relative;
  width: 20px;
  height: 20px;
}

.cross::after{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 28px;
  height: 2px;
  background: black;
  transform-origin: left;
  transform: rotate(45deg);
}

.cross::before{
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 28px;
  height: 2px;
  background: black;
  transform-origin: right;
  transform: rotate(-45deg);
}

.cross::before{

}
</style>