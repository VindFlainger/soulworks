<template>
  <v-row class="bordered" align="center">

    <div style="width: 350px">
      <div class="font-weight-medium">Учреждение:
        <span class="font-weight-light">
          {{ institution }}
        </span>
      </div>

      <div class="font-weight-medium">Год выпуска:
        <span class="font-weight-light">
          {{ $moment(graduation).format('y') }}
        </span>
      </div>

      <div class="font-weight-medium">Статус:
        <span :class="{'green--text': approve, 'red--text': !approve}" class="font-weight-light">
          {{ approve ? 'Подтверждена' : 'Не подтверждена' }}
        </span>
      </div>

      <div class="font-weight-medium">Дата рассмотрения:
        <span :class="{'green--text': approve, 'indigo--text': !approve}" class="font-weight-light">
          {{ watched ? $moment(watched).format('lll') : 'В рассмотрении' }}
        </span>
      </div>
    </div>

    <v-row>
      <ui-document-preview v-for="document in documents"
                           :key="document.file"
                           :name="document.name"
                           :url="document.url"
      ></ui-document-preview>
    </v-row>

    <ui-cross-button @click="$emit('delete-educ', id)"></ui-cross-button>

  </v-row>
</template>

<script>
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview";
import UiCrossButton from "@/components/UI/Buttons/UiCrossButton";

export default {
  name: "SpecEducationCard",
  props: {
    id: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    graduation: {
      type: Number,
      required: true
    },
    approve: {
      type: Boolean,
      default: false
    },
    watched: {
      type: Number,
      default: 0
    },
    documents: {
      type: Array,
      required: true
    }
  },
  components: {UiCrossButton, UiDocumentPreview}
}
</script>

<style scoped>

</style>