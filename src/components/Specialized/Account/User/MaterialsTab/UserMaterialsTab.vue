<template>
  <div>
    <v-card class="pa-4" elevation="0">
      <ui-full-width-banner :img="require('@/assets/images/account/materials.png')">
        <div class="fill-height d-flex align-center justify-center">
          <div class="font-title pa-5 rounded"
               style="font-size: 35px; background: rgba(255,255,255,0.55); line-height: 100%; letter-spacing: 2px">
            Ваши материалы
          </div>
          <v-btn
              absolute
              right
              top
              icon
              color="blue lighten-4"
              style="background: rgba(0,0,0,0.51)"
              @click="aboutDialogVisible=true"
          >
            <v-icon size="35">mdi-progress-question</v-icon>
          </v-btn>
        </div>
      </ui-full-width-banner>

      <div class="mt-3">
        <user-materials-list
            v-if="materials"
            :materials="materials"
            @show-more="showDialog"
            @unsubscribe="unsubscribe"
            @like-change="likeChange"
        ></user-materials-list>
      </div>

      <div>
        <ui-problem
            row
            v-if="state.matches('content.unavailable')"
            @retry="getMaterials">
        </ui-problem>
        <ui-loader
            v-if="['content.fetching','content.rejected'].some(state.matches)"
            row
            class="mt-2 mb-2"
        ></ui-loader>
        <div
            v-if="state.matches('content.resolved')"
            v-observer:bottom="getMaterials"
        ></div>
      </div>


    </v-card>

    <user-materials-dialog
        :value="state.matches('dialog.visible')"
        @close="closeDialog"
        :name="selectedMaterial.name"
        :description="selectedMaterial.description"
        :created-date="selectedMaterial.createdAt"
        :documents="selectedMaterial.documents"
    ></user-materials-dialog>

    <app-dialog-materials
        :value="aboutDialogVisible"
        @close="aboutDialogVisible = false"
    ></app-dialog-materials>


  </div>
</template>

<script>
import UiFullWidthBanner from "@/components/UI/UiFullWidthBanner.vue";
import requests from "@/mixins/requests";
import UserMaterialsList from "@/components/Specialized/Account/User/MaterialsTab/UserMaterialsList.vue";
import observer from "@/directives/observer";
import UiLoader from "@/components/UI/UiLoader.vue";
import {Machine, assign} from "xstate";
import {useMachine} from "xstate-vue2";
import UserMaterialsDialog from "@/components/Specialized/Account/User/MaterialsTab/UserMaterialsDialog.vue";
import UiProblem from "@/components/UI/UiProblem.vue";
import AppDialogMaterials from "@/components/Static/Dialogs/AppDialogMaterials.vue";

const machine = Machine({
  id: 'material',
  type: 'parallel',
  context: {
    retries: 0
  },

  states: {
    dialog: {
      initial: 'hidden',
      states: {
        hidden: {
          on: {
            SHOW_DIALOG: 'visible'
          }
        },
        visible: {
          on: {
            CLOSE_DIALOG: 'hidden'
          }
        }
      }
    },
    content: {
      initial: 'waiting',
      states: {
        waiting: {
          on: {
            CONTENT_FETCH: 'fetching'
          }
        },
        fetching: {
          on: {
            CONTENT_RESOLVE: 'resolved',
            CONTENT_LOADED: 'loaded',
            CONTENT_REJECT: [
              {
                target: 'rejected',
                cond: context => context.retries < 5
              },
              {
                target: 'unavailable'
              }
            ]
          }
        },
        rejected: {
          exit: assign(context => context.retries++),
          after: {
            3000: 'waiting',
          },
        },
        resolved: {
          on: {
            CONTENT_FETCH: 'fetching'
          }
        },
        unavailable: {
          entry: assign(context => context.retries = 0),
          on: {
            CONTENT_FETCH: 'fetching',
          }
        },
        loaded: {
          type: "final"
        }
      }
    }
  }
})

export default {
  name: "UserMaterialsTab",
  components: {
    AppDialogMaterials,
    UiProblem,
    UserMaterialsDialog,
    UiLoader,
    UserMaterialsList,
    UiFullWidthBanner,
  },
  mixins: [requests],
  directives: {observer},

  data() {
    return {
      materials: undefined,
      selectedMaterial: {},
      totalCount: 0,
      offset: 0,
      aboutDialogVisible: false
    }
  },
  watch: {
    'state.value': function (val, oldVal) {
      if (val.content === 'waiting' && oldVal.content === 'rejected') {
        this.getMaterials()
      }
    }
  },
  mounted() {
    this.getMaterials()
  },
  methods: {
    getMaterials() {
      this.send('CONTENT_FETCH')
      this.getData(`http://localhost:3000/user/materials/getMaterials?offset=${this.offset}`)
          .then(resp => {
            if (this.materials) this.materials.push(...resp.data.materials)
            else this.materials = resp.data.materials
            this.offset += resp.data.materials.length
            this.totalCount = resp.data.totalCount
            if (this.offset === this.totalCount) this.send('CONTENT_LOADED')
            else this.send('CONTENT_RESOLVE')
          })
          .catch(() => {
            this.send('CONTENT_REJECT')
          })
    },
    closeDialog() {
      this.selectedMaterial = {}
      this.send('CLOSE_DIALOG')
    },
    showDialog(material) {
      this.selectedMaterial = material
      this.send('SHOW_DIALOG')
    },
    unsubscribe(material) {
      this.$set(material, 'unsubscribeLoading', true)
      this.postData('http://localhost:3000/user/materials/unsubscribeMaterial', {
        materialId: material.id
      })
          .then(() => {
            this.materials = this.materials.filter(el => el.id !== material.id)
            this.offset--
            this.totalCount--
          })
          .catch()
          .finally(() => {
            material.unsubscribeLoading = false
          })
    },
    likeChange(material) {
      this.$set(material, 'likeLoading', true)
      this.postData(`http://localhost:3000/user/materials/${material.liked ? 'delLikeMaterial' : 'setLikeMaterial'}`, {
        materialId: material.id
      })
          .then(() => {
            material.likes += material.liked ? -1 : 1
            material.liked = !material.liked
          })
          .catch()
          .finally(() => material.likeLoading = false)
    }
  },
  setup() {
    const {state, send} = useMachine(machine)

    return {
      state,
      send,
    }
  }
}
</script>

<style scoped>

</style>