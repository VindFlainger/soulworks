<template>
  <v-row class="bordered" align="center">

    <div style="max-width: 300px">
      <div class="font-weight-medium">
        {{ $t('account.spec.qualification.name') }}:
        <span class="font-weight-light">
          {{ name }}
        </span>
      </div>

      <div class="font-weight-medium">
        {{ $t('account.spec.qualification.status') }}:
        <span
            class="font-weight-light"
            :class="{'green--text':approve, 'red--text': !approve}"
        >
          {{ approve ? $t('account.spec.qualification.confirm') : $t('account.spec.qualification.not-confirm') }}
        </span>
      </div>
    </div>

    <v-row class="col-12 col-sm-auto ml-sm-3">
      <ui-document-preview
          v-for="document in documents"
          :key="document.id"
          :name="document.name"
          :max-width="viewportHook({base: 60, md: 90})"
          :url="document.url"
      ></ui-document-preview>
    </v-row>

  </v-row>
</template>

<script>
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview";

export default {
  name: "SpecCategoryCard",
  components: {UiDocumentPreview},
  props: {
    name: {
      type: String,
      required: true
    },
    approve: {
      type: Boolean,
      default: false,
    },
    documents: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>