<template>
  <default-input
      @input="$emit('input', $event)"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      :required="required"
      :rules="[v => /^[a-zа-яё]+$/i.test(v) || $t('common.validation.unavailable-symbols')]"
  ></default-input>
</template>

<script>
import inputs from "@/mixins/inputs";
import DefaultInput from "@/components/UI/Inputs/DefaultInput";

export default {
  name: "NameInput",
  components: {DefaultInput},
  props: {
    value: String
  },
  mixins: [inputs]
}
</script>

<style scoped>
</style>