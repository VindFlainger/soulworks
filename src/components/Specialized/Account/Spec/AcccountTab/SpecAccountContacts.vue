<template>
  <div>
    <div class="font-title font-weight-bold fs-18">
      {{ $t('account.spec.personal-data.contacts') }}:
    </div>

    <div>
      <div v-if="address" class="mt-2">
        <span class="font-text fs-16">{{ $t('account.spec.personal-data.address') }}: </span>
        <code>{{ address }}</code>
      </div>

      <div v-if="connection" class="mt-2">
        <span class="font-text fs-16">{{ $t('account.spec.personal-data.connection') }}: </span>
        <code>{{ connection }}</code>
      </div>

      <div v-if="contactPhone" class="mt-2">
        <p class="ma-0 text-subtitle-1">
          <span class="font-text">{{ $t('account.spec.personal-data.phone') }}:</span>
          <code class="ml-1">{{ contactPhone | phone }}</code>
        </p>

        <ui-social-links
            :links="messengers.map(el => ({name: el}))"
            :size="viewportHook({base: 25, md: 32})"
            style="pointer-events: none">
        </ui-social-links>
      </div>

      <div v-if="links && links.length">
        <span class="font-text fs-16">{{ $t('account.spec.personal-data.social-networks') }}:</span>
        <ui-social-links :links="links" :size="viewportHook({base: 25, md: 32})"></ui-social-links>
      </div>
    </div>
  </div>
</template>

<script>
import text from "@/filters/text";
import UiSocialLinks from "@/components/UI/UiSocialLinks.vue";

export default {
  name: "SpecAccountContacts",
  components: {UiSocialLinks},
  mixins: {text},
  props: {
    address: {
      type: String,
      required: false
    },
    contactPhone: {
      type: String,
      required: false
    },
    connection: {
      type: String,
      required: false
    },
    messengers: {
      type: Array,
      required: false
    },
    links: {
      type: Array,
      required: false
    }
  }
}
</script>

<style scoped>

</style>