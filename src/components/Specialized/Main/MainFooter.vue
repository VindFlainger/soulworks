<template>
  <v-footer v-show="show">
    <v-container fluid class="d-flex justify-center">
      <v-responsive
          width="100%"
          max-width="1450"
          class="pr-md-16 pl-md-16"
          style="border-top: 1px solid"
      >
        <v-row>

          <v-col>
            <h3 class="comfortaa font-weight-bold text-h6">{{ $t('footer.for-clients') }}</h3>

            <v-list class="pa-0" color="transparent">
              <v-list-item
                  v-for="link in clientLinks"
                  :key="link.name"
                  class="pa-0"
              >
                <router-link :to="link.to" class="link">{{ link.name }}</router-link>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <h3 class="comfortaa font-weight-bold text-h6">{{ $t('footer.for-specialists') }}</h3>

            <v-list class="pa-0" color="transparent">
              <v-list-item
                  v-for="link in specialistLinks"
                  :key="link.name"
                  class="pa-0"
              >
                <router-link :to="link.to" class="link">{{ link.name }}</router-link>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <h3 class="comfortaa font-weight-bold text-h6">{{ $t('footer.interacting') }}</h3>

            <v-list class="pa-0" color="transparent">
              <v-list-item
                  v-for="link in interactingLinks"
                  :key="link.name"
                  class="pa-0"
              >
                <router-link :to="link.to" class="link">{{ link.name }}</router-link>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <h3 class="comfortaa font-weight-bold text-h6">{{ $t('footer.help') }}</h3>

            <p class="link fs-18">{{ helpNumber }}</p>
            <p class="link mt-3">
              {{ $t('footer.help-about') }}
            </p>
          </v-col>

        </v-row>
      </v-responsive>
    </v-container>

  </v-footer>
</template>

<script>

export default {
  name: "MainFooter",
  data() {
    return {
      hideRouteNames: ['chat', 'chats'],
      helpNumber: '+8801 123 45 67'
    }
  },
  computed: {
    show() {
      return this.hideRouteNames.every(name => name !== this.$route.name)
    },
    clientLinks() {
      return [
        {
          name: this.$t('footer.find-specialist'),
          to: {name: 'specialists'}
        },
        {
          name: this.$t('footer.working-info'),
          to: {name: 'about'}
        }
      ]
    },
    specialistLinks() {
      return [
        {
          name: this.$t('footer.personal-account'),
          to: {name: 'specAccount'}
        },
        {
          name: this.$t('footer.send-request'),
          to: {name: 'about'}
        }
      ]
    },
    interactingLinks() {
      return [
        {
          name: this.$t('footer.about'),
          to: {name: 'about'}
        },
        {
          name: this.$t('footer.reviews'),
          to: {name: 'about'}
        },
        {
          name: this.$t('footer.qa'),
          to: {name: 'qa'}
        }
      ]
    }
  }
}
</script>

<style scoped>
.link {
  font-size: 16px;
  font-family: "Open Sans", sans-serif !important;
  text-decoration: none;
  color: black;
  font-weight: 400;
  text-align: left;
}


.v-list-item {
  min-height: 20px;
}
</style>