<template>
  <base-dialog :value="value" max-width="550" @close="$emit('close')">
    <div v-if="value && material">

      <div class="font-weight-medium text-title fs-22 font-title ">{{ material.name }}</div>

      <div class="fs-14 text-title pl-1 grey--text text--darken-2" style="border-left: 3px solid grey">
        {{ material.description }}
      </div>

      <v-row class="mt-3">
        <ui-document-preview v-for="document in material.documents"
                             :key="document._id"
                             :url="document.url"
                             :name="document.name"
                             class="ma-1"
        >

        </ui-document-preview>
      </v-row>


      <div class="font-weight-bold mt-3 fs-20">
        Читатели
      </div>



      <div>
        <ul v-if="material.readers.length" class="ml-2">
          <li v-for="reader in material.readers" :key="reader._id" class="fs-18">
            {{ reader.surname }} {{ reader.name }} ({{ reader._id }})
            <v-btn icon small @click="$emit('delete-reader', reader._id)">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </li>
        </ul>
        <div v-else>
          Вы еще не добавили читателей
        </div>
      </div>


    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview";
import requests from "@/mixins/requests";

export default {
  name: "SpecEditMaterialsDialog",
  props: {
    value: Boolean,
    material: Object
  },
  components: {UiDocumentPreview, BaseDialog},
  mixins: [requests]

}
</script>

<style scoped>

</style>