<template>
  <notification-base-card
      :read="read"
      :title="$t('notifications.new-class')"
      :date="date"
  >
    <template v-slot:preview>
      <ui-avatar
          :size="64"
          :img-size="64"
          :images="avatar?.images"
      ></ui-avatar>
    </template>

    <template v-slot:content>
      <p class="text-title">
        {{ $t('common.roles.user')}}
        <router-link
            class="font-weight-medium text-decoration-none text-capitalize"
            :to="{name: 'profile', params: {id: userId}}"
        >
          {{ userName }} {{ userSurname }}
        </router-link>
        {{ $t('notifications.ordered-class')}}
      </p>
      <div class="mt-1">
        <v-row class="flex-nowrap" align="center">
          <v-icon size="35" color="black">mdi-calendar</v-icon>
          <span class="ml-2 fs-14 font-weight-medium">
            {{ $dj(classDate).format('DD.MM.YYYY') }}
          </span>
        </v-row>
      </div>

      <div class="mt-1">
        <v-row class="flex-nowrap" align="center">
          <v-icon size="35" color="black">mdi-clock</v-icon>
          <div class="ml-2 fs-14 font-weight-medium">
            {{ $dj(classDate).format('HH:mm') }}
          </div>
        </v-row>
      </div>

      <div class="mt-1">
        <v-row class="flex-nowrap" align="center">
          <v-icon size="35" color="black">mdi-account-hard-hat-outline</v-icon>
          <div class="ml-2 fs-14 font-weight-medium">{{ specialization }}</div>
        </v-row>
      </div>

      <div class="mt-1">
        <v-row class="flex-nowrap" align="center">
          <v-icon size="35" color="black">mdi-handball</v-icon>
          <div class="ml-2 fs-14 font-weight-medium">{{ method }}</div>
        </v-row>
      </div>

      <div class="mt-1">
        <v-row class="flex-nowrap" align="center">
          <v-icon size="35" color="black">mdi-ruler-square-compass</v-icon>
          <v-row class="ml-2 fs-14 font-weight-medium">
            <v-chip
                v-for="opportunity in activeOpportunities"
                :key="opportunity.value"
                small
                class="ml-0 ma-1"
            >
              {{opportunity.text | capitalize }}
            </v-chip>
          </v-row>
        </v-row>
      </div>

    </template>

    <template v-slot:actions>
      <ui-default-button
          :to="{name: 'specClasses'}"
          small
      >
        {{ $t('common.buttons.see') }}
      </ui-default-button>

      <ui-confirm-button
          v-if="!read"
          @click="$emit('read')"
          small
      >
        {{ $t('common.buttons.read') }}
      </ui-confirm-button>
    </template>
  </notification-base-card>
</template>

<script>
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton";
import UiAvatar from "@/components/UI/UiAvatar";
import NotificationBaseCard from "@/components/Specialized/Notification/NotificationBaseCard";

export default {
  name: "NotificationBookingCard",
  components: {
    NotificationBaseCard,
    UiAvatar,
    UiDefaultButton,
    UiConfirmButton
  },
  props: {
    read: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    classDate: {
      type: Number,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    opportunities: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userSurname: {
      type: String,
      required: true
    },
    avatar: {
      type: Object,
      required: false
    }
  },
  computed: {
    activeOpportunities() {
      return this.$store.state.params.opportunities.filter(opt => this.opportunities[opt.value])
    }
  },
}
</script>

<style scoped>

</style>