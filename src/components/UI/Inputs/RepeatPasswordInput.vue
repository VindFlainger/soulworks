<template>
  <default-input
      :label="$t('common.labels.repeat-password')"
      type="password"
      :rules="[
          v => v === value || $t('common.validation.passwords-dont-match')
      ]"
  >
  </default-input>
</template>

<script>
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import inputs from "@/mixins/inputs";
export default {
  name: "RepeatPasswordInput",
  mixins: [inputs],
  components: {DefaultInput},
  props: {
    value: String,
  }
}
</script>

<style scoped>

</style>