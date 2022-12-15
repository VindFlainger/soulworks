<template>
  <base-dialog
      :value="value"
      max-width="600"
      class="pa-0"
      easy-container
      @close="$emit('close')"
  >
    <label
        class="file-input d-block"
        v-if="!img"
    >
      <v-row
          class="flex-nowrap"
          align="center"
          justify="center"
      >
        <v-img
            :src="require('@/assets/images/pick-img.png')"
            max-width="130"
        ></v-img>

        <span class="fs-18 font-weight-bold font-title">Выбрать изображение</span>
      </v-row>

      <input
          class="d-none"
          type="file"
          accept=".png,.jpg,.bmp"
          @change="fileParser($event.srcElement.files[0])"
      >
    </label>

    <cropper
        class="cropper"
        v-if="img"
        :src="img"
        :stencil-props="{
                  aspectRatio: 1/1
                }"
        @change="croppedImg = $event"
    ></cropper>

    <v-row class="mt-3">
      <ui-default-button @click="$emit('close')"></ui-default-button>
      <v-spacer></v-spacer>
      <ui-confirm-button @click="uploadImage">Сохранить</ui-confirm-button>
    </v-row>

  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import requests from "@/mixins/requests";

export default {
  name: "CroppingAvatarDialog",
  components: {UiConfirmButton, UiDefaultButton, BaseDialog, Cropper},
  props: {
    value: Boolean
  },
  data() {
    return {
      img: undefined,
      croppedImg: undefined
    }
  },
  methods: {
    fileParser(image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = () => {
        this.img = reader.result
      }
    },
    uploadImage() {
      this.croppedImg.canvas.toBlob((blob => {
        const file = new File([blob], 'avatar.png')
        const fd = new FormData()
        fd.set('image', file, file.name)
        this.postData('http://localhost:3000/upload/avatar', fd)
            .then(resp => {
              this.img = undefined
              this.croppedImg = undefined
              this.$emit('change', resp.data)
            })
            .catch()
      }))
    }
  },
  mixins: [requests]
}
</script>

<style scoped>

.file-input {
  cursor: pointer;
  display: inline-block;

}

.cropper {
  height: 400px;
  max-width: 600px;
  border-radius: 15px !important;
  overflow: hidden;
}

.cropper >>> .vue-advanced-cropper__background {
  background: white !important;
}

.cropper >>> .vue-advanced-cropper__foreground {
  background: black !important;
}
</style>