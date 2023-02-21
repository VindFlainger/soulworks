<template>
  <dropdown-input
      :value="locale"
      :items="langs"
      @input="setLocale"
  ></dropdown-input>
</template>

<script>
import {changeLocale} from "@/store/action-types";
import {mapGetters} from "vuex";
import DropdownInput from "@/components/UI/Inputs/DropdownInput.vue";

export default {
  name: "HeaderLocalization",
  components: {DropdownInput},
  data() {
    return {
      langs: ['en', 'ru'],
    }
  },
  computed: {
    ...mapGetters({
      locale: "getLocale"
    })
  },
  methods: {
    setLocale(locale) {
      this.$store.dispatch(changeLocale, locale)
    }
  }
}
</script>

<style scoped>

</style>