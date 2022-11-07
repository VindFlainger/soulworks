<template>
    <v-container fluid class="d-flex justify-center fill-height pt-0" style="background: rgb(236, 239, 241)">
      <v-responsive class="fill-height pr-16 pl-16" width="100%" max-width="1450" v-bind="$attrs" style="z-index: 100;">
        <slot></slot>
      </v-responsive>
    </v-container>
</template>

<script>
export default {
  name: "UiContentWrapper",
}
</script>

<style scoped>

</style>