<template>
  <ui-content-wrapper>

    <v-card style="border-radius: 15px" color="white" class="fill-height pa-4" outlined elevation="0">

      <ui-avatar-text :avatar="require('@/assets/images/persons/user.png')" text="Правила для пользователя"></ui-avatar-text>
      <div v-for="(group, index) in $store.state.content.rules.user" :key="group.group">
        <div class="fs-18 font-title font-weight-bold pa-2 rules__chip mt-5" style="background: #ecf5fc">
          <div class="rules__chip-text">Блок {{index + 1}} - {{group.group}}</div>
        </div>
        <ui-beauty-list :items="group.rules">
          <template #marker="{item}">
            {{ item.number }}
          </template>
        </ui-beauty-list>
      </div>

      <ui-avatar-text :avatar="require('@/assets/images/persons/specialist.png')" text="Правила для специалистов" color="orange lighten-5"></ui-avatar-text>
      <div v-for="(group, index) in $store.state.content.rules.specialist" :key="group.group">
        <div class="fs-18 font-title font-weight-bold pa-2 rules__chip mt-5" style="background: #fcf6ec">
          <div class="rules__chip-text">Блок {{index + 1}} - {{group.group}}</div>
        </div>
        <ui-beauty-list :items="group.rules">
          <template #marker="{item}">
            {{ item.number }}
          </template>
        </ui-beauty-list>
      </div>

    </v-card>

  </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import UiAvatarText from "@/components/UI/UiAvatarText";
import UiBeautyList from "@/components/UI/UiBeautyList";

export default {
  name: "RulesView",
  components: {UiBeautyList, UiAvatarText, UiContentWrapper},
  metaInfo: {
    title: 'Правила'
  }
}
</script>

<style scoped>
.rules__chip {
  width: 350px;
  border-radius: 15px;
  line-height: 100%;
  letter-spacing: 1px;
  border: 1px dashed black !important;
}

.rules__chip-text {
  position: relative;
  top: 1px;
}
</style>