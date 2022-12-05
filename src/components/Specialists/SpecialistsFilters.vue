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

    <select-input :items="opportunitiesParams"
                  :value="opportunities"
                  @input="$emit('update:opportunities', $event)"
                  :required="false"
                  prepend-icon="mdi-ruler-square-compass"
                  label="Условия"
                  multiple
                  small-chips
                  deletable-chips
                  item-color="green lighten-2"
    >
    </select-input>


    <select-input :items="methodsParams"
                  :value="methods"
                  @input="$emit('update:methods', $event)"
                  :required="false"
                  prepend-icon="mdi-handball"
                  label="Методы"
                  multiple
                  small-chips
                  item-color="green lighten-2"
    >
    </select-input>

    <select-input :items="specializationsParams"
                  :value="specializations"
                  @input="$emit('update:specializations', $event)"
                  :required="false"
                  prepend-icon="mdi-account-hard-hat-outline"
                  label="Специализация"
                  multiple
                  small-chips
                  item-color="green lighten-2"
    >
    </select-input>


    <v-card-actions class="pa-0">
      <ui-default-button color="red" large>
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

export default {
  name: "SpecialistsFilters",
  components: {SelectInput, UiDefaultButton, UiSwitchPicker},

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