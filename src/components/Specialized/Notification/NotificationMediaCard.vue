<template>
  <notification-base-card
      :read="read"
      :title="title"
      :date="date"
  >
    <template v-slot:preview>
      <v-icon size="64">
        {{ icon }}
      </v-icon>

    </template>

    <template v-slot:content>
      <div class="fs-16">
        {{ text }}
      </div>

      <v-img
          class="mt-3"
          v-if="img"
          :src="img"
          max-width="100%"
      >
      </v-img>

      <v-row
          v-if="documents?.length"
          class="mt-3"
      >
        <ui-document-preview
            v-for="document in documents"
            :key="document.id"
            :name="document.name"
            :url="document.url"
        ></ui-document-preview>
      </v-row>
    </template>

    <template v-slot:actions>
      <ui-default-button
          v-if="url"
          :href="url"
          small
      >
        Перейти
      </ui-default-button>

      <ui-confirm-button
          v-if="!read"
          @click="$emit('read')"
          small
      >
        Прочитано
      </ui-confirm-button>
    </template>
  </notification-base-card>
</template>

<script>
import NotificationBaseCard from "@/components/Specialized/Notification/NotificationBaseCard";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview";

export default {
  name: "NotificationMediaCard",
  components: {
    UiDocumentPreview,
    UiConfirmButton,
    UiDefaultButton,
    NotificationBaseCard
  },
  props: {
    read: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      default: 'mdi-bell-ring',
      validator: v => v.startsWith('mdi-')
    },
    img: {
      type: String,
      required: false
    },
    documents: {
      type: Array,
    },
  }
}
</script>

<style scoped>

</style>