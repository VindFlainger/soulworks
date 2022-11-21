<template>
  <base-dialog :value="value" @close="$emit('close')" max-width="330">
    <div v-if="value">
      <v-row>
        <v-col>
          <v-form v-model="valid" ref="form">
            <default-input label="Категория" v-model="category"
                           :rules="[v => /^[0-9a-zA-ZА-я=!@# %^*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']">
            </default-input>
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
        <ui-confirm-button @click="addCategory" :disabled="!valid || fileLoading || !files.length">
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
import requests from "@/mixins/requests";

export default {
  name: "SpecAddCategoryDialog",
  data() {
    return {
      fileLoading: false,
      files: [],
      category: '',
      valid: true,
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addCategory() {
      this.putData('http://localhost:3000/spec/qualification/category', {
        name: this.category,
        documents: this.files.map(file => file.id)
      })
          .then(() => {
            this.$root.$emit('push-message', {text: 'Категория успешно добавлена', type: 'success', time: 2000})
            this.$emit('updated')
          })
          .catch()
    }
  },
  watch: {
    value(val) {
      if (!val){
        this.category = ''
        this.files = []
      }
    }
  },
  mixins: [requests],
  components: {UiConfirmButton, UiDefaultButton, FileInput, DefaultInput, BaseDialog},
}
</script>

<style scoped>

</style>