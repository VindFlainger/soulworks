<template>
  <v-row class="ma-n1">

    <v-tooltip v-for="order in activeOrders" :key="order.name" bottom>
      <template v-slot:activator="{on, attrs}">
        <v-avatar
            :color="order.color"
            size="30"
            v-on="on"
            v-bind="attrs"
            class="ma-1"
        >
          <v-icon color="white">{{order.icon}}</v-icon>
        </v-avatar>
      </template>
      {{ order.name | capitalize }}
    </v-tooltip>

    <slot>

    </slot>

  </v-row>
</template>

<script>
export default {
  name: "UiOrderBar",
  props: {
    orders: Array
  },
  computed: {
    activeOrders() {
      return this.orders.filter(order => {
        if (order.show === undefined) return true
        return order.show
      })
    }
  }
}
</script>

<style scoped>

</style>