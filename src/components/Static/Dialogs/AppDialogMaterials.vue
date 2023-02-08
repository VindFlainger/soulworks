<template>
  <base-dialog
      :value="value"
      :max-width="viewportHook({base: 400, md: 800, lg: 1000})"
      @close="$emit('close')"
      background
  >
    <v-card class="background-none" elevation="0">
      <v-card-title class="afs-30-15 font-weight-bold">
        Материалы и работа с ними
      </v-card-title>
      <v-card-subtitle class="afs-18-12">
        Инструкция по размещению и использованию материалов для психологов и клиентов.
      </v-card-subtitle>

      <v-card-text class="black--text">
        <div>
          <p class="afs-18-12">
            Материалы - механизм, позволяющий специалистам предоставлять доступ к документам другим пользователям. <br>
            Механизм материалов не предоставляют надежной защиты вложенных данных и документов, их не рекомендуется
            использовать для предоставления клиенту какой либо конфиденциальной информации. <br>
            Если вы хотите предоставить вашему клиенту какие-то конфиденциальные данные, то необходимо использовать
            "Карты приема" или чаты.
          </p>
        </div>

        <div class="mt-5">
          <h4 class="font-weight-bold afs-22-14">
            <v-icon class="crc-t-n2" color="black" :size="viewportHook({base: 18, md: 20, lg: 24})">mdi-account</v-icon>
            Клиенты
          </h4>
          <div>
            <h5 class="afs-18-12 font-weight-medium">Возможности:</h5>
            <ul class="afs-18-12">
              <li>Просматривать материалы, читателями которых вы являетесь</li>
              <li>Оценивать материалы</li>
              <li>Отписываться от не актуальных материалов</li>
            </ul>
          </div>
        </div>

        <div class="mt-5">
          <h4 class="font-weight-bold afs-22-14">
            <v-icon class="crc-t-n2" color="black" :size="viewportHook({base: 18, md: 20, lg: 24})">mdi-account-tie
            </v-icon>
            Психологи
          </h4>
          <div>
            <h5 class="afs-18-12 font-weight-medium">Возможности:</h5>
            <ul class="afs-18-12">
              <li>Добавлять свои уникальные материалы</li>
              <li>Прикреплять к материалу его описание, которое отражает его направленность и используется в поиске по
                ключевым словам
              </li>
              <li>Прикреплять к материалам дополнительные файлы (разрешенные форматы: png, jpg, pdf, docx, mp3, wav,
                mp4...)
              </li>
              <li>Добавлять читателей</li>
            </ul>
          </div>
        </div>

      </v-card-text>
    </v-card>

  </base-dialog>
</template>

<script>
import BaseDialog from "@/components/Dialogs/BaseDialog.vue";

export default {
  name: "AppDialogMaterials",
  components: {BaseDialog},
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>