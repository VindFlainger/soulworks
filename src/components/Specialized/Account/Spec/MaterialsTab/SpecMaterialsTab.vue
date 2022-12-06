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

        <div v-if="materials.length">
          <spec-materials-list :materials="materials"
                               @delete-material="deleteMaterial"
                               @delete-reader="deleteReader"
                               @add-reader="addReader"
          ></spec-materials-list>

          <ui-pagination :length="Math.ceil(totalCount/limit)"
                         :value="page"
                         @input="getMaterials"
          ></ui-pagination>
        </div>

        <ui-fullscreen-no-content-banner v-else :to="{path: '*'}">
          <span class="text-center fs-20 font-weight-medium">
            Вы еще не добавили материалы!
          </span>
          <span class="text-center fs-14" style="max-width: 500px">
            Добавляйте свои уникальные материалы и делитесь им со своими клиентами или другими пользователями
          </span>
        </ui-fullscreen-no-content-banner>

      </div>


    </v-card>

    <spec-add-materials-dialog :value="addMaterialDialogVisible"
                               @close="addMaterialDialogVisible = false"
                               @add-material="addMaterial"
    ></spec-add-materials-dialog>
  </div>

</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import UiPagination from "@/components/UI/UiPagination";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import requests from "@/mixins/requests";
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import SpecMaterialsList from "@/components/Specialized/Account/Spec/MaterialsTab/SpecMaterialsList";
import SpecAddMaterialsDialog from "@/components/Specialized/Account/Spec/MaterialsTab/SpecAddMaterialsDialog";

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
          .catch()
    },
    deleteMaterial(materialId) {
      this.$root.$emit('show-confirm', {
        text: 'Вы действительно хотите удалить данный материал? Удаление материала сделает его недоступным для всех читателей.'
      })
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delData(`http://localhost:3000/spec/materials?materialId=${materialId}`)
              .then(() => {
                this.$root.$emit('push-message', {text: 'Материал успешно удален', type: 'success'})
                this.getMaterials(1)
              })
              .catch()
        }
      })
    },
    addMaterial(data) {
      this.putData('http://localhost:3000/spec/materials', data)
          .then(() => {
            this.$root.$emit('push-message', {text: 'Материал успешно добавлен', type: 'success'})
            this.getMaterials(1)
            this.addMaterialDialogVisible = false
          })
          .catch()
    },
    deleteReader({materialId, readerId}) {
      this.delData(`http://localhost:3000/spec/materials/reader?materialId=${materialId}&readerId=${readerId}`)
          .then(() => {
            const i = this.materials.findIndex(material => material._id === materialId)
            this.materials[i].readers = this.materials[i].readers.filter(reader => reader._id !== readerId)
            this.$root.$emit('push-message', {text: 'Читатель успешно удален', type: 'success'})
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
                  this.$root.$emit('push-message', {text: 'Читатель успешно добавлен', type: 'success'})
                }
              })
              .catch()
        }
      })
    }
  },
  components: {
    SpecAddMaterialsDialog,
    SpecMaterialsList,
    UiFullscreenNoContentBanner,
    UiConfirmButton,
    UiPagination,
    UiFullWidthBanner
  },
  mounted() {
    this.getMaterials(1)
  },
  mixins: [requests]
}
</script>

<style scoped>

</style>