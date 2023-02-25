<template>
  <default-input
      v-bind="$attrs"
      v-on="$listeners"
      maxlength="64"
      :rules="[v => (!required && !lazyValue) || (v && /^\w+@\w+\.\w+/.test(v)) || $t('common.validation.invalid-email')]"
      :required="required"
      @focusout="checkEmail"
      :label="label"
      @input="lazyValue = $event; $emit('input', $event)"
      :value="value"
      :error-messages="emailExists || emailNotExists?emailExists?$t('common.validation.email-exists'):$t('common.validation.email-not-exists'):''"
      id="email_address"
      name="email_address"
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
        this.getData(`check/email?email=${this.lazyValue}`)
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