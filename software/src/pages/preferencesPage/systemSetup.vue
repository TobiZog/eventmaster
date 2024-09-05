<script setup lang="ts">
import BannerModel from '@/data/models/bannerModel';
import axios from 'axios';

const alertBanner = defineModel("alertBanner", { required: true, type: BannerModel })

function resetDb() {
  axios.get("http://127.0.0.1:3000/api/resetdatabase")
    .then(res => {
      if (res.status == 200) {
        alertBanner.value.show = true
      }
    })
  // todo: Request all data
}

function resetSettings() {

}
</script>

<template>
  <v-card title="System Setup" prepend-icon="mdi-engine" elevation="8">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-btn @click="resetDb" color="primary" prepend-icon="mdi-database-refresh">Datenbank zurücksetzen</v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-btn @click="resetDb" color="primary" prepend-icon="mdi-cog-counterclockwise">Einstellungen zurücksetzen</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>