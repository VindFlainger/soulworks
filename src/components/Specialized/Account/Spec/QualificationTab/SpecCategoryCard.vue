<template>
  <v-row class="bordered" align="center">

    <div style="max-width: 300px">

      <div class="font-weight-medium">Название:
        <span class="font-weight-light">
          {{ name }}
        </span>
      </div>

      <div class="font-weight-medium">Статус:
        <span
            class="font-weight-light"
            :class="{'green--text':approve, 'red--text': !approve}"
        >
          {{ approve ? 'Подтверждена' : 'Не подтверждена' }}
        </span>
      </div>

    </div>

    <v-col>
      <v-row>
        <ui-document-preview
            v-for="document in documents"
            :key="document.id"
            :name="document.name"
            :url="document.url"
        ></ui-document-preview>
      </v-row>
    </v-col>


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