<template>
  <div>
    <div style="margin-top: -128px; padding-top: 128px; height: 100vh">
      <ui-content-wrapper >

        <v-row align="center" class="fill-height" justify="space-between">
          <v-card width="40%" min-width="500" elevation="0" class="pa-4" color="transparent">
            <div class="text-left fs-32 black--text font-title" style="line-height: 100%">
              Подберите психолога, подходящего именно вам
            </div>
            <div class="text-left mt-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad adipisci earum illum ipsum modi nemo,
              numquam,
              omnis porro rerum sapiente voluptatibus! A ad, aspernatur atque corporis debitis deleniti deserunt
              dolorem
              doloribus eos excepturi expedita explicabo facilis fugiat id illum ipsam iure labore laboriosam
              laudantium
              odio pariatur possimus provident quam qui quibusdam rem repellat ullam, vel veniam vitae voluptas
              voluptatem.
            </div>
            <v-card-actions class="pa-0 mt-6">
              <v-btn x-large color="blue lighten-4" style="text-transform: none">
                Подобрать психолога
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-spacer></v-spacer>

          <v-spacer></v-spacer>




        </v-row>

      </ui-content-wrapper>



      <div class="header__background">
        <div class="background__over"></div>
      </div>
    </div>

    <div >
      <ui-content-wrapper style="background: linear-gradient(180deg, #FFFFFF 0%, #ECEFF1 100%)">
        <v-row justify="start">
          <v-lazy>
            <ui-number-card
                color="none"
                title="Заполнить анкету"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus rhoncus blandit. Aenean sed orci lacinia, pretium mauris et, sollicitudin nulla. "
                number="1"
            >
            </ui-number-card>
          </v-lazy>

        </v-row>


        <v-row justify="end">


            <ui-number-card
                title="Что-то еще"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus rhoncus blandit. Aenean sed orci lacinia, pretium mauris et, sollicitudin nulla. "
                number="2"
            >
            </ui-number-card>



        </v-row>


        <v-row justify="start">
          <ui-number-card
              title="И еще что-то"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus rhoncus blandit. Aenean sed orci lacinia, pretium mauris et, sollicitudin nulla. "
              number="3"
          >
          </ui-number-card>
        </v-row>

        <v-row justify="end">
          <ui-number-card
              title="И вот конец"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus rhoncus blandit. Aenean sed orci lacinia, pretium mauris et, sollicitudin nulla. "
              number="4"
          >
          </ui-number-card>
        </v-row>

      </ui-content-wrapper>


    </div>
  </div>


</template>

<script>
import UiNumberCard from "@/components/UI/UiNumberCard";
import UiContentWrapper from "@/components/UI/UiContentWrapper";

export default {
  name: "MainView",
  components: {UiNumberCard, UiContentWrapper},
  mounted() {
    if (this.$route.query.redirect){
      this.$root.$emit('show-login')
    }
  }
}
</script>

<style scoped>
.header__background {
  background: url('@/assets/images/main_background.png') 0 0 / cover;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  margin-top: -128px;
}

.background__over{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(65deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.05));
}
</style>