<template>
  <div>
    <spec-add-materials-dialog
        :value="addMaterialDialogVisible"
        @close="addMaterialDialogVisible = false"
        @add-material="addMaterial"
    ></spec-add-materials-dialog>


    <account-base-layout
        preview-title="ваши материалы"
        :preview-image="require('@/assets/images/account/materials.png')"
    >

      <v-row class="pa-2" style="border-radius: 15px; border: 1px solid black" align="center">
        <v-chip class="ma-1 ma-sm-0">Всего материалов: <span class="font-weight-bold ml-1">{{ totalCount }}</span></v-chip>
        <v-spacer></v-spacer>
        <ui-confirm-button @click="addMaterialDialogVisible = true" class="ma-1 ma-sm-0">Добавить материал</ui-confirm-button>
      </v-row>

      <div v-if="materials.length">
        <spec-materials-list
            :materials="materials"
            @delete-material="deleteMaterial"
            @delete-reader="deleteReader"
            @add-reader="addReader"
        ></spec-materials-list>

        <ui-pagination
            :length="Math.ceil(totalCount/limit)"
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

    </account-base-layout>

  </div>
</template>

<script>
import UiPagination from "@/components/UI/UiPagination";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import requests from "@/mixins/requests";
import UiFullscreenNoContentBanner from "@/components/UI/UiFullscreenNoContentBanner";
import SpecMaterialsList from "@/components/Specialized/Account/Spec/MaterialsTab/SpecMaterialsList";
import SpecAddMaterialsDialog from "@/components/Specialized/Account/Spec/MaterialsTab/SpecAddMaterialsDialog";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";

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
      this.getDataAuthed(`spec/materials/getMaterials?limit=${this.limit}&offset=${(page - 1) * this.limit}`, {
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
          this.delDataAuthed(`spec/materials/delMaterial?materialId=${materialId}`,
              {
                handleError: true,
                handleSuccess: true,
                successMessage: 'Материал успешно удален'
              })
              .then(() => this.getMaterials(1))
              .catch()
        }
      })
    },
    addMaterial(data) {
      this.postDataAuthed('spec/materials/addMaterial',
          data,
          {
            handleError: true,
            handleSuccess: true,
            successMessage: 'Материал успешно добавлен'
          })
          .then(() => {
            this.getMaterials(1)
            this.addMaterialDialogVisible = false
          })
          .catch()
    },
    deleteReader({materialId, readerId}) {
      this.delDataAuthed(`spec/materials/delReader?materialId=${materialId}&readerId=${readerId}`,
          {
            handleError: true,
            handleSuccess: true,
            successMessage: 'Читатель успешно удален'
          })
          .then(() => {
            const i = this.materials.findIndex(material => material._id === materialId)
            this.materials[i].readers = this.materials[i].readers.filter(reader => reader._id !== readerId)
          })
          .catch()
    },
    addReader(materialId) {
      this.$root.$emit('show-find-user')
      this.$root.$once('close-find-user', user => {
        if (user) {
          this.postDataAuthed(`spec/materials/addReader`,
              {
                materialId,
                readerId: user._id
              },
              {
                handleError: true,
                handleSuccess: true,
                successMessage: 'Читатель успешно удален'
              }
          )
              .then(() => {
                this.materials.find(material => material._id === materialId).readers.push(user)
              })
              .catch()
        }
      })
    }
  },
  components: {
    AccountBaseLayout,
    SpecAddMaterialsDialog,
    SpecMaterialsList,
    UiFullscreenNoContentBanner,
    UiConfirmButton,
    UiPagination,
  },
  mounted() {
    this.getMaterials(1)
  },
  mixins: [requests],
  metaInfo: {
    title: 'Материалы'
  }
}
</script>

<style scoped>

</style>