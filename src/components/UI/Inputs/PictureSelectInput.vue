<template>
  <v-row>
    <div
        class="ma-2"
        v-for="item in items"
        :key="item.value"
    >
      <label>
        <v-img
            :src="item.img"
            :max-width="size"
            :class="{'checked': checked.includes(item.value)}"
        ></v-img>
        <input
            type="checkbox"
            :value="item.value"
            v-model="checked"
            class="d-none"
        >
      </label>
    </div>

  </v-row>
</template>

<script>
export default {
  name: "PictureSelectInput",
  data() {
    return {
      checked: this.value,

      firstChanged: false
    }
  },
  props: {
    value: Array,
    items: Array,
    size: {
      type: [Number, String],
      default: 32
    }
  },
  watch: {
    value: {
      handler(v) {
        this.checked = v
      },
    },
    checked(v) {
      if (this.firstChanged) this.$emit('input', v)
      else this.firstChanged = true
    }
  },
}
</script>

<style scoped>
.checked {
  box-shadow: 0 0 0 2px white, 0 0 0 3px black;
  border-radius: 10px;
}
</style>