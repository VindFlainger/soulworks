<template>
    <transition-group name="material-transition" tag="div" class="row">
      <user-materials-card
          class="col-6 col-md-4"
          v-for="material in materials"
          :key="material.id"
          :id="material.id"
          :name="material.name"
          :description="material.description"
          :created-date="material.createdAt"
          :readers="material.readers"
          :likes="material.likes"
          :liked="material.liked"
          :documents="material.documents"
          :preview-img="material.previewImage?.url"
          :owner="material.owner"
          :like-loading="material.likeLoading"
          :unsubscribe-loading="material.unsubscribeLoading"
          @like-change="$emit('like-change', material)"
          @show-more="$emit('show-more', material)"
          @unsubscribe="$emit('unsubscribe', material)"
      ></user-materials-card>
    </transition-group>
</template>

<script>


import UserMaterialsCard from "@/components/Specialized/Account/User/MaterialsTab/UserMaterialsCard.vue";

export default {
  name: "UserMaterialsList",
  components: {UserMaterialsCard},
  props: {
    materials: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.material-transition-leave-active{
  transition: 0.3s linear;
}

.material-transition-enter-active{
  transition: 0.5s linear;
}


.material-transition-leave-to {
  transform: scale(0);
}

.material-transition-enter{
  opacity: 0;
}

</style>