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
import ProfileTabs from "@/components/Account/AccountTabs";
import UiContentWrapper from "@/components/UI/UiContentWrapper";
export default {
  name: "UserAccountView",
  components: {UiContentWrapper, ProfileTabs},
  data(){
    return {
      tab: 'account',
      tabs: [
        {
          title: 'личная информация',
          link: {name: 'userAccount'}
        },
        {
          title: 'консультации',
          link: {name: 'userClasses'}
        },
        {
          title: 'отзывы',
          link: {name: 'userReviews'}
        },
        {
          title: 'материалы',
          link: {name: 'userMaterials'}
        },
        {
          title: 'безопасность',
          link: {name: 'userSecurity'}
        },
        {
          title: 'избранное',
          link: {name: 'userFavourites'}
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