<template>
  <base-dialog :value="value" @close="$emit('close')" max-width="690">
    <div v-if="value">
      <v-row>
        <date-input v-model="graduation"></date-input>
        <v-col>
          <v-form v-model="valid" ref="form">
            <default-input label="Учреждение" v-model="institution"
                           :rules="[v => /^[0-9a-zA-ZА-я=!@# %^*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']">
            </default-input>
            <default-input label="Дата выпуска" :value="graduation" disabled></default-input>
            <file-input
                :accept="['docx', 'doc', 'rtf', 'tif', 'bmp', 'ppt', 'pptx', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xls', 'xlsx']"
                :loading.sync="fileLoading"
                :max-size="10000000"
                :max-files="3"
                @input="files = $event"
                ref="fileInput">
            </file-input>
          </v-form>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <ui-default-button @click="$emit('close')">
          Отмена
        </ui-default-button>
        <v-spacer></v-spacer>
        <ui-confirm-button @click="addEducation" :disabled="!valid || fileLoading || !files.length">
          Загрузить
        </ui-confirm-button>
      </v-row>
    </div>
  </base-dialog>


</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import FileInput from "@/components/UI/Inputs/FileInput";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import DateInput from "@/components/UI/Inputs/DateInput";
import requests from "@/mixins/requests";

export default {
  name: "SpecAddEducationDialog",
  components: {DateInput, UiConfirmButton, UiDefaultButton, FileInput, DefaultInput, BaseDialog},
  data() {
    return {
      fileLoading: false,
      files: [],
      graduation: this.$moment().toISOString().substring(0, 10),
      valid: true,
      institution: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addEducation() {
      this.putData('http://localhost:3000/spec/qualification/education', {
        institution: this.institution,
        graduation: new Date(this.graduation).getTime(),
        documents: this.files.map(file => file.id)
      })
          .then(() => {
            this.$root.$emit('push-message', {text: 'Учреждение образования успешно добавлено', type: 'success', time: 2000})
            this.$emit('updated')
          })
          .catch()
    }
  },
  watch: {
    value(val) {
      if (!val){
        this.graduation = this.$moment().toISOString().substring(0, 10)
        this.files = []
        this.institution = ''
      }
    }
  },
  mixins: [requests]
}
</script>

<style scoped>

</style>
