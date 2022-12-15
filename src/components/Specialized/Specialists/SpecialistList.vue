<template>
  <div>

    <specialist-card
        v-for="specialist in specialists"
        :id="specialist._id"
        :name="specialist.name"
        :surname="specialist.surname"
        :sex="specialist.sex"
        :short-about="specialist.about.short"
        :avatar="specialist.avatar"
        :opportunities="specialist.opportunities"
        :contacts="specialist.contacts"
        :reviews="specialist.reviews"
        :active="specialist.active"
        :registered="specialist.registered"
        :internal-price="specialist.price.internal"
        :online-price="specialist.price.online"
        :premium="specialist.privileges.premium"
        :degree="specialist.degree"
        :medals="specialist.privileges.medals"
        :stats="specialist.stats"
        :key="specialist._id"
        style="border-radius: 15px"
        class="mb-4"
        @open-contacts="contacts = {...specialist.contacts, name: specialist.name, surname: specialist.surname}"
        @open-booking="specId = specialist._id"
    ></specialist-card>

    <contacts-dialog
        :value="!!contacts"
        :name="contacts?.name || ''"
        :surname="contacts?.surname || ''"
        :phone="contacts?.phone || ''"
        :address="contacts?.address"
        :connection="contacts?.connection"
        :messengers="contacts?.messengers"
        :links="contacts?.links"
        @close="contacts = null"
    ></contacts-dialog>

    <booking-dialog
        :value="!!specId"
        :spec-id="specId"
        @close="specId = null"
    ></booking-dialog>

  </div>
</template>

<script>
import SpecialistCard from "@/components/Specialized/Specialists/SpecialistCard";
import ContactsDialog from "@/components/Dialogs/ContactsDialog";
import BookingDialog from "@/components/Dialogs/BookingDialog";


export default {
  name: "SpecialistList",
  data() {
    return {
      contacts: null,
      specId: null
    }
  },
  components: {BookingDialog, ContactsDialog, SpecialistCard},
  props: {
    specialists: Array,
  }
}
</script>

<style scoped>

</style>