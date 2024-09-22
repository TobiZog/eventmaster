<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import axios from 'axios';
import cardView from '@/components/cardView.vue';
import actionDialog from '@/components/actionDialog.vue';
import { ref } from 'vue';
import confirmDialog from '@/components/confirmDialog.vue';

const feedbackStore = useFeedbackStore()
const showConfirmDialog = ref(false)

function resetDb() {
  axios.get("http://127.0.0.1:3000/api/resetdatabase")
    .then(res => {
      if (res.status == 200) {
        feedbackStore.changeBanner(BannerStateEnum.DATABASERESETSUCCESSFUL)
      }
    })

  confirmDialog.value = false
  // todo: Request all data
}

function resetSettings() {
  // todo
}
</script>

<template>
  <card-view :title="$t('preferences.systemSetup')" prepend-icon="mdi-engine" elevation="8">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-btn
            @click="showConfirmDialog = true"
            prepend-icon="mdi-database-refresh"
            color="red"
            variant="outlined"
          >
            {{ $t('preferences.resetDatabase') }}
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-btn
            @click="resetDb"
            prepend-icon="mdi-cog-counterclockwise"
            color="primary"
            variant="outlined"
          >
            {{ $t('preferences.resetPreferences') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </card-view>

  <confirm-dialog
    :title="$t('dialog.resetConfirm.title')"
    :description="$t('dialog.resetConfirm.description')"
    v-model="showConfirmDialog"
  />
</template>