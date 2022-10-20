<template>
  <v-card elevation="0" max-width="440" outlined>
    <div class="fs-22 pt-2 pb-2 font-title font-weight-bold">Ближайшие консультации</div>

    <v-list v-if="classes" class="pt-0" style="border-top: 1px solid grey;">
      <v-list-item v-for="_class in classes" :key="_class._id" style="border-bottom: 1px solid grey;">

        <v-list-item-avatar>

          <v-img :src="_class.owner.avatar"></v-img>

        </v-list-item-avatar>


        <v-row align="center">
          <v-list-item-content>

            <v-list-item-title class="text-left fs-20 font-title font-weight-bold">
              {{_class.owner.fullName | capitalize}}
            </v-list-item-title>

            <div class="text-left font-weight-bold fs-12">
              {{ _class.start_date | datetime }}
            </div>
            <div class="text-left fs-12">
              {{_class.description | capitalize}}
            </div>

          </v-list-item-content>
          <v-btn v-if="_class.link"
                 x-small color="blue lighten-4" class="ma-2" fab elevation="0"
                 :href="_class.link"
          >
            <v-icon size="25" color="black">mdi-open-in-new</v-icon>
          </v-btn>

          <v-menu offset-y>
            <template v-slot:activator = "{on, attrs}">
              <v-btn x-small color="red lighten-4" class="ma-2" fab elevation="0" v-on="on" v-bind="attrs">
                <v-icon size="25" color="black">mdi-close</v-icon>
              </v-btn>

            </template>
            <v-card>
              <v-card-title>
                  Вы уверены
              </v-card-title>
              <v-card-actions>
                <v-btn>Нет</v-btn>
                <v-btn>Да</v-btn>
              </v-card-actions>
            </v-card>

          </v-menu>

        </v-row>



      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "ClassesWidget",
  data() {
    return {
      classes: undefined
    }
  },
  methods: {
    getClasses() {
      this.getData('http://localhost:3000/user/classes')
          .then(resp => {
            this.classes = resp.data
          })
    }
  },
  mounted() {
    this.getClasses()
  }
}
</script>

<style scoped>

</style>