<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import axios from 'axios';
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
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

  showConfirmDialog.value = false
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
          <outlined-button
            @click="showConfirmDialog = true"
            prepend-icon="mdi-database-refresh"
            color="red"
          >
            {{ $t('preferences.resetDatabase') }}
          </outlined-button>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <outlined-button
            @click="resetSettings"
            prepend-icon="mdi-cog-counterclockwise"
          >
            {{ $t('preferences.resetPreferences') }}
          </outlined-button>
        </v-col>
      </v-row>
    </v-container>
  </card-view>

  <confirm-dialog
    :title="$t('dialog.resetConfirm.title')"
    :description="$t('dialog.resetConfirm.description')"
    v-model="showConfirmDialog"
    :onConfirm="resetDb"
  />
</template>