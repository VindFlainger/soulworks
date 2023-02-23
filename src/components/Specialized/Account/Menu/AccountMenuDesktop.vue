<template>
  <v-tabs
      class="profile-tabs"
      slider-color="transparent"
      vertical
  >
    <v-tab
        class="justify-start black--text"
        style="min-width: 240px"
        v-for="tab in tabs"
        :key="tab.title"
        :to="tab.link"
        active-class="black--text white"
        :ripple="false"
    >
      {{ tab.title | capitalize }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "AccountMenuDesktop",
  props: {
    tabs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.v-tab {
  position: relative;
  background: #ECEFF1;
  text-transform: capitalize;
  font-family: Comfortaa, sans-serif;
  color: black;
}

.v-tab::after {
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  top: calc(100% - 1px);
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  z-index: 100;
}

.v-tab--active::before {
  display: none;
}

.profile-tabs >>> .v-tabs-bar {
  background: #ECEFF1 !important;
}

a {
  border-radius: 20px 0 0 20px;
  overflow: hidden;
}
</style>