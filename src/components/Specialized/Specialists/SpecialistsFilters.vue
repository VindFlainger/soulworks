<template>
  <v-card elevation="0" width="350" min-width="350" outlined class="pa-3">

    <ui-switch-picker
        :value="internal" @input="$emit('update:internal', $event)"
        prepend-icon="mdi-home"
        prepend-label="Очно"
        append-icon="mdi-access-point"
        append-label="Онлайн"
    ></ui-switch-picker>

    <range-input
        :min-limit="minPriceParam"
        :max-limit="maxPriceParam"
        @update:min="$emit('update:minPrice', $event)"
        @update:max="$emit('update:maxPrice', $event)"
        :min="minPrice"
        :max="maxPrice"
        class="mt-2"
    ></range-input>

    <select-input
        :items="opportunityParams"
        :value="opportunities"
        @input="$emit('update:opportunities', $event)"
        :required="false"
        prepend-icon="mdi-ruler-square-compass"
        label="Условия"
        multiple
        small-chips
        deletable-chips
        item-color="green lighten-2"
    ></select-input>

    <select-input
        :items="methodParams"
        :value="methods"
        @input="$emit('update:methods', $event)"
        :required="false"
        prepend-icon="mdi-handball"
        label="Методы"
        multiple
        small-chips
        deletable-chips
        item-color="green lighten-2"
    ></select-input>

    <select-input
        :items="specializationParams"
        :value="specializations"
        @input="$emit('update:specializations', $event)"
        :required="false"
        prepend-icon="mdi-account-hard-hat-outline"
        label="Специализация"
        multiple
        small-chips
        deletable-chips
        item-color="green lighten-2"
    ></select-input>

    <v-card-actions class="pa-0">
      <ui-default-button color="red" large @click="$emit('drop')">
        Сбросить
      </ui-default-button>
      <v-spacer></v-spacer>
      <ui-default-button color="green" large @click="$emit('find')">
        Применить
      </ui-default-button>
    </v-card-actions>


  </v-card>
</template>

<script>
import UiSwitchPicker from "@/components/UI/UiSwitchPicker";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import SelectInput from "@/components/UI/Inputs/SelectInput";
import RangeInput from "@/components/UI/Inputs/RangeInput";

export default {
  name: "SpecialistsFilters",
  components: {RangeInput, SelectInput, UiDefaultButton, UiSwitchPicker},

  data() {
    return {}
  },
  props: {
    methodParams: {
      type: Array,
      required: true
    },
    specializationParams: {
      type: Array,
      required: true
    },
    opportunityParams: {
      type: Array,
      required: true
    },
    minPriceParam: {
      type: Number,
      default: 0
    },
    maxPriceParam: {
      type: Number,
      default: 1000
    },
    minPrice: Number,
    maxPrice: Number,
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