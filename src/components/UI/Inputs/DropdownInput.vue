<template>
  <v-card max-width="100" elevation="0" style="background-color: inherit">
    <v-select
        item-color="black"
        class="input text-h6 text-uppercase"
        color="green"
        v-bind="$attrs"
        v-on="$listeners"
        dense
        hide-details
        outlined
        :menu-props="{bottom: true, offsetY: true, 'nudge-top': -3, rounded: 'lg', 'content-class': 'text-h6 text-uppercase'}"
    >
    </v-select>
  </v-card>
</template>

<script>
export default {
  name: "DropdownInput"
}
</script>

<style scoped>
.input >>> fieldset {
  border-color: rgba(255, 255, 255, 0);
}

.input >>> input {
  display: none;
}

.input >>> .v-input__append-inner {
  display: none;
}

.input >>> .v-menu__content{
  border: none;
}

.input >>> .v-input__slot{
  padding: 0 !important;
}

</style>