<template>
  <div>
    <spec-material-card
        v-for="material in materials"
        :key="material._id"
        :name="material.name"
        :description="material.description"
        :id="material._id"
        :documents="material.documents"
        :preview-img="material.previewImage?.url"
        :date="material.date"
        :readers="material.readers"
        class="mr-3 ml-3 mt-8"
        @show-material="material_ = material"
        @delete-material="$emit('delete-material', material._id)"
        @add-reader="addReader(material._id)"
    >
    </spec-material-card>

    <spec-edit-materials-dialog :value="!!material_"
                           @close="material_ = null"
                           @delete-reader="deleteReader(material_._id, $event)"
                           :material="material_"
    ></spec-edit-materials-dialog>
  </div>
</template>

<script>
import requests from "@/mixins/requests";
import SpecMaterialCard from "@/components/Specialized/Account/Spec/MaterialsTab/SpecMaterialCard";
import SpecEditMaterialsDialog from "@/components/Specialized/Account/Spec/MaterialsTab/SpecEditMaterialsDialog";

export default {
  name: "SpecMaterialsList",
  data() {
    return {
      material_: null,
    }
  },
  components: {SpecEditMaterialsDialog, SpecMaterialCard},
  props: {
    materials: Array
  },
  methods: {
    deleteReader(materialId, readerId) {
      this.$emit('delete-reader', {materialId, readerId})
    },
    addReader(materialId) {
      this.$emit('add-reader', materialId)
    },
  },
  mixins: [requests]
}
</script>

<style scoped>

</style>