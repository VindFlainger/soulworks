<template>
  <v-dialog :value="true" width="80%" content-class="white" @click:outside="$root.$emit('close-registration')">
    <v-stepper v-model="step" elevation="0" flat class="stepper">
      <v-stepper-header>
        <v-divider></v-divider>
        <v-stepper-step step="1" :complete="step > 1" color="green lighten-3">
          <span class="fs-16 font-title">Выбор пользователя</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="step > 2">
          <span class="fs-16 font-title">Личная/рабочая информация</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="step > 3">
          <span class="fs-16 font-title">Аутенцификация</span>
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>


      <v-stepper-content step="1" class="pb-16">
        <v-btn absolute right bottom min-width="100" elevation="0" outlined color="blue lighten-3" :disabled="!role"
               @click="step = 2">
          Далее
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
        <v-row justify="space-around">
          <v-card width="300" height="400" outlined class="pa-2">
            <v-img :src="require('@/assets/images/spec.png')" height="330" contain>

            </v-img>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab small elevation="0" @click="role='spec'" :ripple="false">
                <v-avatar :color="role==='spec'?'blue lighten-4':''" size="28"
                          style="outline: solid #BBDEFB 1px"></v-avatar>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

          <v-card width="300" height="400" outlined class="pa-2">
            <v-img :src="require('@/assets/images/user.png')" height="330" contain>

            </v-img>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab small elevation="0" @click="role='user'" :ripple="false">
                <v-avatar :color="role==='user'?'blue lighten-4':''" size="28"
                          style="outline: solid #BBDEFB 1px"></v-avatar>

              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-row>


      </v-stepper-content>

      <v-stepper-content step="2" class="pb-16">
        <v-btn absolute left bottom min-width="100" elevation="0" outlined color="red lighten-3" @click="step = 1">
          <v-icon>mdi-chevron-double-left</v-icon>
          Назад
        </v-btn>
        <v-btn absolute right bottom min-width="100" elevation="0" outlined color="blue lighten-3"
               :disabled="!data_form"
               @click="step = $refs['data-form'].validate()?3:2;">
          Далее
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>


        <v-form ref="data-form" lazy-validation v-model="data_form">

          <div v-if="role === 'user'">
            <v-row>
              <v-avatar size="200">
                <v-img :src="require(`@/assets/images/user.png`)"></v-img>
              </v-avatar>
              <v-col>
                <name-input v-model="name" label="Имя" maxlength="30"></name-input>
                <name-input v-model="surname" label="Фамилия" maxlength="30"></name-input>
                <select-input v-model="sex" label="Пол"
                              :items="[{text: 'мужской', value: 'male' },
                              {text: 'женский', value: 'female' }]">
                </select-input>
              </v-col>
              <v-col>
                <phone-input v-model="number" :required="false"></phone-input>
              </v-col>
            </v-row>
          </div>

          <div v-if="role === 'spec'">
            <v-row>
              <v-avatar size="200">
                <v-img :src="require(`@/assets/images/spec.png`)"></v-img>
              </v-avatar>
              <v-col>
                <name-input v-model="name" label="Имя" maxlength="30"></name-input>
                <name-input v-model="surname" label="Фамилия" maxlength="30"></name-input>
                <select-input v-model="sex" label="Пол"
                              :items="[{text: 'мужской', value: 'male' },
                              {text: 'женский', value: 'female' }]">
                </select-input>
                <phone-input v-model="number"></phone-input>
              </v-col>
              <v-col>


                <div class="font-title fs-16 font-weight-bold ">
                  Цена за 1 час онлайн консультации
                </div>
                <range-input :min-limit="0" :max-limit="800" :min.sync="minInternalPrice"
                             :max.sync="maxInternalPrice"></range-input>
                <div class="font-title fs-16 font-title font-weight-bold">
                  Цена за 1 час очной консультации
                </div>
                <range-input :min-limit="0" :max-limit="800" :min.sync="minOnlinePrice"
                             :max.sync="maxOnlinePrice"></range-input>

              </v-col>
            </v-row>

            <v-row>
              <select-input multiple
                            label="Специализация"
                            :items="specializationsParams.map(el => {return {text: el.text, value: el._id}})"
                            v-model="specializations"
                            chips
                            small-chips
                            big-content
              >
              </select-input>

              <v-spacer></v-spacer>

              <select-input
                  multiple
                  label="Методы"
                  :items="methodsParams.map(el => {return {text: el.text, value: el._id}})"
                  v-model="methods_"
                  chips
                  small-chips
                  big-content
              >
              </select-input>

              <v-spacer></v-spacer>

              <select-input
                  multiple
                  label="Условия"
                  v-model="opportunities"
                  :required="false"
                  :items="[
                  {
                    value: 'internal',
                    text: 'очная работа'
                  },
                  {
                    value: 'children',
                    text: 'работа с детьми'
                  },
                  {
                    value: 'teens',
                    text: 'работа с подростками'
                  },
                  {
                    value: 'family',
                    text: 'семейный психолог'
                  }
              ]" chips small-chips big-content>
              </select-input>
            </v-row>
          </div>
        </v-form>

      </v-stepper-content>

      <v-stepper-content step="3" class="pb-16">
        <v-btn absolute left bottom min-width="100" elevation="0" outlined color="red lighten-3" @click="step = 2">
          <v-icon>mdi-chevron-double-left</v-icon>
          Назад
        </v-btn>
        <v-btn absolute right bottom min-width="100" elevation="0" outlined color="blue lighten-3"
               :disabled="!auth_form || !confirm"
               @click="registerSpec"
               :loading="localLoading"

        >
          Завершить
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>

        <v-form ref="auth-form" lazy-validation v-model="auth_form">
          <v-row align="center">
            <v-col class="col-4">
              <email-input v-model="email" :check="true"></email-input>
              <password-input v-model="password"></password-input>
              <repeat-password-input :value="password"></repeat-password-input>
            </v-col>
            <v-col class="col-8">
              <v-row class="fill-height rounded pa-2" align="center"
                     style="position:relative; top: -10px; outline: 1px solid grey">
                <div class="fs-14 overflow-y-auto" style="max-height: 400px">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquid asperiores delectus dolore
                  ex fugit harum ipsum itaque iure, laboriosam, laudantium minus officia pariatur perspiciatis placeat
                  quae quos recusandae tenetur. Architecto assumenda, beatae debitis dolorem dolores ea eaque earum enim
                  et expedita facere illum labore magni maxime mollitia nesciunt nobis non, nostrum obcaecati
                  perspiciatis, porro ratione rem repudiandae sapiente sequi sunt suscipit temporibus? Deleniti modi
                  odit officiis sapiente similique tempore vitae! Ad assumenda dicta dolorem, error et eum incidunt
                  itaque obcaecati optio quasi qui quia quibusdam repellat reprehenderit repudiandae rerum tempora
                  voluptatem. Accusantium aliquam deleniti dicta doloremque iure magni non odio quisquam repellendus
                  velit? Architecto culpa debitis, dolor ea exercitationem minima obcaecati quasi temporibus ut vero. A
                  accusamus architecto, asperiores commodi consequatur consequuntur culpa cumque dignissimos dolor
                  dolore error esse est et ex fugit harum hic, incidunt ipsam iste iusto, magnam maiores molestias
                  pariatur provident quaerat quas quidem quod ratione recusandae repellat rerum sapiente sequi veniam?
                  Ab ad aliquam aperiam asperiores, atque blanditiis commodi, cupiditate dolore ducimus eius eos eum
                  fuga fugit impedit incidunt ipsa libero magnam minima nihil optio praesentium quae quasi
                  reprehenderit, saepe sint sit ullam veritatis vitae voluptates voluptatum? A asperiores blanditiis
                  culpa, cupiditate dignissimos est iure molestiae nisi qui quisquam quo ullam, velit veniam! Aperiam
                  assumenda blanditiis distinctio doloremque doloribus eius eum iste iure, iusto laboriosam libero,
                  magni maiores, minima mollitia omnis provident quae quas repellat sint totam. Deserunt nemo possimus
                  rem saepe sequi? Id in incidunt nulla perferendis soluta? Assumenda atque commodi excepturi
                  exercitationem facere magnam nobis odio omnis perspiciatis? Alias aut delectus doloremque eos
                  exercitationem facilis fugiat harum illum, ipsam itaque maiores molestias officiis placeat quidem
                  quod, quos saepe temporibus unde. Accusamus alias aperiam at dolorem earum, eligendi, error est
                  excepturi expedita itaque laboriosam laborum odio, quas qui quisquam sapiente sunt tempore voluptas
                  voluptatum.
                </div>
                <v-checkbox style="border-top: 1px solid grey; width: 100%" v-model="confirm" hide-details dense
                            label="Согласен с пользовательским соглашением">

                </v-checkbox>
              </v-row>

            </v-col>
          </v-row>
        </v-form>


      </v-stepper-content>


    </v-stepper>
  </v-dialog>
</template>

<script>

import NameInput from "@/components/Inputs/NameInput";
import PhoneInput from "@/components/Inputs/PhoneInput";
import EmailInput from "@/components/Inputs/EmailInput";
import SelectInput from "@/components/Inputs/SelectInput";
import PasswordInput from "@/components/Inputs/PasswordInput";
import RepeatPasswordInput from "@/components/Inputs/RepeatPasswordInput";
import RangeInput from "@/components/Inputs/RangeInput";

export default {
  name: "RegistrationDialog",
  components: {RangeInput, RepeatPasswordInput, PasswordInput, SelectInput, EmailInput, PhoneInput, NameInput},
  data() {
    return {
      data_form: true,
      auth_form: true,
      confirm: false,
      step: 1,
      role: 'spec',
      name: '',
      surname: '',
      sex: '',
      email: '',
      password: '',
      number: '',
      minOnlinePrice: 100,
      maxOnlinePrice: 300,
      minInternalPrice: 100,
      maxInternalPrice: 300,

      specializations: [],
      methods_: [],
      opportunities: [],


      specializationsParams: [],
      methodsParams: [],


    }
  },
  methods: {
    getFilters() {
      this.addLoadingProcess()
      this.getData('http://localhost:3000/filters')
          .then(resp => {
            this.specializationsParams = resp.data.specializations
            this.methodsParams = resp.data.methods
          })
          .finally(() => {
            this.removeLoadingProcess()
          })
    },
    registerSpec() {
      this.localLoading = true
      this.postData('http://localhost:3000/registration/spec', {
        name: this.name,
        surname: this.surname,
        sex: this.sex,
        email: this.email,
        number: this.number.replace(/[+() -]/g, ''),
        password: this.password,
        methods: this.methods_,
        specializations: this.specializations,
        opportunities: this.opportunities,
        role: this.role,
        price: {
          internal: {
            min: this.minInternalPrice,
            max: this.maxInternalPrice
          },
          online: {
            min: this.maxOnlinePrice,
            max: this.maxOnlinePrice
          }
        }
      }, {handleErrorResponse: true, handleError: true})
          .then(() => {
            this.$root.$emit('show-info', {
              title: 'Подтверждение',
              subtitle: 'На вашу электронную почту отправлено письмо для подтверждения регистрации'
            })
            this.$root.$emit('close-registration')
          })
          .catch(() => {
          })
          .finally(() => this.localLoading = false)
    }
  },
  watch: {
    step(val) {
      switch (val) {
        case 2:
          if (this.role === 'spec') this.getFilters()
      }
    }
  },
}
</script>

<style scoped>
.v-btn::before {
  background-color: transparent;
}

.v-stepper__header {
  box-shadow: none;
  background: rgba(197, 154, 197, 0.29);
}

.stepper >>> .v-stepper__step__step {
  background-color: #757575 !important;
}

.stepper >>> .v-stepper__step--complete .v-stepper__step__step {
  background-color: #A5D6A7 !important;
}

.licence >>> .v-card__text::-webkit-scrollbar {
  width: 10px !important;
  background: black !important;
}

</style>