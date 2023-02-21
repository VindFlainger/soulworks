<template>
  <div>
    <spec-add-materials-dialog
        :value="addMaterialDialogVisible"
        @close="addMaterialDialogVisible = false"
        @add-material="addMaterial"
    ></spec-add-materials-dialog>


    <account-base-layout
        :preview-title="$t('account.spec.materials.section-name')"
        :preview-image="require('@/assets/images/account/materials.png')"
    >

      <account-base-chips :chips="[{name: $t('account.spec.materials.total-materials'), value: totalCount}]">
        <ui-confirm-button
            class="ma-1 ma-sm-0"
            @click="addMaterialDialogVisible = true"
        >
          {{ $t('account.spec.materials.add-material') }}
        </ui-confirm-button>
      </account-base-chips>


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

      <ui-fullscreen-no-content-banner
          v-else
          :title="$t('account.spec.materials.no-materials-title')"
          :caption="$t('account.spec.materials.no-materials-caption')"
      ></ui-fullscreen-no-content-banner>

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
import AccountBaseChips from "@/components/Specialized/Account/AccountBaseChips.vue";

export default {
  name: "SpecMaterialsTab",
  components: {
    AccountBaseChips,
    AccountBaseLayout,
    SpecAddMaterialsDialog,
    SpecMaterialsList,
    UiFullscreenNoContentBanner,
    UiConfirmButton,
    UiPagination,
  },
  mixins: [requests],
  data() {
    return {
      materials: [],
      page: 1,
      limit: 5,
      totalCount: 0,
      addMaterialDialogVisible: false
    }
  },
  mounted() {
    this.getMaterials(1)
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
        text: this.$t('account.spec.materials.delete-material-confirm')
      })
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delDataAuthed(`spec/materials/delMaterial?materialId=${materialId}`,
              {
                handleError: true,
                handleSuccess: true,
                successMessage: this.$t('account.spec.materials.delete-material-confirm')
              })
              .then(() => this.getMaterials(1))
              .catch(() => {
              })
        }
      })
    },
    addMaterial(data) {
      this.postDataAuthed('spec/materials/addMaterial',
          data,
          {
            handleError: true,
            handleSuccess: true,
            successMessage: this.$t('account.spec.materials.add-material-success')
          })
          .then(() => {
            this.getMaterials(1)
            this.addMaterialDialogVisible = false
          })
          .catch(() => {
          })
    },
    deleteReader({materialId, readerId}) {
      this.delDataAuthed(`spec/materials/delReader?materialId=${materialId}&readerId=${readerId}`,
          {
            handleError: true,
            handleSuccess: true,
            successMessage: this.$t('account.spec.materials.delete-reader-success')
          })
          .then(() => {
            const i = this.materials.findIndex(material => material._id === materialId)
            this.materials[i].readers = this.materials[i].readers.filter(reader => reader._id !== readerId)
          })
          .catch(() => {
          })
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
                successMessage: this.$t('account.spec.materials.add-reader-success')
              }
          )
              .then(() => {
                this.materials.find(material => material._id === materialId).readers.push(user)
              })
              .catch(() => {
              })
        }
      })
    }
  },
  metaInfo() {
    return {
      title: this.$t('account.spec.materials.section-name')
    }
  }
}
</script>

<style scoped>

</style>