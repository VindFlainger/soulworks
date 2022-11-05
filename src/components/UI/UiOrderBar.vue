<template>
  <v-row class="ma-n1">

    <v-tooltip v-for="order in activeOrders" :key="order.tip" bottom>
      <template v-slot:activator="{on, attrs}">
        <v-avatar
            :color="order.color"
            :size="size"
            v-on="on"
            v-bind="attrs"
            class="ma-1"
        >
          <v-icon color="white" :size="Number(size-size/3)">{{ order.icon }}</v-icon>
        </v-avatar>

      </template>
      {{ order.tip | capitalize }}
    </v-tooltip>

    <slot>

    </slot>

  </v-row>
</template>

<script>
export default {
  name: "UiOrderBar",
  props: {
    orders: Array,
    size: {
      type: Number,
      default: 30
    }
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