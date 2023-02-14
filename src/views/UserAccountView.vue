<template>
  <ui-content-wrapper style="background: #ECEFF1">
    <v-row class="flex-nowrap">
      <account-menu-desktop
          v-if="viewportHook({base: false, md: true})"
          :tabs="tabs"
      ></account-menu-desktop>
      <account-menu-mobile
          v-else
          :tabs="tabs"
      ></account-menu-mobile>
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

import UiContentWrapper from "@/components/UI/UiContentWrapper";
import AccountMenuDesktop from "@/components/Specialized/Account/Menu/AccountMenuDesktop.vue";
import AccountMenuMobile from "@/components/Specialized/Account/Menu/AccountMenuMobile.vue";
export default {
  name: "UserAccountView",
  components: {AccountMenuMobile, AccountMenuDesktop, UiContentWrapper},
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