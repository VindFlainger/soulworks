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
    }
  },
  computed: {
    tabs() {
      return [
        {
          title: this.$t('account.spec.personal-data.section-name'),
          link: {name: 'specAccount'}
        },
        {
          title: this.$t('account.spec.timetable.section-name'),
          link: {name: 'specTimetable'}
        },
        {
          title: this.$t('account.spec.classes.section-name'),
          link: {name: 'specClasses'}
        },
        {
          title: this.$t('account.spec.reviews.section-name'),
          link: {name: 'specReviews'}
        },
        {
          title: this.$t('account.spec.qualification.section-name'),
          link: {name: 'specQualification'}
        },
        {
          title: this.$t('account.spec.materials.section-name'),
          link: {name: 'specMaterials'}
        },
        {
          title: this.$t('account.spec.security.section-name'),
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