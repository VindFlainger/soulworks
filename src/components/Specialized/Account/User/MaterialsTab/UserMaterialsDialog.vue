<template>
  <base-dialog
      @close="$emit('close')"
      :value="value"
      :max-width="viewportHook({base: 400, md: 600, lg: 700})"
      background
  >
    <h3 class="afs-40-20 font-weight-bold"> {{name}}</h3>
    <div>
      <p>
        {{description}}
      </p>
      <v-row justify="center" justify-sm="start">
        <ui-document-preview
            class="ma-1"
            v-for="document in documents"
            :key="document.id"
            :url="document.url"
            :name="document.name"
        ></ui-document-preview>
      </v-row>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog.vue";
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview.vue";

export default {
  name: "UserMaterialsDialog",
  components: {UiDocumentPreview, BaseDialog},
  props: {
    value: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    description: {
     type: String,
    },
    documents: {
      type: Array,
    },
    createdDate: {
      type: String,
    },
  }
}
</script>

<style scoped>

</style>