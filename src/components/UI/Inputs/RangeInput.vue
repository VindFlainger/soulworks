<template>
  <div class="slider" style="max-width: 400px">
    <v-row>
      <v-col class="pb-0">
        <v-text-field :value="inputMin"
                      outlined
                      dense
                      ref="min"
                      @change="inputMin = $event"
                      hide-details
                      type="number"
                      style="border-radius: 14px"
                      color="black"
        >

        </v-text-field>
      </v-col>
      <v-col class="pb-0">
        <v-text-field :value="inputMax"
                      outlined
                      dense
                      ref="max"
                      @change="inputMax = $event"
                      hide-details
                      type="number"
                      style="border-radius: 14px"
                      color="black"
        >

        </v-text-field>
      </v-col>


    </v-row>

    <v-row>
      <v-range-slider
          label="" max="1000" min="0" :value="[min, max]"
          @input="$emit('update:min', $event[0]);$emit('update:max', $event[1])"
          class="mt-1"
          track-fill-color="green lighten-3"
          track-color="grey lighten-2"
          thumb-color="green lighten-3"
      >
      </v-range-slider>
    </v-row>
  </div>

</template>

<script>
export default {
  name: "RangeInput",
  data() {
    return {}
  },
  props: {
    minLimit: Number,
    maxLimit: Number,
    min: Number,
    max: Number
  },
  computed: {
    inputMin: {
      get() {
        return this.min
      },
      set(v) {
        if (v < 0) {
          this.$refs.min.lazyValue = 0
        }
        if (v > this.min) {
          this.$refs.min.lazyValue = this.max
        }
        this.$emit('update:min', v > this.max ? this.max : v < 0 ? 0 : v)
      }
    },
    inputMax: {
      get() {
        return this.max
      },
      set(v) {
        if (v > 1000) {
          this.$refs.max.lazyValue = 1000
        }
        if (v < this.min) {
          this.$refs.max.lazyValue = this.min
        }
        this.$emit('update:max', v < this.min ? this.min : v > 1000 ? 1000 : v)
      }
    },
  },
}
</script>

<style scoped>
.slider >>> .v-slider__track-container {
  height: 5px !important;
}

.slider >>> .v-slider__thumb {
  height: 20px !important;
  width: 20px !important;
}

.slider >>> .v-slider__thumb::before {
  display: none;
}
</style>