<template>
  <ui-content-wrapper style="background: #ECEFF1">
    <v-row class="flex-nowrap">
      <profile-tabs :tabs="tabs"></profile-tabs>
      <v-tabs-items v-model="tab" style="border-radius: 0 20px 20px 20px;  flex-grow: 1">
        <v-tab-item :value="$route.name">
          <keep-alive>
            <router-view style="min-height: 500px"></router-view>
          </keep-alive>
        </v-tab-item>
      </v-tabs-items>
    </v-row>


  </ui-content-wrapper>

</template>

<script>
import ProfileTabs from "@/components/Specialized/Account/AccountTabs";
import UiContentWrapper from "@/components/UI/UiContentWrapper";
export default {
  name: "SpecAccountView",
  components: {UiContentWrapper, ProfileTabs},
  data(){
    return {
      tab: 'account',
      tabs: [
        {
          title: 'личная информация',
          link: {name: 'specAccount'}
        },
        {
          title: 'расписание',
          link: {name: 'specTimetable'}
        },
        {
          title: 'консультации',
          link: {name: 'specClasses'}
        },
        {
          title: 'отзывы',
          link: {name: 'specReviews'}
        },
        {
          title: 'квалификация',
          link: {name: 'specQualification'}
        },
        {
          title: 'материалы',
          link: {name: 'specMaterials'}
        },
        {
          title: 'безопасность',
          link: {name: 'specSecurity'}
        }
      ]
    }
  },
  beforeRouteUpdate(to, from, next){
    this.tab = to.name
    next()
  },
  mounted() {
    this.tab = this.$route.name
  }
}
</script>

<style scoped>
.v-tabs{
  flex: none;
  width: auto;
}


</style>