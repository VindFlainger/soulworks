<template>
  <base-dialog
      :value="true"
      max-width="400"
      @close="$root.$emit('close-confirm')"
  >

    <v-card
        class="pa-3 confirm__main"
        style="border-color: black"
        elevation="0"
        color="white"
        outlined
    >

      <div
          class="fs-22 font-title font-weight-bold text-center pt-4 pl-4 pr-4"
          style="letter-spacing: 2px"
      >
        Вы уверены?
      </div>

      <div class="mt-2 mb-2 text-center fs-14">
        {{ text }}
      </div>

      <v-card-actions class="pa-0">
        <ui-default-button
            outlined
            color="red"
            width="150"
            @click="$root.$emit('close-confirm', false)"
        >
          Отмена
        </ui-default-button>

        <v-spacer></v-spacer>

        <ui-default-button
            outlined
            color="green"
            width="150"
            @click="$root.$emit('close-confirm', true)"
        >
          Подтвердить
        </ui-default-button>
      </v-card-actions>

    </v-card>
  </base-dialog>
</template>

<script>
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import BaseDialog from "@/components/Dialogs/BaseDialog";

export default {
  name: "ConfirmDialog",
  components: {BaseDialog, UiDefaultButton},
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>