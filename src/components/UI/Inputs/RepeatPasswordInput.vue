<template>
  <default-input
      label="Повторите пароль"
      type="password"
      :rules="[
          v => v === value || 'Пароли не совпадают'
      ]"
  >
  </default-input>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
export default {
  name: "RepeatPasswordInput",
  components: {DefaultInput},
  props: {
    value: String,
  }
}
</script>

<style scoped>

</style>