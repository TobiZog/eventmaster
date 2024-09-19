<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import axios from 'axios';

const feedbackStore = useFeedbackStore()

function resetDb() {
  axios.get("http://127.0.0.1:3000/api/resetdatabase")
    .then(res => {
      if (res.status == 200) {
        feedbackStore.changeBanner(BannerStateEnum.DATABASERESETSUCCESSFUL)
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