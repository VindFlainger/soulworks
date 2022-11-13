<template>
  <base-dialog :value="true" @close="$root.$emit('close-confirm')" max-width="400">
    <v-card class="pa-3 confirm__main" elevation="0" color="white" outlined style="border-color: black">

      <div class="fs-22 font-title font-weight-bold text-center pt-4 pl-4 pr-4" style="letter-spacing: 2px">
        Вы уверены?
      </div>
      <div class="mt-2 mb-2 text-center fs-14">
        {{text}}
      </div>
      <v-card-actions class="pa-0">
        <ui-default-button
            @click="$root.$emit('close-confirm', false)"
            outlined
            color="red "
            width="150">
          Отмена
        </ui-default-button>
        <v-spacer></v-spacer>
        <ui-default-button
            @click="$root.$emit('close-confirm', true)"
            outlined
            color="green "
            width="150"
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