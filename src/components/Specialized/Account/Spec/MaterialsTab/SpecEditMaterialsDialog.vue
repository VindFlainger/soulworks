<template>
  <base-dialog
      :value="value"
      max-width="550"
      @close="$emit('close')"
  >
    <div v-if="value && material">

      <h4 class="text-title text-h5 comfortaa font-weight-bold">{{ material.name }}</h4>

      <p class="text-body-2 sans text-title pl-1 grey--text text--darken-2 line-left">{{ material.description }}</p>

      <v-row class="mt-3">
        <ui-document-preview
            class="ma-1"
            v-for="document in material.documents"
            :key="document.id"
            :url="document.url"
            :name="document.name"
        ></ui-document-preview>
      </v-row>

      <h4 class="font-weight-bold mt-3 sans text-h6">{{$t('account.spec.materials.readers')}}</h4>

      <v-card
          class="overflow-y-auto"
          elevation="0"
          max-height="300"
      >
        <ul
            v-if="material.readers.length"
            class="ml-2"
        >
          <li
              class="text-body-1"
              v-for="reader in material.readers"
              :key="reader._id"
          >
            <v-row style="max-width: 240px" justify="space-between">
              <div>
                <p class="ma-0">
                  {{ reader.surname }} {{ reader.name }}
                </p>
                <p class="text-caption mb-1 mt-n1">
                  {{ reader._id }}
                </p>
              </div>
              <v-btn
                  icon
                  small
                  @click="$emit('delete-reader', reader._id)"
              >
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
            </v-row>
          </li>
        </ul>
        <div v-else>
          {{ $t('account.spec.materials.no-readers') }}
        </div>
      </v-card>

    </div>
    <ui-default-button
        color="red"
        class="mt-2"
        @click="$emit('delete-material')"
    >
      {{ $t('common.buttons.delete') }}
    </ui-default-button>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview";
import requests from "@/mixins/requests";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton.vue";

export default {
  name: "SpecEditMaterialsDialog",
  components: {
    UiDefaultButton,
    UiDocumentPreview,
    BaseDialog
  },
  mixins: [requests],
  props: {
    value: Boolean,
    material: Object
  }
}
</script>

<style scoped>
.line-left {
  border-left: 3px solid grey
}
</style>