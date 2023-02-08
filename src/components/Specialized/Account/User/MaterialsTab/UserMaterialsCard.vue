<template>
    <v-card
        elevation="0"
        class="user-materials-card"
    >
      <div class="user-materials-card__wrapper bordered" style="position:relative">

        <div class="user-materials-card__visual">
          <img
              :src="previewImg || require('@/assets/images/material-nophoto.png')"
              class="user-materials-card__img"
              alt=""
          >
          <user-materials-tools
              class="user-materials-card__tools mt-2"
              :readers="readers"
              :liked="liked"
              :likes="likes"
              @like-change="$emit('like-change')"
              :like-loading="likeLoading"
          ></user-materials-tools>
        </div>

        <div class="user-materials-card__content pa-2" style="position:relative">

          <h3 class="fs-20 font-weight-bold text-one-line user-materials-card__title">{{ name }}</h3>

          <v-row class="mt-10 flex-nowrap">
            <router-link :to="{name: 'profile', params: {id: owner.id}}">
              <ui-avatar
                  :images="owner?.avatar?.images" :img-size="64" size="64">
              </ui-avatar>
            </router-link>
            <div class="ml-3">
              <h4 class="fs-20 font-weight-medium">Автор</h4>
              <router-link :to="{name: 'profile', params: {id: owner.id}}"
                           class="fs-18 black--text text-decoration-none">
                {{ owner.name }} {{ owner.surname }}
              </router-link>
            </div>
          </v-row>

          <v-row class="mt-4 flex-nowrap">
            <ui-default-button
                :disabled="unsubscribeLoading"
                @click="$emit('unsubscribe')">
              Отписаться
            </ui-default-button>
            <v-spacer></v-spacer>
            <ui-confirm-button
                :disabled="unsubscribeLoading"
                @click="$emit('show-more')">
              Просмотр
            </ui-confirm-button>
          </v-row>

        </div>
      </div>
    </v-card>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar.vue";
import UserMaterialsTools from "@/components/Specialized/Account/User/MaterialsTab/UserMaterialsTools.vue";
import requests from "@/mixins/requests";
import UiDefaultButton from "@/components/UI/Buttons/UiDefaultButton.vue";
import UiConfirmButton from "@/components/UI/Buttons/UiConfirmButton.vue";

export default {
  name: "UserMaterialsCard",
  components: {UiConfirmButton, UiDefaultButton, UserMaterialsTools, UiAvatar},
  mixins: [requests],
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    readers: {
      type: Number,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    liked: {
      type: Boolean,
      required: true
    },
    createdDate: {
      type: String,
      required: false
    },
    documents: {
      type: Array,
      required: true
    },
    previewImg: {
      type: String,
      required: false
    },
    owner: {
      type: Object,
      required: false
    },
    likeLoading: {
      type: Boolean,
      default: false
    },
    unsubscribeLoading: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
.user-materials-card__wrapper {
  height: 380px;
  overflow: hidden;
}


.user-materials-card__visual {
  position: relative;
  height: 200px;
}

.user-materials-card__img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}


.user-materials-card__tools {
  position: absolute;
  bottom: 2px;
  right: 2px;

}

.user-materials-card__title {
  max-width: 95%;
  position: absolute;
  overflow: hidden;
  flex: 1;
  text-align: left
}




</style>