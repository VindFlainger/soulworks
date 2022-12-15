<template>
  <div class="about-statistic rounded-xl pa-3">
    <v-row>
      <v-img :src="require('@/assets/images/logo.png')" max-width="200">

      </v-img>
    </v-row>
    <v-row>
      <v-img :src="require('@/assets/images/about/person.png')"
             max-width="300"
             class="d-none d-md-block mr-md-8 ml-md-8">
      </v-img>
      <v-img :src="require('@/assets/images/about/person.png')"
             contain position="left center"
             max-width="200"
             class="d-none d-sm-block d-md-none">

      </v-img>
      <v-col class="about-statistic__content pa-0 pa-md-3">
        <v-row>
          <v-col class="about-statistic__card col-md-4 col-6">
            <h4>
              >100000
            </h4>
            <h5>
              сообщений
            </h5>
            <p>
              отправлено через Soul-чат
            </p>
          </v-col>

          <v-col class="about-statistic__card col-md-4 col-6">
            <h4>
              9812
            </h4>
            <h5>
              специалистов
            </h5>
            <p>
              зарегистрированы в системе
            </p>
          </v-col>

          <v-col class="about-statistic__card col-md-4 col-6">
            <h4>
              31561
            </h4>
            <h5>
              пользователей
            </h5>
            <p>
              зарегистрированы в системе
            </p>
          </v-col>

          <v-col class="about-statistic__card col-md-4 col-6">
            <h4>
              >4000
            </h4>
            <h5>
              материалов
            </h5>
            <p>
              размещено на платформе
            </p>
          </v-col>

          <v-col class="about-statistic__card col-md-4 col-6">
            <h4>
              >30000
            </h4>
            <h5>
              консультаций
            </h5>
            <p>
              подтверждено пользователями
            </p>
          </v-col>

          <v-col class="about-statistic__card col-md-4 col-6">
            <h4>
              >3000
            </h4>
            <h5>
              активных пользователей
            </h5>
            <p>
              каждый день
            </p>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </div>

</template>

<script>
export default {
  name: "AboutStatistic"
}
</script>

<style scoped>
.about-statistic {
  background: url("@/assets/images/about/statistic_bg.png");
}

.about-statistic__content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
}

.about-statistic__card {
  padding: 8px !important;
}

.about-statistic__card h4 {
  font-size: 40px;
  font-weight: lighter;
}

.about-statistic__card h5 {
  display: inline-block;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid black;
  padding: 3px;
  max-width: 150px;

}

.about-statistic__card p{
  font-size: 16px;
  font-weight: lighter;
  margin-top: 8px;
  max-width: 130px;
}

</style>