<template>
  <label class="easy-photo-input d-inline-flex align-center justify-center overflow-hidden" style="position:relative;">
    <div class="fs-40 font-weight-light">+</div>
    <input type="file" class="d-none" @input="addFile($event.srcElement.files[0])" accept=".jpg,.png,.gif">
    <v-img style="position:absolute; " :src="img" max-width="40" height="100%"></v-img>
  </label>
</template>

<script>
import requests from "@/mixins/requests";

export default {
  name: "EasyPhotoInput",
  data() {
    return {
      img: ''
    }
  },
  props: {
    value: String,
    loading: Boolean
  },
  methods: {
    addFile(file) {
      if (file) {
        this.$emit('update:loading', true)
        const fd = new FormData()
        fd.set('image', file, file.name)
        this.postData('http://localhost:3000/upload/image', fd)
            .then(resp => {
              this.img = resp.data.url
              this.$emit('input', resp.data.id)
              this.$emit('update:loading', false)
            })
            .catch(() => {

            })
      }
    }
  },
  mixins: [requests]
}
</script>

<style scoped>
.easy-photo-input {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
}


</style>