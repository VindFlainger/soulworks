<template>
  <base-dialog
      max-width="370"
      :value="true"
      @close="$root.$emit('close-find-user')"
  >
    <default-input
        v-model="row"
        placeholder="Имя/фамилия/@id"
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
          <v-btn color="green"
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
            <div class="fs-20 font-weight-medium">
              {{ user.surname }} {{ user.name }}
            </div>
            <div>
              {{ user.email }}
            </div>
          </v-col>
        </v-row>

      </v-list-item>
      <div v-if="!users.length">
        Пользователи не найдены
      </div>
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
  components: {UiAvatar, DefaultInput, BaseDialog},
  mixins: [requests],
  data() {
    return {
      row: '',
      users: []
    }
  },
  methods: {
    getUsers() {
      this.getData(`http://localhost:3000/data/findUser?row=${this.row}`)
          .then(resp => {
            this.users = resp.data
          })
          .catch()
    }
  },
  mounted() {
    this.getUsers()
  },
}
</script>

<style scoped>

</style>