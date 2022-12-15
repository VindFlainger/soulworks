<template>
  <ui-content-wrapper class="fill-height">
    <v-row class="flex-nowrap align-start fill-height" align="stretch">

      <specialists-filters
          :method-params="methodParams.map(prm => ({...prm, value: prm._id}))"
          :specialization-params="specializationParams.map(prm => ({...prm, value: prm._id}))"
          :opportunity-params="opportunityParams"
          :max-price-param="maxPriceParam"
          :min-price-param="minPriceParam"
          @find="find"
          @drop="drop"
          :methods.sync="methods"
          :specializations.sync="specializations"
          :opportunities.sync="opportunities"
          :internal.sync="internal"
          :max-price.sync="maxPrice"
          :min-price.sync="minPrice"
          style="align-self: start; border-radius: 15px"
      ></specialists-filters>

      <v-card
          max-width="900"
          elevation="0"
          style="flex-grow: 1;
          border-radius: 15px;"
          class="ml-10 pa-4"
      >

        <v-card
            elevation="0"
            outlined
            style="border-radius: 15px"
        >

          <v-card-actions>

            <select-input :items="sortOptions"
                          :value="Number($route.query.sort) || 4"
                          @input="changeSortOrder"
                          outlined
                          dense
                          hide-details
                          prepend-icon="mdi-swap-vertical"
                          item-color="green lighten-2"
                          color="green lighten-2"
                          label="Сортировка"
                          style="max-width: 300px"
            ></select-input>

            <v-spacer></v-spacer>


          </v-card-actions>
        </v-card>


        <specialist-list
            :specialists="specialists"
            class="mt-3"
        ></specialist-list>

        <specialists-not-found
            v-if="(!specialists ||!specialists.length) && !isGlobalLoading"
            @back="drop"
        ></specialists-not-found>


        <v-row justify="center" class="mt-2">
          <div style="width: 350px">
            <ui-pagination
                v-if="totalPages > 1"
                :length="totalPages"
                :value="Number($route.query.page) || 1"
                @input="changePage"
            ></ui-pagination>
          </div>
        </v-row>

      </v-card>

    </v-row>

  </ui-content-wrapper>
</template>

<script>
import SpecialistList from "@/components/Specialized/Specialists/SpecialistList";
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import SpecialistsFilters from "@/components/Specialized/Specialists/SpecialistsFilters";
import UiPagination from "@/components/UI/UiPagination";
import SelectInput from "@/components/UI/Inputs/SelectInput";
import requests from "@/mixins/requests";
import SpecialistsNotFound from "@/components/Specialized/Specialists/SpecialistsNotFound";
import loader from "@/mixins/loader";


export default {
  name: "SpecialistsView",
  data() {
    return {
      specializationParams: [],
      methodParams: [],
      minPriceParam: 0,
      maxPriceParam: 0,


      specialists: [],
      minPrice: 0,
      maxPrice: 0,
      methods: [],
      specializations: [],
      opportunities: [],
      internal: false,

      totalPages: 1,

      defaultSort: 4,
      defaultLimit: 25,
    }
  },
  methods: {
    getSpecialists() {
      this.addGlobalLoadingProcess()
      this.postData('http://localhost:3000/specialists', {
        methods: this.$route.query.methods ? [this.$route.query.methods].flat() : undefined,
        specializations: this.$route.query.specializations ? [this.$route.query.specializations].flat() : undefined,
        opportunities:
            this.$route.query.opportunities || this.$route.query.internal ?
                [...this.$route.query.opportunities ? [this.$route.query.opportunities] : [],
                  ...this.$route.query.internal ? ['internal'] : []].flat()
                : undefined,
        maxPrice: this.$route.query.maxPrice,
        minPrice: this.$route.query.minPrice,
        sort: this.$route.query.sort || this.defaultSort,
        limit: this.$route.query.limit || this.defaultLimit,
        offset: ((this.$route.query.page || 1) - 1) * (this.$route.query.limit || this.defaultLimit),
      })
          .then(resp => {
            this.totalPages = Math.ceil(resp.data.count / (this.$route.query.limit || this.defaultLimit))
            this.specialists = resp.data.specialists
            this.$nextTick(() => {
              this.$vuetify.goTo(0)
            })
          })
          .catch()
          .finally(() => {
            this.removeGlobalLoadingProcess()
          })
    },
    getFilters() {
      this.addGlobalLoadingProcess()
      this.getData('http://localhost:3000/filters')
          .then(resp => {
            this.methodParams = resp.data.methods
            this.specializationParams = resp.data.specializations
            this.minPriceParam = resp.data.price.min
            this.minPrice = this.minPrice || resp.data.price.min
            this.maxPriceParam = resp.data.price.max
            this.maxPrice = this.maxPrice || resp.data.price.max
          })
          .finally(() => {
            this.removeGlobalLoadingProcess()
          })
    },
    changePage(page) {
      this.$router.push({name: 'specialists', query: {...this.$route.query, page}})
      this.specialists = []
      this.getSpecialists()
    },
    changeSortOrder(order) {
      this.$router.push({name: 'specialists', query: {...this.$route.query, sort: order, page: undefined}})
      this.specialists = []
      this.getSpecialists()
    },
    find() {
      this.$router.push(
          {
            name: 'specialists',
            query: {
              ...this.$route.query,
              page: undefined,
              methods: this.methods,
              specializations: this.specializations,
              opportunities: this.opportunities,
              internal: this.internal || undefined,
              maxPrice: this.maxPrice,
              minPrice: this.minPrice,
            }
          })
      this.getSpecialists()
    },
    drop() {
      this.internal = false
      this.methods = []
      this.opportunities = []
      this.specializations = []
      this.$router.push({
        name: 'specialists',
      })
      this.getSpecialists()
    }
  },
  computed: {
    opportunityParams() {
      return this.$store.state.params.opportunities.filter(opt => opt.value !== 'internal')
    },
    sortOptions() {
      return this.$store.state.params.specSort
    },
  },
  mounted() {
    this.methods = this.$route.query.methods ? [this.$route.query.methods].flat() : []
    this.specializations = this.$route.query.specializations ? [this.$route.query.specializations].flat() : []
    this.opportunities = this.$route.query.opportunities ? [this.$route.query.opportunities].flat() : []
    this.internal = !!this.$route.query.internal
    this.maxPrice = this.$route.query.maxPrice | 0
    this.maxPrice = this.$route.query.minPrice | 0
    this.sort = this.$route.query.sort || 4
    this.getSpecialists()
    this.getFilters()
  },
  components: {SpecialistsNotFound, SelectInput, UiPagination, SpecialistsFilters, UiContentWrapper, SpecialistList},
  mixins: [requests, loader],
  metaInfo() {
    return {
      title: !this.isGlobalLoading ? 'Подбор специалистов' : null
    }
  }
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