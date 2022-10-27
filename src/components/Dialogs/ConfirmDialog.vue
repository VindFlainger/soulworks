<template>
  <v-dialog :value="true" @click:outside="$root.$emit('close-confirm')" max-width="400">
    <v-card class="pa-3 confirm__main" elevation="0" color="white" outlined style="border-color: black">

      <div class="fs-22 font-title font-weight-bold text-center pt-4 pl-4 pr-4" style="letter-spacing: 2px">
        Вы уверены?
      </div>
      <div class="mt-2 mb-2 text-center fs-14">
        {{text}}
      </div>
      <v-card-actions class="pa-0">
        <v-btn
            @click="$root.$emit('close-confirm', false)"
            outlined
            color="red lighten-3"
            width="150">
          отмена
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            @click="$root.$emit('close-confirm', true)"
            outlined
            color="green lighten-3"
            width="150"
        >
          подтвердить
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>