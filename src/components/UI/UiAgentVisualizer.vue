<template>
  <v-card elevation="0" :max-width="width" style="border-radius: 25%">
    <v-row>
      <v-badge overlap color="none" :offset-x="25" :offset-y="18" left>
        <template v-slot:badge>
          <v-avatar size="20">
            <v-img :src="browser"></v-img>
          </v-avatar>
        </template>
        <v-img :src="os" :width="width" :max-width="width" :height="width" >

        </v-img>
      </v-badge>
    </v-row>
  </v-card>
</template>

<script>
import parser from 'ua-parser-js'

export default {
  name: "UiAgentVisualizer",
  data() {
    return {}
  },
  props: {
    userAgent: {
      type: String,
      default: window.navigator.userAgent
    },
    width: {
      type: [String, Number],
      default: 70
    },
  },
  computed: {
    os() {
      const os = new parser(this.userAgent).getOS().name

      switch (os) {
        case 'Android':
        case 'Android-x86':
          return require('@/assets/images/agents/android.png')
        case 'iOS':
        case 'Mac OS':
          return require('@/assets/images/agents/apple.png')
        case 'Windows':
        case 'Windows Phone':
        case 'Windows Mobile':
          return require('@/assets/images/agents/microsoft.png')
        case 'Unix':
        case 'Debian':
        case 'Linux':
        case 'Ubuntu':
          return require('@/assets/images/agents/linux.png')
        default:
          return require('@/assets/images/agents/unknow.png')
      }
    },
    browser() {
      const browser = new parser(this.userAgent).getBrowser().name

      switch (browser) {
        case 'Chrome':
        case 'Chromium':
        case 'Chrome WebView':
        case 'Chrome Headless':
          return require('@/assets/images/agents/chrome.png')
        case 'Opera':
        case 'Opera Coast':
        case 'Opera Mini':
        case 'Opera Mobi':
        case 'Opera Tablet':
          return require('@/assets/images/agents/opera.png')
        case 'Yandex':
          return require('@/assets/images/agents/yandex.png')
        case 'Mobile Safari':
        case 'Safari':
          return require('@/assets/images/agents/safari.png')
        case 'IE':
        case 'IEMobile':
          return require('@/assets/images/agents/internet-explorer.png')
        case 'Firefox':
        case 'Firefox Focus':
        case 'Firefox Reality':
          return require('@/assets/images/agents/firefox.png')
        default:
          return require('@/assets/images/agents/internet.png')
      }
    }
  }
}
</script>

<style scoped>

</style>