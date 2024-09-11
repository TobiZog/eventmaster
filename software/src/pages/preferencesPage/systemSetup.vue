<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import BannerModel from '@/data/models/bannerModel';
import axios from 'axios';

const alertBanner = defineModel("alertBanner", { required: true, type: BannerModel })

function resetDb() {
  axios.get("http://127.0.0.1:3000/api/resetdatabase")
    .then(res => {
      if (res.status == 200) {
        alertBanner.value.bannerState = BannerStateEnum.DATABASERESETSUCCESSFUL
        alertBanner.value.show = true
      }
    })
  // todo: Request all data
}

function resetSettings() {

}
</script>

<template>
  <v-card :title="$t('preferences.systemSetup')" prepend-icon="mdi-engine" elevation="8">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-btn @click="resetDb" color="primary" prepend-icon="mdi-database-refresh">
            {{ $t('preferences.resetDatabase') }}
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-btn @click="resetDb" color="primary" prepend-icon="mdi-cog-counterclockwise">
            {{ $t('preferences.resetPreferences') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>