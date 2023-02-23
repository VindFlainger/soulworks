<template>
  <v-row align="center">
    <div style="min-width: 100px">
      <kbd class="font-weight-bold font-title fs-14">{{ $t('common.ui.classes') }}</kbd>
    </div>

    <v-col class="pa-0 ml-3">
      <div>
        {{ $t('common.ui.classes-confirmed') }} - {{ confirmed }}
        <v-progress-linear
            striped height="10"
            style="max-width: 300px"
            color="green lighten-3"
            rounded
            :value="confirmed/(confirmed + cancelled + missed) * 100"
            background-color="grey lighten-2"
        ></v-progress-linear>
      </div>

      <div class="mt-2">
        {{ $t('common.ui.classes-canceled') }} - {{ cancelled }}
        <v-progress-linear
            striped height="10"
            style="max-width: 300px"
            color="orange lighten-3"
            rounded
            :value="cancelled/(confirmed + cancelled + missed) * 100"
            background-color="grey lighten-2"
        ></v-progress-linear>
      </div>

      <div class="mt-2">
        {{ $t('common.ui.classes-missed') }} - {{ missed }}
        <v-progress-linear
            striped height="10"
            style="max-width: 300px"
            color="red lighten-3"
            rounded
            :value="missed/(confirmed + cancelled + missed) * 100"
            background-color="grey lighten-2"
        ></v-progress-linear>
      </div>
    </v-col>

  </v-row>
</template>

<script>
export default {
  name: "AnyStatisticSessions",
  props: {
    confirmed: Number,
    missed: Number,
    cancelled: Number
  }
}
</script>

<style scoped>

</style>