<template>
  <div>
    <div class="file-input"
         :class="{'file-input_putting': draggingOver, 'file-input_error': tooLargeSizeMessageVisible || notAllowedExtensionMessageVisible}"
         @drop.prevent="checkFiles($event.dataTransfer.files)"
         @dragover.prevent
         @dragenter="draggingOver = true"
         @dragleave="draggingOver = false"
         @drop="draggingOver = false"
    >
      <div class="file-input__drop-zone" :class="{'file-input__drop-zone_blocking': draggingOver}">
        <div v-if="!isMobile" class="d-flex flex-column align-center">
          <v-img :src="require('@/assets/images/cloudupload.png')" :max-width="70"></v-img>
          <div class="text-center fs-18 font-weight-bold">
            Перетащите файлы
          </div>
          <div class="text-center fs-14">
            или
          </div>
        </div>
        <label class="file-input__label" :class="{'grey lighten-1': uploadingFiles.length + files.length >= maxFiles}">
          <v-icon color="black" size="26">mdi-upload</v-icon>
          <span class="fs-16">Выберите файлы</span>
          <input @input="checkFiles($event.target.files)"
                 :disabled="uploadingFiles.length + files.length >= maxFiles"
                 :accept="`${accept.length?'.':''}${accept.join(',.')}`"
                 class="d-none" type="file"
          >
        </label>
      </div>

    </div>
    <div class="fs-14 red--text text--darken-3">
      <div v-if="tooLargeSizeMessageVisible">
        <span>{{ tooLargeSizeMessage }}</span>
        Загружаемый файл слишком большой, максимальный размер {{ (this.maxSize / 1000000).toFixed(2) }} MB
        <span></span>
      </div>
      <div v-if="notAllowedExtensionMessageVisible">
        <span>{{ notAllowedExtensionsMessage }}</span>
        <span>Для загрузки доступны только {{ accept.join(', ') }}  форматы.</span>
      </div>
      <div v-if="notAllowedFileCountVisible">
        <span>Максимальное количество файлов {{ maxFiles }}</span>
      </div>
    </div>
    <v-row class="mt-2">
      <ui-document-preview v-for="file in files"
                           :key="file.id"
                           :name="file.name"
                           @clear="files = files.filter(el => el.id !== file.id); $emit('input', files)"
                           clearable
                           class="ma-1"
      >
      </ui-document-preview>
      <ui-document-preview v-for="file in uploadingFiles"
                           :key="file.id"
                           :name="file.name"
                           :unsuccessful="file.error"
                           @refresh="uploadingFiles = uploadingFiles.filter(el => el.id !== file.id); addFiles([file.data])"
                           @clear="uploadingFiles = uploadingFiles.filter(el => el.id !== file.id)"
                           class="ma-1">
        <template v-slot:before-name>
          <v-progress-linear v-if="!file.error"
                             class="mt-1"
                             :value="file.progress*100"
                             background-color="grey lighten-2"
                             color="blue lighten-2">
          </v-progress-linear>
        </template>
        <template v-slot:after-name>
          <div v-if="file.error" class="fs-12 text-center red--text">
            Ошибка загрузки
          </div>
        </template>
      </ui-document-preview>
    </v-row>
  </div>

</template>

<script>
import UiDocumentPreview from "@/components/UI/Document/UiDocumentPreview";
import requests from "@/mixins/requests";

export default {
  name: "FileInput",
  components: {UiDocumentPreview},
  props: {
    value: {
      type: Number,
    },
    loading: {
      type: Boolean
    },
    maxSize: {
      type: Number,
      default: 2000000
    },
    maxFiles: {
      type: Number,
      default: 9
    },
    accept: {
      type: Array,
      required: false
    },
    message: {
      type: String,
      required: false
    },
    notAllowedExtensionsMessage: {
      type: String,
      required: false
    },
    tooLargeSizeMessage: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      files: [],
      uploadingFiles: [],
      errorMessages: [],
      notAllowedExtensionMessageVisible: false,
      tooLargeSizeMessageVisible: false,
      notAllowedFileCountVisible: false,
      draggingOver: false,
      loadingCounter: 0
    }
  },
  computed: {
    isMobile(){
      return this.$store.getters.isMobile
    }
  },
  methods: {
    checkFiles(files) {
      this.notAllowedExtensionMessageVisible = false
      this.tooLargeSizeMessageVisible = false
      this.notAllowedFileCountVisible = false

      if (![...files].every(file => this.accept.includes(
          file.name.substring(file.name.lastIndexOf('.') + 1)))
      ) return this.notAllowedExtensionMessageVisible = true

      if (![...files].every(file => file.size <= this.maxSize)
      ) return this.tooLargeSizeMessageVisible = true

      if ((this.uploadingFiles.length + this.files.length) >= this.maxFiles) return this.notAllowedFileCountVisible = true

      this.addFiles(files)
    },
    addFiles(files) {
      this.loadingCounter++
      [...files].forEach(file => {
        const tmpId = Date.now()
        const uploadingFile = {
          name: file.name,
          data: file,
          id: tmpId,
          progress: 0
        }
        this.uploadingFiles.push(uploadingFile)
        const fd = new FormData()
        fd.set('file', file, file.name)
        this.postData('http://localhost:3000/upload/document', fd, undefined, {onUploadProgress: v => uploadingFile.progress = v.progress})
            .then(resp => {
              this.uploadingFiles = this.uploadingFiles.filter(el => el.id !== tmpId)
              this.files.push({
                name: file.name,
                id: resp.data.id
              })
              this.$emit('input', this.files)
              this.loadingCounter--
            })
            .catch(() => {
              this.uploadingFiles = this.uploadingFiles.map(file => file.id === tmpId ? {...file, error: true} : file)
              this.loadingCounter--
            })
      })
    },
    getLoadingStatus() {
      return !!this.loadingCounter
    },
    isReady() {
      return !this.getLoadingStatus() && !!this.files.length
    },
    getFiles() {
      return this.files
    }
  },
  watch: {
    loadingCounter(val) {
      if (!val) this.$emit('update:loading', false)
      else this.$emit('update:loading', true)
    }
  },
  mixins: [requests]

}
</script>

<style scoped>
.file-input {
  background: #f6f9fc;
  border-radius: 15px;
  border: 2px dashed black;
  padding: 10px;
  background-clip: padding-box;
}

.file-input_error {
  border-color: red !important;
}

.file-input_putting {
  border-color: green !important;
}

.file-input__drop-zone_blocking {
  pointer-events: none;
}

.file-input__drop-zone {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.file-input__label {
  display: inline-block;
  height: 42px;
  font-weight: 700;
  background: #BBDEFB;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}
</style>