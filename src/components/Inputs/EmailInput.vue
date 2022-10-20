<template>
  <ui-input-badge :value="required && requiredIndicator">
    <v-text-field
        filled
        background-color="grey lighten-3"
        class="rounded-pill ma-1"
        style="max-width: 300px;"
        dense
        outlined
        color="grey darken-2"
        @input="$emit('input', $event)"
        :value="value"
        maxlength="64"
        v-bind="$attrs"
        :rules="[
          v => (!!v || !required) || 'Введите электронную почту',
          v => !required || (v && /^\w+@\w+\.\w+/.test(v)) || 'Некорректная почта',
      ]"
        :error-messages="emailExists || emailNotExists?emailExists?'Данная почта уже используется':'Указанная почта не зарегистрирована':''"
        @focusout="checkEmail"
        validate-on-blur
        label="Почта"
    >
    </v-text-field>
  </ui-input-badge>
</template>

<script>
import inputs from "@/mixins/inputs";
import UiInputBadge from "@/components/UI/UiInputBadge";

export default {
  name: "EmailInput",
  components: {UiInputBadge},
  data() {
    return {
      emailExists: false,
      emailNotExists: false
    }
  },
  props: {
    value: String,
    check: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    checkEmail() {
      if (this.check) {
        this.getData(`http://localhost:3000/check/email?email=${this.value}`)
            .then(resp => {
              this.emailExists = this.check === 'exists' ? false : resp.data;
              this.emailNotExists = this.check === 'exists' ? !resp.data : false;
            })
      }
    }
  },
  mixins: [inputs],
}
</script>

<style scoped>

</style>