<template>
  <div>
    <div class="mt-5" v-if="aboutFull">
      <div class="category__title">
        О себе
      </div>
      <div class="category__card">
        {{ aboutFull }}
      </div>
    </div>

    <div class="mt-5">
      <div class="category__title">
        услуги
      </div>
      <div class="category__card">
        <div>
          <v-row align="center">
            <div class="services__title">Специализация</div>
            <v-col>
              <div v-for="specialization in specializations" :key="specialization._id" class="services__card ma-1">
                {{ specialization.text }}
              </div>
            </v-col>
          </v-row>

          <v-row align="center">
            <div class="services__title">Методы</div>
            <v-col>
              <div v-for="method in methods" :key="method._id" class="services__card ma-1">
                {{ method.text }}
              </div>
            </v-col>
          </v-row>

          <v-row align="center">
            <div class="services__title">Возможности</div>
            <v-col>
              <div v-for="opportunity in opportunities" :key="opportunity" class="services__card ma-1">
                {{ opportunity }}
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <v-row class="mt-5">
      <v-col class="pa-0">
        <div class="category__title">
          цены
        </div>
        <div class="category__card">
          <div class="fs-18">
            <div>
              Онлайн консультация: <span
                class="font-weight-bold fs-16">{{ price.online.min | price }} - {{ price.online.max | price }}</span>
            </div>
            <div>
              Очная консультация: <span
                class="font-weight-bold fs-16">{{ price.internal.min | price }} - {{
                price.internal.max | price
              }}</span>
            </div>

            <div class="fs-12 grey--text text--darken-2 mt-2">
              Решение о конечной цене принимает специалист, согласно правилам платформы <span
                class="text-decoration-underline">устанавливать итоговую цену выше указанной запрещено</span>. Мы
              настоятельно рекомендуем Вам использовать официальный чат платформы Soul Works, это позволит обнаружить
              нарушение и наказать нарушителя по Вашему запросу. <span class="text-decoration-underline">
              При использовании сторонних мессенджеров проверка достоверности жалобы не будет пройдена
            </span>.
            </div>
          </div>
        </div>
      </v-col>

      <v-col class="pa-0 ml-4">
        <div class="category__title">
          контактная информация
        </div>
        <div class="category__card">
          <div class="fs-18">
            <div class="d-flex align-end">
              Номер:<span class="mr-3 ml-1" style="font-weight: 600">{{ phone | phone }}</span>
              <v-img v-for="messenger in messengers" :key="messenger"
                     :src="require(`@/assets/images/networks/${messenger}.png`)" max-width="25" height="25"
                     class="d-inline-block ma-1">
              </v-img>
            </div>
            <div v-if="connection">
              Контакты:<span class="mr-3 ml-1" style="font-weight: 600">{{ connection }}</span>
            </div>
            <div v-if="address">
              Адрес:<span class="mr-3 ml-1" style="font-weight: 600">{{ address }}</span>
            </div>
            <ui-social-links :links="links" :size="40" class="mt-3"></ui-social-links>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-5">
      <v-col class="pa-0 pr-2 col-6" v-if="education">
        <div class="category__title">
          Образование
        </div>
        <div class="category__card">
          <div>

              <div v-for="educ in education" :key="educ.graduation" class="pa-1 mb-3"
                   style="border-left: 3px solid grey">
                <div>Учреждение образования: <span style="font-weight: 600">{{ educ.institution }}</span></div>
                <div>Дата выпуска: <span style="font-weight: 600">{{ $moment(educ.date).format('ll') }}</span></div>
                <div>Статус (наличие подтверждающих документов): <span style="font-weight: 600">{{
                    educ.approve ? 'Подтверждено' : 'Не подтверждено'
                  }}</span>
                </div>
              </div>

            <div class="fs-12 grey--text text--darken-2 mt-2">
              Статус информации об образовании сведетельствует о предоставлении специалистом подтверждающих документов,
              платформа <span class="text-decoration-underline"> Soul Works сохраняет конфиденциальность полученных от специалистов документов
            </span>. Статус документа обновляется в течении 48-ми часов после прикрепления психологом документов.
            </div>
          </div>

        </div>
      </v-col>

      <v-col class="pa-0 pl-2 col-6" v-if="category">
        <div class="category__title">
          Опыт
        </div>
        <div class="category__card" >
          <div class="pa-1"
               style="border-left: 3px solid grey">
            <div>Категория: <span style="font-weight: 600">{{ category.name }}</span></div>
            <div>Статус (наличие подтверждающих документов): <span style="font-weight: 600">{{category.approve? 'Подтверждено' : 'Не подтверждено'
              }}</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

  </div>

</template>

<script>
import UiSocialLinks from "@/components/UI/UiSocialLinks";

export default {
  name: "ProfileSpec",
  components: {UiSocialLinks},
  props: {
    methods: Array,
    specializations: Array,
    opportunities: Array,
    address: String,
    connection: String,
    phone: String,
    messengers: Array,
    links: Array,
    price: Object,
    aboutFull: String,
    education: Array,
    category: Object
  }

}
</script>

<style scoped>

.category__card {
  border: 2px dashed black;
  border-radius: 0 14px 14px 14px;
  min-height: 180px;
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 10px;
}

.category__title {
  display: inline-block;
  padding: 4px;
  font-family: 'Comfortaa', sans-serif !important;
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 100%;
}

.services__title {
  font-size: 19px;
  font-weight: 600;
  font-family: Comfortaa, sans-serif;
  min-width: 180px;
}

.services__card {
  display: inline-block;
  border: 2px solid black;
  border-radius: 14px;
  font-size: 13px;
  padding: 7px;
  font-weight: 300;
  text-transform: uppercase;
}


</style>