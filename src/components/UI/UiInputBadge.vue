<template>
  <div class="badge" :class="{badge_active: value}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UiInputBadge",
  props: {
    value: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.badge{
  position: relative;
}
.badge_active::after{
  content: '*';
  position: absolute;
  font-size: 25px;
  line-height: 0;
  left: 5px;
  top: 11px;
  color: #5b3e5b;
  border-radius: 50%;
  z-index: 2;
}
</style>