<template>
  <div>
    <materials-card
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
    </materials-card>
    <edit-materials-dialog :value="!!material_"
                           @close="material_ = null"
                           @delete-reader="deleteReader(material_._id, $event)"
                           :material="material_"
    >
    </edit-materials-dialog>
  </div>
</template>

<script>
import MaterialsCard from "@/components/Account/Spec/MaterialsTab/MaterialsCard";
import EditMaterialsDialog from "@/components/Dialogs/EditMaterialsDialog";

export default {
  name: "MaterialsList",
  data() {
    return {
      material_: null,
    }
  },
  components: {EditMaterialsDialog, MaterialsCard},
  props: {
    materials: Array
  },
  methods: {
    deleteReader(materialId, readerId) {
      this.delData(`http://localhost:3000/spec/materials/reader?materialId=${materialId}&readerId=${readerId}`)
          .then(() => {
            this.material_.readers = this.material_.readers.filter(reader => reader.id !== readerId)
          })
          .catch()
    },
    addReader(materialId) {
      this.$root.$emit('show-find-user')
      this.$root.$once('close-find-user', user => {
        if (user) {
          this.putData(`http://localhost:3000/spec/materials/reader`,
              {
                materialId,
                readerId: user._id
              }
          )
              .then(resp => {
                if (resp.data.code !== 3) {
                  this.materials.find(material => material._id === materialId).readers.push(user)
                }
              })
              .catch()
        }
      })
    },
  }
}
</script>

<style scoped>

</style>