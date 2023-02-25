<template>
  <base-dialog
      :value="value"
      max-width="600"
      class="pa-0"
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

        <span class="text-h6 font-weight-bold comfortaa">
          {{ $t('common.ui.pick-image')}}
        </span>
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
      <ui-default-button @click="$emit('close')">
        {{ $t('common.buttons.cancel')}}
      </ui-default-button>
      <v-spacer></v-spacer>
      <ui-confirm-button @click="uploadImage">
        {{ $t('common.buttons.save')}}
      </ui-confirm-button>
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
  mixins: [requests],
  props: {
    value: Boolean
  },
  data() {
    return {
      img: undefined,
      croppedImg: undefined
    }
  },
  watch: {
    value(){
      this.img = ''
      this.croppedImg = ''
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
        this.postData('upload/avatar', fd)
            .then(resp => {
              this.img = undefined
              this.croppedImg = undefined
              this.$emit('change', resp.data)
            })
            .catch()
      }))
    }
  },

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