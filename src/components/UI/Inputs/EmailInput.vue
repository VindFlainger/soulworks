<template>
  <default-input
      maxlength="64"
      v-bind="$attrs"
      v-on="$listeners"
      :rules="[v => (!required && !lazyValue) || (v && /^\w+@\w+\.\w+/.test(v)) || 'Некорректная почта']"
      :required="required"
      :show-required-badge="showRequiredBadge"
      @focusout="checkEmail"
      :label="label"
      @input="lazyValue = $event; $emit('input', $event)"
      :value="value"
      :error-messages="emailExists || emailNotExists?emailExists?'Данная почта уже используется':'Указанная почта не зарегистрирована':''"
  >
  </default-input>
</template>

<script>
import inputs from "@/mixins/inputs";
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import requests from "@/mixins/requests";

export default {
  name: "EmailInput",
  components: {DefaultInput},
  data() {
    return {
      emailExists: false,
      emailNotExists: false,
      lazyValue: ''
    }
  },
  props: {
    value: String,
    check: {
      type: [Boolean, String],
      default: false
    },
    label: {
      type: String,
      default: 'Почта'
    }
  },
  methods: {
    checkEmail() {
      if (this.check) {
        this.getData(`http://localhost:3000/check/email?email=${this.lazyValue}`)
            .then(resp => {
              this.emailExists = this.check === 'exists' ? false : resp.data;
              this.emailNotExists = this.check === 'exists' ? !resp.data : false;
            })
      }
    }
  },
  watch: {
    value(val) {
      this.lazyValue = val
    }
  },
  mixins: [inputs, requests],
}
</script>

<style scoped>

</style>