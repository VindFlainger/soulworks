<template>
  <ui-content-wrapper class="fill-height">
    <v-row class="flex-nowrap align-start fill-height" align="stretch">
      <specialists-filters
          v-if="filters && specialists && specialists.length"
          :methods-params="filters.methods"
          :specializations-params="filters.specializations"
          :opportunities-params="[
            {
              text: 'Работа с детьми',
              value: 'children'
            },
            {
              text: 'Работа с подростками',
              value: 'teens'
            },
            {
              text: 'Семейный психолог',
              value: 'family'
            }]"
          :price-params="{
                min: filters.price.min,
                max: filters.price.max
            }"
          @find="find()"
          :price.sync="price"
          :methods.sync="methods"
          :specializations.sync="specializations"
          :opportunities.sync="opportunities"
          :internal.sync="internal"

          style="align-self: start; border-radius: 15px;"

      >

      </specialists-filters>

      <v-card max-width="900" elevation="0" style="flex-grow: 1; border-radius: 15px;"
              v-if="specialists && specialists.length" class="ml-10 pa-4">

        <v-card elevation="0" outlined style="border-radius: 15px">
          <v-card-actions>
            <select-input :items="[
                      {
                      text: 'По количеству обращений',
                      value: 1
                      },
                      {
                      text: 'По цене (сначало дороже)',
                      value: 2
                      },
                      {
                      text: 'По цене (сначало дешевле)',
                      value: 3
                      },
                      {
                      text: 'По дате регистрации',
                      value: 4
                      }
                      ]"
                      :value="sort"
                      @input="$router.push({name: 'specialists', query: {...$route.query, sort: $event}})"
                      outlined
                      dense
                      hide-details
                      prepend-icon="mdi-swap-vertical"
                      item-color="green lighten-2"
                      color="green lighten-2"
                      label="Сортировка"
                      style="max-width: 300px"
            >
            </select-input>
            <v-spacer></v-spacer>
            <v-btn icon :color="expandedLimit?'red lighten-2':''"
                   @click="
            expandedLimit = !expandedLimit;
            $router.push(
                  {
                    name: 'specialists',
                    query: {
                      ...$route.query,
                      limit: expandedLimit?24:undefined,
                  }})"
            >
              <v-icon size="35">mdi-apps</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>


        <specialist-list
            :specialists="specialists"
            class="mt-3"
        >
        </specialist-list>


        <v-row justify="center">
          <div style="width: 350px">
            <ui-pagination v-if="specialists && specialists.length"
                           :length="totalPages"
                           :value="Number($route.query.page || 1)"
                           @input="$router.push({name: 'specialists', query: {...$route.query, page: $event}})"
            >
            </ui-pagination>
          </div>
        </v-row>

      </v-card>

      <v-card v-if="(!specialists ||!specialists.length) && !globalLoading"
              elevation="0"
              min-width="100%"
              rounded
              class="ml-10 fill-height d-flex align-center justify-center not-found overflow-x-hidden pa-4"

      >
        <v-card class="pa-6" elevation="0" style="z-index: 1; background: rgba(255,255,255,0.7)">
          <div class="font-title font-weight-bold fs-20">Извините, но по вашему запросу ничего не найдено.</div>
          <v-card-actions class="mt-3">
            <v-spacer></v-spacer>
            <v-btn @click="$router.go(-1)" color="blue lighten-3" outlined large>
              назад
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="reset()" color="blue lighten-3" outlined large>
              в начало
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-card>


    </v-row>

  </ui-content-wrapper>
</template>

<script>
import SpecialistList from "@/components/SpecialistList";
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import SpecialistsFilters from "@/components/SpecialistsFilters";
import UiPagination from "@/components/UI/UiPagination";
import SelectInput from "@/components/UI/Inputs/SelectInput";
import requests from "@/mixins/requests";


export default {
  name: "SpecialistsView",
  data() {
    return {
      filters: undefined,
      specialists: undefined,
      sort: 4,
      price: [0, 1000],
      methods: [],
      specializations: [],
      opportunities: [],
      internal: false,

      totalPages: 1,
      expandedLimit: false

    }
  },
  methods: {
    getSpecialists(query) {
      this.addLoadingProcess()
      this.getData('http://localhost:3000/specialists', null, {
        params: {
          limit: query.limit || 10, //
          offset: (query.page - 1) * (query.limit || 10) || 0, //
          sort: query.sort || 4,
          form: query.form || 'online',
          ...query
        }
      })
          .then(resp => {
            this.totalPages = Math.ceil(resp.data.count / (query.limit || 10)) //
            this.specialists = resp.data.specialists
          })
          .finally(() => {
            this.removeLoadingProcess()
          })
    },
    getFilters() {
      this.addLoadingProcess()
      this.getData('http://localhost:3000/filters')
          .then(resp => {
            this.filters = resp.data
          })
          .finally(() => {
            this.removeLoadingProcess()
          })
    },
    reset() {
      this.methods = []
      this.specializations = []
      this.opportunities = []
      this.price = []
      this.$router.push({name: 'specialists'})
    },
    find() {
      this.$router.push(
          {
            name: 'specialists',
            query: {
              ...this.$route.query,
              ...this.dynamicSelects,
              ...this.parsedOpportunities,
              form: this.internal ? 'internal' : 'online',
              price: this.price.join(':')
            }
          })
    }
  },
  computed: {
    dynamicSelects() {
      return {
        methods: this.methods,
        specializations: this.specializations
      }
    },
    parsedOpportunities() {
      const obj = {}
      this.opportunities.forEach(el => {
        obj[el] = true
      })
      return obj
    }
  },
  mounted() {
    this.getSpecialists(this.$route.query)
    this.methods = this.$route.query.methods || []
    this.specializations = this.$route.query.specializations || []
    this.sort = this.$route.query.sort || 4
    this.getFilters()
  },
  beforeRouteUpdate(to, from, next) {
    this.getSpecialists(to.query)
    next()
  },
  components: {SelectInput, UiPagination, SpecialistsFilters, UiContentWrapper, SpecialistList},
  mixins: [requests]
}
</script>

<style scoped>
.not-found:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("@/assets/images/not-found.png") 0 0 / cover;
  opacity: 0.2;
}


</style>