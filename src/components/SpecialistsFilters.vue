<template>
  <v-card elevation="0" width="350" min-width="350" outlined class="pa-3">

    <ui-switch-picker :value="internal" @input="$emit('update:internal', $event)"
                      prepend-icon="mdi-home"
                      prepend-label="Очно"
                      append-icon="mdi-access-point"
                      append-label="Онлайн"
    >

    </ui-switch-picker>

    <v-range-slider :max="priceParams.max"
                    :min="priceParams.min"
                    :thumb-label="'always'"
                    track-fill-color="green lighten-2"
                    track-color="grey"
                    thumb-color="green lighten-3"
                    prepend-icon="mdi-cash"
                    @input="$emit('update:price', $event)"
                    :value="price"
                    class="mt-10"

    >
    </v-range-slider>

    <v-select :items="opportunitiesParams"
              :value="opportunities"
              @input="$emit('update:opportunities', $event)"
              outlined
              dense
              prepend-icon="mdi-ruler-square-compass"
              item-color="green lighten-2"
              color="green lighten-2"
              label="Условия"
              multiple
              chips
              small-chips
              deletable-chips
    >
    </v-select>


    <v-select :items="methodsParams"
              :value="methods"
              @input="$emit('update:methods', $event)"
              outlined
              dense
              prepend-icon="mdi-handball"
              item-color="green lighten-2"
              color="green lighten-2"
              label="Методы"
              multiple
              chips
              small-chips
    >
    </v-select>

    <v-select :items="specializationsParams"
              :value="specializations"
              @input="$emit('update:specializations', $event)"
              outlined
              dense
              prepend-icon="mdi-account-hard-hat-outline"
              item-color="green lighten-2"
              color="green lighten-2"
              label="Специализация"
              multiple
              chips
              small-chips
    >
    </v-select>


    <v-card-actions class="pa-0">
      <v-btn elevation="0" color="red lighten-2" outlined>
        Сбросить
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="green lighten-2" outlined @click="$emit('find')">
        Применить
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import UiSwitchPicker from "@/components/UI/UiSwitchPicker";

export default {
  name: "SpecialistsFilters",
  components: {UiSwitchPicker},

  data() {
    return {}
  },
  props: {
    methodsParams: Array,
    specializationsParams: Array,
    priceParams: Object,
    opportunitiesParams: Array,
    price: Array,
    specializations: Array,
    methods: Array,
    opportunities: Array,
    internal: Boolean
  },
}
</script>

<style scoped>


</style>