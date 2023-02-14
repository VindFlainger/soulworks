<template>
  <base-dialog
      :value="value"
      max-width="690"
      @close="$emit('close')"
  >
    <div v-if="value" class="pa-1">

      <v-row justify="center">
        <date-input
            class="col-12 col-sm-5"
            :width="viewportHook({base: 250, md: 280})"
            style="max-width: 300px"
            v-model="graduation"
        ></date-input>

        <div class="col-sm-6">
          <v-form
              class="align-center d-flex flex-column"
              ref="form"
              v-model="valid"
          >

            <default-input
                v-model="institution"
                label="Учреждение"
                :rules="[v => /^[0-9a-zA-ZА-я=!@# %^*()&+-,. ]*$/.test(v) || 'Введены запрещенные специальные символы']"
            ></default-input>

            <default-input
                :value="graduation"
                label="Дата выпуска"
                disabled
            ></default-input>

            <file-input
                :accept="['docx', 'doc', 'rtf', 'tif', 'bmp', 'ppt', 'pptx', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xls', 'xlsx']"
                :loading.sync="fileLoading"
                :max-size="10000000"
                :max-files="3"
                @input="files = $event"
                ref="fileInput"
            ></file-input>

          </v-form>
        </div>
      </v-row>


      <v-row class="mt-3">
        <ui-default-button @click="$emit('close')">
          Отмена
        </ui-default-button>

        <v-spacer></v-spacer>

        <ui-confirm-button
            :disabled="!valid || fileLoading || !files.length"
            @click="$emit('add-education', institution, graduation, files.map(file => file.id))"
        >
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
  components: {
    DateInput,
    UiConfirmButton,
    UiDefaultButton,
    FileInput,
    DefaultInput,
    BaseDialog
  },
  mixins: [requests],
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      fileLoading: false,
      files: [],
      graduation: this.$moment().toISOString().substring(0, 10),
      valid: true,
      institution: ''
    }
  },
  watch: {
    value(val) {
      if (!val) {
        this.graduation = this.$moment().toISOString().substring(0, 10)
        this.files = []
        this.institution = ''
      }
    }
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
}
</style>
