<template>
  <div>
    <spec-add-education-dialog :value="addQualificationDialogVisible"
                               @close="addQualificationDialogVisible = false"
                               @updated="getEducation(); addQualificationDialogVisible = false"
    ></spec-add-education-dialog>

    <spec-add-category-dialog :value="addCategoryDialogVisible"
                              @close="addCategoryDialogVisible = false"
                              @updated="getCategory(); addCategoryDialogVisible = false"
    ></spec-add-category-dialog>

    <v-card class="pa-4" elevation="0">
      <ui-full-width-banner :img="require('@/assets/images/account/qualification.png')">
        <div class="fill-height d-flex align-center justify-center">
          <div class="font-title pa-5 rounded"
               style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px">
            Квалификация
          </div>
        </div>
      </ui-full-width-banner>
      <div class="mt-3">

        <div>
          <div class="fs-18 font-weight-bold font-title">Образование</div>
          <div class="fs-12 mt-n1 grey--text text--darken-2 mb-2">
            Каждое указанное учебное заведение подтверждается отдельно по прикрепленным документам. Максимальное
            количество учреждений образования - 5. В случае отказа на Вашу почту будет отправлено письмо с указанием
            причины.
          </div>

          <v-row class="pa-2 ma-1 mb-3 bordered">
            <v-chip>Всего учебных заведений:<span class="font-weight-bold ml-1">{{ education.length }}</span></v-chip>
            <v-chip class="ml-4">Подтверждено:<span
                class="font-weight-bold ml-1">{{ education.filter(educ => educ.approve).length }}</span></v-chip>
            <v-spacer></v-spacer>
            <ui-confirm-button @click="addQualificationDialogVisible = true" :disabled="education.length >= 5">
              Добавить
            </ui-confirm-button>
          </v-row>

          <spec-education-card v-for="educ in education"
                               :key="educ._id"
                               :id="educ._id"
                               :documents="educ.documents"
                               :approve="educ.approve"
                               :graduation="educ.graduation"
                               :institution="educ.institution"
                               :watched="educ.watched"
                               @delete-educ="delEducation(educ._id)"
                               class="pa-2 ma-1 mb-3"
          ></spec-education-card>


        </div>

        <v-col>
          <div class="fs-18 font-weight-bold font-title">Категория</div>
          <div class="fs-12 mt-n1 grey--text text--darken-2 mb-2">
            После добавления новой квалификации Вам необходимо дождаться ее подтверждения. В случае отказа на Вашу почту
            будет отправлено письмо с указанием причины.
            <span
                class="font-weight-bold">После загрузки данных о новой квалификации подтверждение текущей будет потеряно.
          </span>
          </div>
          <ui-confirm-button @click="addCategoryDialogVisible = true">Загрузить</ui-confirm-button>

          <spec-category-card v-if="category.name"
                              :name="category.name"
                              :approve="category.approve"
                              :documents="category.documents"
                              class="pa-2 mt-3"
          ></spec-category-card>


        </v-col>

      </div>
    </v-card>

  </div>

</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import requests from "@/mixins/requests";
import SpecAddEducationDialog from "@/components/Account/Spec/QualificationTab/SpecAddEducationDialog";
import SpecAddCategoryDialog from "@/components/Account/Spec/QualificationTab/SpecAddCategoryDialog";
import SpecEducationCard from "@/components/Account/Spec/QualificationTab/SpecEducationCard";
import SpecCategoryCard from "@/components/Account/Spec/QualificationTab/SpecCategoryCard";

export default {
  name: "SpecQualificationTab",
  data() {
    return {
      category: {},
      education: [],
      addQualificationDialogVisible: false,
      addCategoryDialogVisible: false
    }
  },
  methods: {
    getCategory() {
      this.getData('http://localhost:3000/spec/qualification/category')
          .then(resp => {
            this.category = resp.data
          })
          .catch()
    },
    getEducation() {
      this.getData('http://localhost:3000/spec/qualification/education')
          .then(resp => {
            this.education = resp.data
          })
          .catch()
    },
    delEducation(id) {
      this.$root.$emit('show-confirm', {text: 'Информация о данном учреждении образования будет удалена, а ее подтверждение аннулируется'})
      this.$root.$once('close-confirm', v => {
        if (v) {
          this.delData(`http://localhost:3000/spec/qualification/education?id=${id}`)
              .then(() => {
                this.education = this.education.filter(educ => educ._id !== id)
                this.$root.$emit('push-message', {
                  text: 'Учреждение образования успешно удалено',
                  type: 'success',
                  time: 2000
                })
              })
        }
      })
    },
  },
  mixins: [requests],
  components: {
    SpecCategoryCard,
    SpecEducationCard,
    SpecAddCategoryDialog,
    SpecAddEducationDialog,
    UiConfirmButton,
    UiFullWidthBanner
  },
  mounted() {
    this.getCategory()
    this.getEducation()
  },
}
</script>

<style scoped>

</style>