<template>
  <div>
    <spec-add-education-dialog
        :value="addQualificationDialogVisible"
        @close="addQualificationDialogVisible = false"
        @add-education="addEducation"
    ></spec-add-education-dialog>

    <spec-add-category-dialog
        :value="addCategoryDialogVisible"
        @close="addCategoryDialogVisible = false"
        @set-category="setCategory"
    ></spec-add-category-dialog>

    <account-base-layout
        :preview-title="$t('account.spec.qualification.section-name')"
        :preview-image="require('@/assets/images/account/qualification.png')"
    >
      <div>
        <div class="text-h6 font-weight-bold font-title comfortaa">
          {{ $t('account.spec.qualification.education') }}
        </div>
        <div class="text-caption mt-n1 grey--text text--darken-2 mb-2 sans">
          {{ $t('account.spec.qualification.education-description') }}
        </div>

        <account-base-chips
            :chips="[{name: $t('account.spec.qualification.total-institutes-chip'), value: education.length}]">

          <ui-confirm-button
              class="ma-1 ma-sm-0"
              :disabled="education.length >= 5"
              @click="addQualificationDialogVisible = true"
          >
            {{ $t('common.buttons.add') }}
          </ui-confirm-button>

        </account-base-chips>


        <spec-education-card
            class="pa-2 mb-3"
            v-for="educ in education"
            :key="educ._id"
            :id="educ._id"
            :documents="educ.documents"
            :approve="educ.approve"
            :graduation="educ.graduation"
            :institution="educ.institution"
            :watched="educ.watched"
            @delete-educ="delEducation(educ._id)"
        ></spec-education-card>

      </div>

      <div>
        <h4 class="text-h6 font-weight-bold comfortaa">{{ $t('account.spec.qualification.category') }}</h4>

        <p class="text-caption mt-n1 grey--text text--darken-2 mb-2 sans">
          {{ $t('account.spec.qualification.category-description') }}
        </p>

        <ui-confirm-button @click="addCategoryDialogVisible = true">
          {{ $t('common.buttons.upload') }}
        </ui-confirm-button>

        <spec-category-card
            class="pa-2 mt-3"
            v-if="category.name"
            :name="category.name"
            :approve="category.approve"
            :documents="category.documents"
        ></spec-category-card>
      </div>

    </account-base-layout>

  </div>

</template>

<script>
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import requests from "@/mixins/requests";
import SpecAddEducationDialog from "@/components/Specialized/Account/Spec/QualificationTab/SpecAddEducationDialog";
import SpecAddCategoryDialog from "@/components/Specialized/Account/Spec/QualificationTab/SpecAddCategoryDialog";
import SpecEducationCard from "@/components/Specialized/Account/Spec/QualificationTab/SpecEducationCard";
import SpecCategoryCard from "@/components/Specialized/Account/Spec/QualificationTab/SpecCategoryCard";
import AccountBaseLayout from "@/components/Specialized/Account/AccountBaseLayout.vue";
import AccountBaseChips from "@/components/Specialized/Account/AccountBaseChips.vue";

export default {
  name: "SpecQualificationTab",
  components: {
    AccountBaseChips,
    AccountBaseLayout,
    SpecCategoryCard,
    SpecEducationCard,
    SpecAddCategoryDialog,
    SpecAddEducationDialog,
    UiConfirmButton,
  },
  mixins: [requests],
  data() {
    return {
      category: {},
      education: [],
      addQualificationDialogVisible: false,
      addCategoryDialogVisible: false
    }
  },
  mounted() {
    this.getCategory()
    this.getEducation()
  },
  methods: {
    getCategory() {
      this.getDataAuthed('spec/qualification/getCategory', {handleError: true})
          .then(resp => {
            this.category = resp.data
          })
          .catch(() => {
          })
    },
    getEducation() {
      this.getDataAuthed('spec/qualification/getEducation', {handleError: true})
          .then(resp => {
            this.education = resp.data
          })
          .catch(() => {
          })
    },
    delEducation(id) {
      this.$root.$emit('show-confirm', {text: this.$t('account.spec.qualification.delete-education-confirm')})
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delDataAuthed(`spec/qualification/delEducation?institutionId=${id}`,
              {
                handleError: true,
                handleSuccess: true,
                successMessage: this.$t('account.spec.qualification.delete-education-success')
              }
          )
              .then(() => {
                this.education = this.education.filter(educ => educ._id !== id)
              })
              .catch(() => {
              })
        }
      })
    },
    setCategory(name, documents) {
      this.postDataAuthed('/spec/qualification/setCategory',
          {
            name,
            documents
          },
          {
            handleError: true,
            handleSuccess: true,
            successMessage: this.$t('account.spec.qualification.edit-category-success')
          }
      )
          .then(() => {
            this.category = {}
            this.getCategory()
          })
          .catch(() => {
          })
          .finally(() => {
            this.addCategoryDialogVisible = false
          })
    },
    addEducation(institution, graduation, documents) {
      this.postDataAuthed('/spec/qualification/addEducation',
          {
            institution,
            graduation,
            documents
          },
          {
            handleError: true,
            handleSuccess: true,
            successMessage: this.$t('account.spec.qualification.add-education-success')
          }
      )
          .then(() => {
            this.education = []
            this.getEducation()
          })
          .catch(() => {
          })
          .finally(() => {
            this.addQualificationDialogVisible = false
          })
    }
  },
  metaInfo() {
    return {
      title: this.$t('account.spec.qualification.section-name')
    }
  }
}
</script>

<style scoped>

</style>