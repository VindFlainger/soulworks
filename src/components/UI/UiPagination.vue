<template>
  <v-pagination
      v-bind="$attrs"
      v-on="$listeners"
      circle
      class="pagination"
  >
  </v-pagination>
</template>

<script>
export default {
  name: "UiPagination"
}
</script>

<style scoped>


.pagination >>> .v-pagination__item--active{
  box-shadow: none;
  background: #BBDEFB !important;
}

.pagination >>> .v-pagination__item{
  box-shadow: inset 0 0 0 1px #BBDEFB;
  color: black;
  font-family: Comfortaa, sans-serif;
  font-weight: bold;
}

.pagination >>> .v-pagination__navigation{
  box-shadow: inset 0 0 0 1px #BBDEFB;
}

.pagination >>> .theme--light.v-icon{
  color: #BBDEFB !important;
}

.pagination{
  padding: 0 !important;
}
</style>