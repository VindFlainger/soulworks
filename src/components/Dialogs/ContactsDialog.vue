<template>

  <base-dialog
      :value="value"
      max-width="500"
      @close="$emit('close')"
  >

    <div class="font-title font-weight-bold fs-22">
      {{ surname }} {{ name }}
    </div>

    <v-row align="end">
      <div>
        <span class="contact">
          {{ $t('common.ui.phone-number') }}:
        </span>
        {{ phone | phone }}
      </div>

      <v-img
          class="d-inline-block ma-1"
          v-for="messenger in messengers"
          :key="messenger"
          :src="require(`@/assets/images/networks/${messenger}.png`)"
          max-width="25"
          height="25"
      ></v-img>
    </v-row>

    <p class="contact text-title ma-0">{{ $t('common.labels.address') }}:
      <span class="font-weight-regular">{{ address || $t('common.ui.no-address') }}</span>
    </p>

    <p class="contact text-title ma-0">{{ $t('common.labels.communication') }}:
      <span class="font-weight-regular">{{ connection || $t('common.ui.no-contacts') }}</span>
    </p>

    <ui-social-links
        class="mt-1"
        :links="links"
        size="40"
    ></ui-social-links>

  </base-dialog>

</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import UiSocialLinks from "@/components/UI/UiSocialLinks";
import text from "@/filters/text";

export default {
  name: "ContactsDialog",
  components: {UiSocialLinks, BaseDialog},
  filters: {
    text
  },
  props: {
    value: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    messengers: {
      type: Array,
      required: false
    },
    links: {
      type: Array,
      required: false
    },
    connection: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.contact {
  font-size: 16px;
  font-weight: 600;
}
</style>