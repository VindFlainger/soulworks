<template>
  <v-row style="align-items: stretch; position:relative; border: 1px solid black;" class="rounded-xl pa-2 pr-10">

    <div style="height: inherit; position:relative; width: 250px">
      <v-img :src="previewImg || require('@/assets/images/material-nophoto.png')"
             class="rounded-xl"
             style="position:absolute;"
             max-width="250"
             height="100%"
             position="top center"
      ></v-img>
    </div>

    <v-col class="ml-3">
      <div class="text-decoration-underline text-title font-title fs-18">{{ name }}</div>
      <div class="mt-1 text-title">{{ description }}</div>
      <div class="mt-1 text-title">Опубликована: {{ $moment(date).format('lll') }}</div>
      <v-row class="mt-1">
        <ui-default-button @click="$emit('show-material')">Просмотр</ui-default-button>
        <ui-confirm-button class="ml-4" @click="$emit('add-reader')">Поделиться</ui-confirm-button>
      </v-row>
    </v-col>

    <v-col>
      <div class="text-title fs-16" style="font-weight: 600">Читатели</div>
      <ui-signed-avatars :users="readers" v-if="readers.length"></ui-signed-avatars>
      <div v-else class="fs-14">
        Вы еще не предоставили доступ к этому материалу другим пользователям
      </div>
    </v-col>

    <ui-cross-button @click="$emit('delete-material')"
                     class="ml-4"
                     absolute
                     style="top: 50%; right: 10px; transform: translate(0,-50%)"
    ></ui-cross-button>

  </v-row>
</template>

<script>
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiSignedAvatars from "@/components/UI/UiSignedAvatars";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiCrossButton from "@/components/UI/Buttons/UiCrossButton";

export default {
  name: "SpecMaterialCard",
  components: {UiCrossButton, UiDefaultButton, UiSignedAvatars, UiConfirmButton},
  props: {
    id: String,
    name: String,
    date: Number,
    description: String,
    previewImg: String,
    documents: Array,
    readers: Array
  }
}
</script>

<style scoped>

</style>