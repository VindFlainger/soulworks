<template>
  <div>
    <specialist-card v-for="specialist in specialists"
                     :specialist="specialist"
                     :key="specialist._id"
                     style="border-radius: 15px"
                     class="mb-4"
                     @open-contacts="contacts = $event"
                     @open-booking="specId = $event"
    >
    </specialist-card>

    <contacts-dialog :value="!!contacts"
                     :name="contacts?.name || ''"
                     :surname="contacts?.surname || ''"
                     :phone="contacts?.phone || ''"
                     :address="contacts?.address"
                     :connection="contacts?.connection"
                     :messengers="contacts?.messengers"
                     :links="contacts?.links"
                     @close="contacts = null"
    >
    </contacts-dialog>


    <booking-dialog :value="!!specId"
                    :spec-id="specId"
                    @close="specId = null">
    </booking-dialog>
  </div>
</template>

<script>
import SpecialistCard from "@/components/Specialists/SpecialistCard";
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