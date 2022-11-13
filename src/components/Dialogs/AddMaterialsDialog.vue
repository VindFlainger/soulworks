<template>
  <base-dialog :value="value" @close="$emit('close')" max-width="500">
    <v-form lazy-validation ref="form" v-model="valid">

      <v-row>
        <default-input label="Название" maxlength="30" v-model="name"></default-input>
        <easy-photo-input class="ml-3" v-model="previewImage"></easy-photo-input>
      </v-row>

      <text-area-input counter="250" maxlength="250" label="Описание" v-model="description"
                       :required="false"></text-area-input>

      <file-input
          :accept="['docx', 'doc', 'rtf', 'tif', 'bmp', 'ppt', 'pptx', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xls', 'xlsx']"
          :loading.sync="fileLoading"
          :max-size="2000000"
          @input="files = $event"
          ref="fileInput">
      </file-input>

      <v-row class="mt-2">
        <ui-default-button @click="$emit('close')">
          Отмена
        </ui-default-button>
        <v-spacer></v-spacer>
        <ui-confirm-button @click="addMaterials" :disabled="!valid || fileLoading || !files.length">
          Загрузить
        </ui-confirm-button>
      </v-row>
    </v-form>
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

const axios = require('axios').default

export default {
  name: "AddMaterialsDialog",
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
  props: {
    value: Boolean,
  },
  methods: {
    addMaterials() {
      if (this.$refs.form.validate()) {
        axios.put('http://localhost:3000/spec/materials', {
          name: this.name,
          description: this.description,
          documents: this.files.map(file => file.id),
          previewImage: this.previewImage
        })
            .then(() => {
              if (this.$refs.fileInput.isReady())
                this.$emit('updated')
            })
            .catch()
      }

    }
  },
  components: {EasyPhotoInput, TextAreaInput, FileInput, UiDefaultButton, UiConfirmButton, DefaultInput, BaseDialog},
}
</script>

<style scoped>

</style>