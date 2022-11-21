<template>
  <ui-content-wrapper>
    <booking-dialog :value="bookingDialogVisible" :spec-id="$route.params.id" @close="bookingDialogVisible = false">

    </booking-dialog>

    <v-card style="border-radius: 15px" color="white" class="fill-height pa-4" elevation="0">


      <div>
        <span class="fs-24 font-weight-light">Профиль пользователя </span>
        <span class="fs-24 font-weight-bold">{{ profileInfo.name }} {{ profileInfo.surname }}  </span>
      </div>
      <v-row class="mt-3">
        <div>
          <v-avatar size="200" style="border: 1px solid black; box-shadow: 0 0 0 3px white,0 0 0 4px black">
            <v-img :src="profileInfo.avatar"></v-img>
          </v-avatar>
          <div class="mt-4 d-flex flex-column align-center">
            <ui-confirm-button width="160" class="ma-1">
              Написать
            </ui-confirm-button>
            <ui-confirm-button v-if="profileInfo.role === 'spec' && $store.state.role !== 'spec'"
                               width="160" class="ma-1"
                               @click="booking">
              Записаться
            </ui-confirm-button>
          </div>
        </div>

        <v-col class="pa-0 ml-8">
          <profile-info-cards
              :role="profileInfo.role === 'spec'?'Специалист':'Пользователь'"
              :phone="'+' + profileInfo.number"
              :email="profileInfo.email"
              :registration-date="$moment(profileInfo.ragistrationDate).format('ll')"
              :sex="profileInfo.sex === 'male'?'Мужской':'Женский'"
              :activity-date="$moment(profileInfo.activityDate).format('lll')"
              :id="profileInfo._id"
              :missed="profileInfo.statistic.sessions.missed"
              :confirmed="profileInfo.statistic.sessions.confirmed"
              :cancelled="profileInfo.statistic.sessions.cancelled"
          >
          </profile-info-cards>
        </v-col>
      </v-row>

      <ui-order-bar>

      </ui-order-bar>

      <ProfileSpec v-if="profileInfo.role === 'spec'"
                   :methods="profileInfo.methods"
                   :specializations="profileInfo.specializations"
                   :phone="profileInfo.contacts.phone"
                   :messengers="profileInfo.contacts.messengers"
                   :links="profileInfo.contacts.links"
                   :address="profileInfo.contacts.address"
                   :connection="profileInfo.contacts.connection"
                   :about-full="profileInfo.about.full"
                   :category="profileInfo.qualification.category"
                   :education="profileInfo.qualification.education"
                   :price="profileInfo.price"
                   :opportunities="[
                         profileInfo.opportunities.family?'Семейная консультация':null,
                         profileInfo.opportunities.teens?'Работа с подростками':null,
                         profileInfo.opportunities.children?'Работа с детьми':null,
                         profileInfo.opportunities.intenal?'Очная консультация':null,
                   ].filter(el => el)"
                   class="mt-3"
      >

      </ProfileSpec>


    </v-card>
  </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import ProfileInfoCards from "@/components/Profile/ProfileInfoCards";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import ProfileSpec from "@/components/Profile/ProfileSpec";
import UiOrderBar from "@/components/UI/UiOrderBar";
import BookingDialog from "@/components/Dialogs/BookingDialog";
import requests from "@/mixins/requests";

export default {
  name: "UserProfileView",
  components: {BookingDialog, UiOrderBar, ProfileSpec, UiConfirmButton, ProfileInfoCards, UiContentWrapper},
  data() {
    return {
      profileInfo: undefined,
      bookingDialogVisible: false
    }
  },
  methods: {
    getProfileInfo() {
      this.getData(`http://localhost:3000/data/about?userId=${this.$route.params.id}`)
          .then(resp => {
            this.profileInfo = resp.data
          })
          .catch(err => {
            if(err.response.data.code === 3 || err.response.data.code === 1){
              this.$router.push({name: 'notfound'})
            }
          })
    },
    booking() {
      if (!this.$store.getters.isLogin) {
        this.$root.$emit('show-login')
      } else {
        this.bookingDialogVisible = true
      }
    }
  },
  mounted() {
    this.getProfileInfo()
  },
  mixins: [requests]
}
</script>

<style scoped>
.info__label {
  font-weight: 500;
}
</style>