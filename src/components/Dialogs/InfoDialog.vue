<template>
  <base-dialog :value="true" @close="$root.$emit('close-info')" max-width="400">
    <v-card class="pa-3 confirm__main" elevation="0" color="transparent" >

      <div class="pa-4">
        <div class="fs-22 font-title font-weight-bold text-center " style="letter-spacing: 2px">
          {{title}}
        </div>
        <div class="text-center fs-12" >
          {{subtitle}}
        </div>
      </div>

      <v-card-actions class="pa-0">
        <v-spacer></v-spacer>
        <v-btn
            @click="$root.$emit('close-info', true)"
            outlined
            color="green lighten-2"
            width="150"
        >
          Ок
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

    </v-card>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
export default {
  name: "InfoDialog",
  components: {BaseDialog},
  props: {
    title: {
      type: String,
      default: 'Информация'
    },
    subtitle: {
      type: String,
    }

  }
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