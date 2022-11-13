<template>
  <a :href="url" target="_blank" class="document-preview black--text text-decoration-none pa-1">
    <div class="document-preview__close-area" v-if="clearable">
      <v-btn icon class="document-preview-button" x-large @click="$emit('clear')">
        <v-avatar style="background: rgba(0,0,0,0.76)">
          <v-icon color="white">mdi-close</v-icon>
        </v-avatar>
      </v-btn>
    </div>
    <div class="document-preview__refresh-area" v-if="unsuccessful">
      <div class="document-preview__center-area">
        <v-btn icon   x-large @click="$emit('refresh')">
          <v-avatar  style="background: rgba(0,0,0,0.76)">
            <v-icon color="white">mdi-refresh</v-icon>
          </v-avatar>
        </v-btn>
        <v-btn icon x-large @click="$emit('clear')">
          <v-avatar style="background: rgba(0,0,0,0.76)">
            <v-icon color="white">mdi-close</v-icon>
          </v-avatar>
        </v-btn>
      </div>
    </div>
    <div class="document-preview__center-area" v-if="clearable">
     <slot name="center"></slot>
    </div>
    <v-img :src="require(`@/assets/images/filetypes/${formatExtension}.png`)" max-width="110" class="ma-1"></v-img>
    <slot name="before-name"></slot>

    <div class="document-preview__name fs-12 text-center" style="text-overflow: ellipsis;" >{{ formatName }}</div>
    <slot name="after-name"></slot>
  </a>
</template>

<script>
export default {
  name: "UiDocumentPreview",
  data() {
    return {
      extensions: {
        avi: ['avi'],
        doc: ['doc', 'docx', 'rtf'],
        gif: ['gif'],
        html: ['html'],
        jpg: ['jpg', 'jpeg'],
        mov: ['mov'],
        mp3: ['mp3'],
        mp4: ['mp4'],
        pdf: ['pdf'],
        png: ['png'],
        ppt: ['ppt', 'pptx'],
        rar: ['rar'],
        svg: ['svg'],
        txt: ['txt'],
        xls: ['xls'],
        zip: ['zip']
      }
    }
  },
  props: {
    url: {
      type: String,
      required: false
    },
    extension: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    showExtension: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    unsuccessful: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatExtension() {
      const extension = this.extension || this.name.split('.').pop()
      return Object.entries(this.extensions).find(el => el[1].includes(extension))?.[0] || 'unknow'
    },
    formatName() {
      return this.showExtension ? this.name : this.name.substring(0, this.name.lastIndexOf('.') === -1 ? this.name.length : this.name.lastIndexOf('.'))
    }
  }
}
</script>


<style scoped>

.document-preview {
  max-width: 110px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
}

.document-preview__close-area {
  z-index: 2;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.22);
  transition: opacity .3s linear ;
}

.document-preview__center-area{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.document-preview__close-area:hover{
  opacity: 1;
}

.document-preview-button{
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}

.document-preview__refresh-area{
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(218, 73, 73, 0.22);
}

.document-preview__name {
  max-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>