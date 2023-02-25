<template>
  <base-dialog
      max-width="370"
      :value="true"
      @close="$root.$emit('close-find-user')"
  >
    <default-input
        v-model="row"
        :placeholder="$t('common.labels.find-tags')"
        :required="false"
        hide-details
        @input="getUsers"
    ></default-input>

    <v-list>
      <v-list-item
          class="pa-1"
          v-for="user in users"
          :key="user._id"
      >

        <v-row align="center">
          <v-btn
              color="green"
              fab
              x-small
              outlined
              @click="$root.$emit('close-find-user', user)"
          >
            <v-icon color="green">mdi-plus</v-icon>
          </v-btn>

          <ui-avatar
              class="ml-2"
              :images="user.avatar?.images"
              :img-size="64"
              size="50"
          ></ui-avatar>

          <v-col class="pa-0 ml-3">
            <p class="sans text-subtitle-1 font-weight-bold ma-0">
              {{ user.surname }} {{ user.name }}
            </p>
            <p class="text-caption sans ma-0">
              {{ user.email }}
            </p>
          </v-col>
        </v-row>

      </v-list-item>
      <p v-if="!users.length" class="ma-0">
        {{$t('common.ui.no-users')}}
      </p>
    </v-list>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog";
import DefaultInput from "@/components/UI/Inputs/DefaultInput";
import UiAvatar from "@/components/UI/UiAvatar";
import requests from "@/mixins/requests";

export default {
  name: "FindUserDialog",
  components: {
    UiAvatar,
    DefaultInput,
    BaseDialog
  },
  mixins: [requests],
  data() {
    return {
      row: '',
      users: []
    }
  },
  methods: {
    getUsers() {
      this.getData(`data/findUser?row=${this.row}`, {handleError: true})
          .then(resp => {
            this.users = resp.data
          })
          .catch(() => {
          })
    }
  },
  mounted() {
    this.getUsers()
  },
}
</script>

<style scoped>

</style>