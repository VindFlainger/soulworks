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
        preview-title="квалификация"
        :preview-image="require('@/assets/images/account/qualification.png')"
    >
      <div>
        <div class="text-h6 font-weight-bold font-title comfortaa">Образование</div>
        <div class="text-caption mt-n1 grey--text text--darken-2 mb-2 sans">
          Каждое указанное учебное заведение подтверждается отдельно по прикрепленным документам. Максимальное
          количество учреждений образования - 5. В случае отказа на Вашу почту будет отправлено письмо с указанием
          причины.
        </div>

        <account-base-chips :chips="[{name: 'Всего учебных заведений:', value: education.length}]">

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
        <h4 class="text-h6 font-weight-bold comfortaa">Категория</h4>

        <p class="text-caption mt-n1 grey--text text--darken-2 mb-2 sans">
          После добавления новой квалификации Вам необходимо дождаться ее подтверждения. В случае отказа на Вашу почту
          будет отправлено письмо с указанием причины.
          <span class="font-weight-bold">
            После загрузки данных о новой квалификации подтверждение текущей будет потеряно.
          </span>
        </p>

        <ui-confirm-button @click="addCategoryDialogVisible = true">Загрузить</ui-confirm-button>

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
      this.$root.$emit('show-confirm', {text: 'Информация о данном учреждении образования будет удалена, а ее подтверждение аннулируется'})
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delDataAuthed(`spec/qualification/delEducation?institutionId=${id}`,
              {
                handleError: true,
                handleSuccess: true,
                successMessage: 'сведения об учебном заведении успешно удалены'
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
            successMessage: 'категория успешно изменена'
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
            successMessage: 'учреждение образования успешно добавлено'
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
  metaInfo: {
    title: 'Квалификация'
  }
}
</script>

<style scoped>

</style>