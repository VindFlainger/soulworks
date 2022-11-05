<template>
  <div>
    <v-row class="ma-2" v-for="(item, index) in items" :key="index">
      <div class="font-title font-weight-bold fs-20 blue--text text--lighten-2">
        <slot name="marker" :item="item" :index="index">
          {{ prefix }} {{item.prefix}} {{ index + 1}} {{item.postfix}} {{ postfix }}
        </slot>
      </div>
      <v-col class="pa-0 ml-3 fs-18" >
        {{item.text}}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UiBeautyList",
  props: {
    items: {
      type: [
        {
          text: String,
          prefix: String,
          postfix: String
        }
      ]
    },
    prefix: {
      type: String
    },
    postfix: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>