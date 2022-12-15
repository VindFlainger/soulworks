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
        <span class="contact">Номер телефона:</span> +{{ phone }}
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

    <div>
      <span class="contact">Адрес:</span> {{ address }}
    </div>
    <div>
      <span class="contact">Контактная информация:</span> {{ connection }}
    </div>

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

export default {
  name: "ContactsDialog",
  components: {UiSocialLinks, BaseDialog},
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
    },
    links: {
      type: Array,
    },
    connection: {
      type: String,
      default: 'Пользователь не указал свои контакты'
    },
    address: {
      type: String,
      default: 'Пользователь не указал свой адрес'
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