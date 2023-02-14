<template>
  <v-list class="body-1">
    <v-list-item class="pa-0 align-start" style="min-height: 0">
      <v-list-item-icon class="ma-0 mr-2">
        <v-icon color="black">mdi-cube</v-icon>
      </v-list-item-icon>
      <h4 class="font-weight-medium black--text">
        Специализация: <span class="font-weight-regular">{{ specialization }}</span>
      </h4>
    </v-list-item>
    <v-list-item class="pa-0 align-start" style="min-height: 0">
      <v-list-item-icon class="ma-0 mr-2">
        <v-icon color="black">mdi-account-hard-hat-outline</v-icon>
      </v-list-item-icon>
      <h4 class="font-weight-medium">
        Метод: <span class="font-weight-regular">{{ method }}</span>
      </h4>
    </v-list-item>
    <v-list-item class="pa-0 align-start" style="min-height: 0">
      <v-list-item-icon class="ma-0 mr-2">
        <v-icon color="black">mdi-briefcase-account-outline</v-icon>
      </v-list-item-icon>
      <h4>
        <span class="font-weight-medium"> Условия:</span>
        <ul class="pl-2" style="list-style: none">
          <li v-if="opportunities.teens">
            <v-icon color="green">mdi-face-man-shimmer-outline</v-icon>
            Работа с подростками
          </li>
          <li v-if="opportunities.children">
            <v-icon color="orange">mdi-teddy-bear</v-icon>
            Работа с детьми
          </li>
          <li v-if="opportunities.family">
            <v-icon color="blue">mdi-human-male-female-child</v-icon>
            Семейная консультация
          </li>
          <li v-if="opportunities.internal">
            <v-icon color="grey">mdi-office-building</v-icon>
            Оффлайн консультация
          </li>
        </ul>
      </h4>

    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "UiClassData",
  props: {
    specialization: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    opportunities: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>