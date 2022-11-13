<template>
  <div>
    <v-card class="pa-4" elevation="0">
      <ui-full-width-banner :img="require('@/assets/images/account/materials.png')">
        <div class="fill-height d-flex align-center justify-center">
          <div class="font-title pa-5 rounded"
               style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px">
            Ваши материалы
          </div>
        </div>
      </ui-full-width-banner>


      <div class="mt-3">
        <v-row class="pa-2" style="border-radius: 15px; border: 1px solid black" align="center">
          <v-chip>Всего материалов: <span class="font-weight-bold ml-1">{{ totalCount }}</span></v-chip>
          <v-spacer></v-spacer>
          <ui-confirm-button @click="addMaterialDialogVisible = true">Добавить материал</ui-confirm-button>
        </v-row>

        <materials-list :materials="materials" @delete-material="deleteMaterial($event)"></materials-list>
        <ui-pagination :length="Math.ceil(totalCount/limit)" :value="page" @input="getMaterials($event)"></ui-pagination>
      </div>




    </v-card>

    <add-materials-dialog :value="addMaterialDialogVisible"
                          @close="addMaterialDialogVisible = false"
                          @updated="$router.go(0);addMaterialDialogVisible = false"

    >

    </add-materials-dialog>
  </div>

</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import MaterialsList from "@/components/Account/Spec/MaterialsTab/MaterialsList";
import UiPagination from "@/components/UI/UiPagination";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import AddMaterialsDialog from "@/components/Dialogs/AddMaterialsDialog";

export default {
  name: "SpecMaterialsTab",
  data() {
    return {
      materials: [],
      page: 1,
      limit: 5,
      totalCount: 0,
      addMaterialDialogVisible: false
    }

  },
  methods: {
    getMaterials(page) {
      this.$vuetify.goTo(0, {duration: 0})
      this.getData(`http://localhost:3000/spec/materials?limit=${this.limit}&offset=${(page - 1) * this.limit}`, {
        handleErrorResponse: true,
        handleError: true
      })
          .then(resp => {
            this.materials = resp.data.materials
            this.totalCount = resp.data.totalCount
            this.page = page
          })
          .catch(() => {
          })
    },
    deleteMaterial(materialId){
      this.$root.$emit('show-confirm', {
        text: 'Вы действительно хотите удалить данный материал? Удаление материала сделает его недоступным для всех читателей.'
      })
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delData(`http://localhost:3000/spec/materials?materialId=${materialId}`)
              .then(resp => {
                if (resp.data.code !== 3) {
                  this.materials = this.materials.filter(material => material._id !== materialId)
                }
              })
              .catch()
        }
      })
    }
  },
  components: {AddMaterialsDialog, UiConfirmButton, UiPagination, MaterialsList, UiFullWidthBanner},
  mounted() {
    this.getMaterials(1)
  }
}
</script>

<style scoped>

</style>