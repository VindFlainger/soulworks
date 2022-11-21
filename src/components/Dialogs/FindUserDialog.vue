<template>
  <base-dialog :value="true" @close="$root.$emit('close-find-user')" max-width="370">
      <default-input placeholder="Имя/фамилия/@id" v-model="row" @input="getUsers" :required="false" hide-details></default-input>
    <v-list >
      <v-list-item v-for="user in users" :key="user._id" class="pa-1">
          <v-row align="center">
            <v-btn fab x-small outlined color="green" @click="$root.$emit('close-find-user', user)">
                <v-icon color="green">mdi-plus</v-icon>
            </v-btn>
            <ui-avatar :images="user.avatar?.images" :img-size="64" size="50" class="ml-2"></ui-avatar>
            <v-col class="pa-0 ml-3">
                <div class="fs-20 font-weight-medium">
                  {{user.surname}} {{user.name}}
                </div>
                <div>
                  {{user.email}}
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
  data(){
    return {
      row: '',
      users: []
    }
  },
  methods: {
    getUsers(){
      this.getData(`http://localhost:3000/data/findUser?row=${this.row}`)
        .then(resp => {
          this.users = resp.data
        })
    }
  },
  mounted() {
    this.getUsers()
  },
  components: {UiAvatar, DefaultInput, BaseDialog},
  mixins: [requests]
}
</script>

<style scoped>

</style>