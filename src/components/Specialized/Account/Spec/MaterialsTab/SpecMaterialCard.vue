<template>
  <v-row
      class="rounded-xl"
      style="align-items: stretch; position:relative; border: 1px solid black"
  >

    <div style="height: inherit; position:relative;" class="col-12 col-md-6">
      <v-img
          :height="viewportHook({base: 200, md: 300})"
          class="rounded-xl"
          width="100%"
          :src="previewImg || require('@/assets/images/material-nophoto.png')"
          position="top center"
      ></v-img>
    </div>

    <v-col class="col-md-6 pt-0">

      <h5 class="text-decoration-underline text-title font-title text-h6 comfortaa">{{ name }}</h5>
      <p class="mt-1 text-title text-body-1 sans">{{ description }}</p>

      <v-row class="mt-3" justify="space-between">
        <ui-default-button @click="$emit('show-material')">
          {{$t('common.buttons.see')}}
        </ui-default-button>
        <ui-confirm-button class="ml-1" @click="$emit('add-reader')">
          {{$t('common.buttons.share')}}
        </ui-confirm-button>
      </v-row>

      <div class="mt-3">

        <h5 class="text-title text-subtitle-1 font-weight-bold comfortaa">
          {{$t('account.spec.materials.readers')}}:
        </h5>

        <ui-signed-avatars
            v-if="readers.length"
            :users="readers"
        ></ui-signed-avatars>

        <p v-else class="text-body-1 sans">
          {{$t('account.spec.materials.no-readers')}}:
        </p>
      </div>

    </v-col>

  </v-row>
</template>

<script>
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiSignedAvatars from "@/components/UI/UiSignedAvatars";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";

export default {
  name: "SpecMaterialCard",
  components: {
    UiDefaultButton,
    UiSignedAvatars,
    UiConfirmButton
  },
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