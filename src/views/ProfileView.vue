<template>
  <ui-content-wrapper>
    <div v-if="loaded">

      <booking-dialog :value="bookingDialogVisible"
                      :spec-id="$route.params.id"
                      @close="bookingDialogVisible = false"
      ></booking-dialog>

      <v-card style="border-radius: 15px"
              color="white"
              class="fill-height pa-4"
              elevation="0">

        <div>
          <span class="fs-24 font-weight-light">Профиль пользователя </span>
          <span class="fs-24 font-weight-bold">{{ name }} {{ surname }}  </span>
        </div>

        <v-row class="mt-3">
          <div>
            <ui-avatar :size="200"
                       :img-size="256"
                       :images="avatar?.images"
            ></ui-avatar>

            <div class="mt-4 d-flex flex-column align-center">

              <ui-confirm-button width="160"
                                 class="ma-1"
                                 @click="$router.push({name: 'chat', params: {id: $route.params.id}})"
                                 v-if="$route.params.id !== $store.state.id"
              >
                Написать
              </ui-confirm-button>

              <ui-confirm-button v-if="role === 'spec' && $store.state.role !== 'spec'"
                                 width="160" class="ma-1"
                                 @click="booking">
                Записаться
              </ui-confirm-button>

            </div>
          </div>

          <v-col class="pa-0 ml-8">
            <profile-info-cards
                :role="role | role | capitalize"
                :phone="phone | phone"
                :email="email"
                :registration-date="registrationDate"
                :sex="sex | sex | capitalize"
                :activity-date="activityDate"
                :id="id"
                :missed="sessionStats.missed"
                :confirmed="sessionStats.confirmed"
                :cancelled="sessionStats.cancelled"
            ></profile-info-cards>
          </v-col>
        </v-row>


        <profile-spec v-if="role === 'spec'"
                      :methods="methods"
                      :specializations="specializations"
                      :phone="contactPhone"
                      :messengers="messengers"
                      :links="links"
                      :address="address"
                      :connection="connection"
                      :about-full="aboutFull"
                      :category="category"
                      :education="education"
                      :price="price"
                      :opportunities="[
                         opportunities.family?'Семейная консультация':null,
                         opportunities.teens?'Работа с подростками':null,
                         opportunities.children?'Работа с детьми':null,
                         opportunities.intenal?'Очная консультация':null,
                   ].filter(el => el)"
                      class="mt-3"
        ></profile-spec>
      </v-card>
    </div>

  </ui-content-wrapper>
</template>

<script>
import UiContentWrapper from "@/components/UI/UiContentWrapper";
import ProfileInfoCards from "@/components/Specialized/Profile/ProfileInfoCards";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton";
import ProfileSpec from "@/components/Specialized/Profile/ProfileSpec";
import BookingDialog from "@/components/Dialogs/BookingDialog";
import requests from "@/mixins/requests";
import UiAvatar from "@/components/UI/UiAvatar";
import {role, sex} from "@/filters/logic";

export default {
  name: "UserProfileView",
  data() {
    return {
      loaded: false,

      bookingDialogVisible: false,
      avatar: '',
      name: '',
      surname: '',
      phone: '',
      role: '',
      email: '',
      registrationDate: '',
      activityDate: '',
      id: '',
      sessionStats: {},
      sex: '',

      methods: [],
      specializations: [],
      contactPhone: '',
      messengers: [],
      links: [],
      address: '',
      connection: '',
      aboutFull: '',
      opportunities: {},
      category: {},
      education: [],
      price: {}
    }
  },
  methods: {
    getProfileInfo() {
      this.getData(`http://localhost:3000/data/about?userId=${this.$route.params.id}`)
          .then(resp => {

            this.avatar = resp.data.avatar
            this.name = resp.data.name
            this.surname = resp.data.surname
            this.phone = resp.data.number
            this.role = resp.data.role
            this.email = resp.data.email
            this.registrationDate = resp.data.registrationDate
            this.activityDate = resp.data.activityDate
            this.id = resp.data._id
            this.sessionStats = resp.data.statistic.sessions
            this.sex = resp.data.sex


            if (resp.data.role === 'spec') {
              this.methods = resp.data.methods
              this.specializations = resp.data.specializations
              this.contactPhone = resp.data.contacts.phone
              this.messengers = resp.data.contacts.messengers
              this.links = resp.data.contacts.links
              this.address = resp.data.contacts.address
              this.connection = resp.data.contacts.connection
              this.aboutFull = resp.data.about.full
              this.category = resp.data.qualification.category
              this.education = resp.data.qualification.education
              this.price = resp.data.price
            }

            this.loaded = true

            this.$meta().refresh()
          })
          .catch(err => {
            if (err.response.data.code === 3 || err.response.data.code === 1) {
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
  components: {
    UiAvatar,
    BookingDialog,
    ProfileSpec,
    UiConfirmButton,
    ProfileInfoCards,
    UiContentWrapper
  },
  mounted() {
    this.getProfileInfo()
  },
  mixins: [requests],
  filters: {
    role,
    sex
  },
  metaInfo() {
    return {
      title: this.name ? `Профиль ${this.name}` : null
    }
  }
}
</script>

<style scoped>
.info__label {
  font-weight: 500;
}
</style>