<template>
  <base-dialog
      :value="value"
      max-width="330"
      @close="$emit('close')"
  >
    <div v-if="value">
      <v-row>
        <v-col>
          <v-form
              ref="form"
              v-model="valid"
          >
            <default-input
                v-model="category"
                :label="$t('account.spec.qualification.category')"
                :rules="[v => /^[0-9a-zA-ZА-я=!@# %^*()&+-,. ]*$/.test(v) || $t('common.validation.unavailable-symbols')]"
            ></default-input>

            <file-input
                :accept="['docx', 'doc', 'rtf', 'tif', 'bmp', 'ppt', 'pptx', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xls', 'xlsx']"
                :loading.sync="fileLoading"
                :max-size="10000000"
                :max-files="3"
                @input="files = $event"
            ></file-input>

          </v-form>
        </v-col>
      </v-row>

      <v-row class="mt-3">
        <ui-default-button @click="$emit('close')">
          Отмена
        </ui-default-button>

        <v-spacer></v-spacer>

        <ui-confirm-button
            :disabled="!valid || fileLoading || !files.length"
            @click="$emit('set-category', category, files.map(el => el.id))"
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
import requests from "@/mixins/requests";

export default {
  name: "SpecAddCategoryDialog",
  components: {
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
      category: '',
      valid: true,
    }
  },
  watch: {
    value(val) {
      if (!val) {
        this.category = ''
        this.files = []
      }
    }
  },
}
</script>

<style scoped>

</style>