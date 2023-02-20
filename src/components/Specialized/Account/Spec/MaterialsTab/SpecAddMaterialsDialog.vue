<template>
  <base-dialog
      :value="value"
      max-width="450"
      @close="$emit('close')"
  >
    <div v-if="value">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >

        <v-row>
          <easy-photo-input
              v-model="previewImage"
          ></easy-photo-input>
          <default-input
              class="ml-1 flex-grow-1"
              v-model="name"
              label="Название"
              maxlength="30"
              content-class="file__button"
              :max-width="320"
              :min-width="220"
          ></default-input>
        </v-row>

        <text-area-input
            v-model="description"
            :required="false"
            counter="250"
            maxlength="250"
            label="Описание"
        ></text-area-input>

        <file-input
            :accept="['docx', 'doc', 'rtf', 'tif', 'bmp', 'ppt', 'pptx', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xls', 'xlsx']"
            :loading.sync="fileLoading"
            :max-size="2000000"
            @input="files = $event"
        ></file-input>

        <v-row class="mt-2">
          <ui-default-button @click="$emit('close')">Отмена</ui-default-button>

          <v-spacer></v-spacer>

          <ui-confirm-button
              :disabled="!valid || fileLoading || !files.length"
              @click="addMaterial"
          >
            Загрузить
          </ui-confirm-button>
        </v-row>
      </v-form>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import FileInput from "@/components/UI/Inputs/FileInput";
import TextAreaInput from "@/components/UI/Inputs/TextAreaInput";
import EasyPhotoInput from "@/components/UI/Inputs/EasyPhotoInput";
import requests from "@/mixins/requests";


export default {
  name: "SpecAddMaterialsDialog",
  components: {
    EasyPhotoInput,
    TextAreaInput,
    FileInput,
    UiDefaultButton,
    UiConfirmButton,
    DefaultInput,
    BaseDialog
  },
  mixins: [requests],
  props: {
    value: Boolean,
  },
  data() {
    return {
      name: '',
      description: '',
      files: [],
      valid: true,
      fileLoading: false,
      previewImage: undefined
    }
  },
  methods: {
    addMaterial() {
      if (this.$refs.form.validate()) {
        this.$emit('add-material', {
          name: this.name,
          description: this.description,
          documents: this.files.map(file => file.id),
          previewImage: this.previewImage
        })
      }
    }
  },
  watch: {
    value(val) {
      if (!val) {
        this.name = ''
        this.description = ''
        this.files = []
        this.valid = true
        this.fileLoading = false
        this.previewImage = undefined
      }
    }
  },
}
</script>

<style scoped>
.file__button{
  width: 200px;
}
</style>