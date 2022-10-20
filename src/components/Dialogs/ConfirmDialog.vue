<template>
  <v-dialog :value="true" @click:outside="$root.$emit('confirmation')" max-width="400">
    <v-card class="pa-3 confirm__main" elevation="0" color="transparent">

      <div class="fs-22 font-title font-weight-bold text-center pa-4" style="letter-spacing: 2px">
        Вы уверены?
      </div>
      <v-card-actions class="pa-0">
        <v-btn
            @click="$root.$emit('confirmation'); $root.$emit('cancel')"
            outlined
            color="red lighten-3"
            width="150">
          отмена
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            @click="$root.$emit('confirmation'); $root.$emit('confirm')"
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
  name: "ConfirmDialog"
}
</script>

<style scoped>
.confirm__main::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.1;
  background: url('@/assets/images/confirm-bg.png') 0 0 / cover ;
}

.confirm__main::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background: white ;
}
</style>