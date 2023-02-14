<template>
  <ui-content-wrapper style="background: #ECEFF1">
    <v-row
        :class="viewportHook({base: 'flex-column',md: 'flex-nowrap'})"
    >
      <account-menu-desktop
          v-if="viewportHook({base: false, md: true})"
          :tabs="tabs"
      ></account-menu-desktop>
      <account-menu-mobile
          v-else
          :tabs="tabs"
          class="mb-2"
      ></account-menu-mobile>

      <v-tabs-items
          v-model="tab"
          style="flex-grow:1"
          :class="viewportHook({base: 'spec-account-view__items-mobile', md: 'spec-account-view__items-desktop'})"
      >
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
  name: "SpecAccountView",
  components: {AccountMenuMobile, AccountMenuDesktop, UiContentWrapper},
  data() {
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
  beforeRouteUpdate(to, from, next) {
    this.tab = to.name
    next()
  },
  mounted() {
    this.tab = this.$route.name
  },
}
</script>

<style scoped>
.v-tabs {
  flex: none;
  width: auto;
}

.spec-account-view__items-desktop {
  border-radius: 0 20px 20px 20px;
}

.spec-account-view__items-mobile {
  border-radius: 20px 20px 20px 20px;
}

</style>