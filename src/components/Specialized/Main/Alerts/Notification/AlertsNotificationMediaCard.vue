<template>
  <alerts-notification-base-card>
    <v-row class="flex-nowrap" align="center">

      <div>
        <h4 class="text-h6 font-weight-bold line-height-1-25rem">
          <v-icon
              v-if="icon"
              class="crc-t-n2"
              :size="viewportHook({base: 20, lg: 30})"
          >
            {{ icon }}
          </v-icon>
          {{ title }}
        </h4>

        <p class="body-1 ma-0">{{ text }}</p>

        <ui-default-button
            v-if="!visibleMedia"
            class="mt-1"
            small
            @click="visibleMedia=true"
        >Смотреть содержимое
        </ui-default-button>

        <div v-if="visibleMedia">
          <div
              v-if="img"
              style="position:relative; width: 100%">
            <img
                alt=""
                :src="img.url"
                style="max-width: 100%"
                class="pr-2 pt-1 pb-1"
            >
          </div>

          <v-row>
            <ui-document-preview
                v-for="document in documents"
                :key="document.id"
                :name="document.name"
                :url="document.url"
                :max-width="viewportHook({
                base: 60,
                lg: 80
              })"
            ></ui-document-preview>
          </v-row>
        </div>
      </div>


      <v-btn
          v-if="url"
          :href="url"
          v-bind="viewportHook({
              base: {small: true},
              md: {large: true},
              xl: {'x-large': true},
            })"
          icon
          color="black"
      >
        <v-icon>mdi-send-outline</v-icon>
      </v-btn>

    </v-row>
  </alerts-notification-base-card>
</template>

<script>
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview.vue";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton.vue";
import AlertsNotificationBaseCard
  from "@/components/Specialized/Main/Alerts/Notification/AlertsNotificationBaseCard.vue";

export default {
  name: "AlertsNotificationMediaCard",
  components: {AlertsNotificationBaseCard, UiDefaultButton, UiDocumentPreview},
  props: {
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
      required: false
    },
    img: {
      type: Object,
      required: false
    },
    documents: {
      type: Array,
    }
  },
  data() {
    return {
      visibleMedia: false
    }
  }
}
</script>

<style scoped>

</style>