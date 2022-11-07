<template>
  <v-row justify="start" align="start">
    <ui-info-card
        title="Роль"
        :img="require('@/assets/images/profile/role.png')"
        :text="role"
    >
    </ui-info-card>
    <ui-info-card
        title="Телефон"
        :img="require('@/assets/images/profile/phone.png')"
        :text="phone"
    >
    </ui-info-card>
    <ui-info-card
        title="Пол"
        :img="require('@/assets/images/profile/gender.png')"
        :text="sex"
    >
    </ui-info-card>
    <ui-info-card
        title="Идентификатор"
        :img="require('@/assets/images/profile/id.png')"
        :text="id"
    >
    </ui-info-card>
    <ui-info-card
        title="Почта"
        :img="require('@/assets/images/profile/email.png')"
        :text="email"
    >
    </ui-info-card>
    <ui-info-card
        title="Активность"
        :img="require('@/assets/images/profile/activity.png')"
        :text="activityDate"
    >
    </ui-info-card>
    <ui-info-card
        title="Регистрация"
        :img="require('@/assets/images/profile/register.png')"
        :text="registrationDate"
    >
    </ui-info-card>
    <ui-info-card
        title="Отменено"
        :img="require('@/assets/images/profile/cancell.png')"
        :text="cancelled + ' занятий'"
    >
    </ui-info-card>
    <ui-info-card
        title="Подтверждено"
        :img="require('@/assets/images/profile/confirm.png')"
        :text="confirmed + ' занятий'"
    >
    </ui-info-card>
    <ui-info-card
        title="Пропущено"
        :img="require('@/assets/images/profile/miss.png')"
        :text="missed + ' занятий'"
    >
    </ui-info-card>

  </v-row>
</template>

<script>
import UiInfoCard from "@/components/UI/UiInfoCard";

export default {
  name: "ProfileInfoCards",
  components: {UiInfoCard},
  props: {
    role: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    registrationDate: {
      type: String,
      required: true
    },
    activityDate: {
      type: String,
      required: true
    },
    cancelled: {
      type: [String, Number],
      required: true
    },
    missed: {
      type: [String, Number],
      required: true
    },
    confirmed: {
      type: [String, Number],
      required: true
    },
  }
}
</script>

<style scoped>

</style>