<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import axios from 'axios';
import cardView from '@/components/cardView.vue';
import actionDialog from '@/components/actionDialog.vue';
import { ref } from 'vue';

const feedbackStore = useFeedbackStore()
const confirmDialog = ref(false)

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
          <v-btn @click="confirmDialog = true" color="primary" prepend-icon="mdi-database-refresh">
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
  </card-view>

  <action-dialog :title="$t('preferences.resetConfirm')" v-model="confirmDialog" width="600">
    <template #actions>
      <v-btn variant="outlined" @click="resetDb" color="red">
        {{ $t('preferences.resetDatabase') }}
      </v-btn>
    </template>

  </action-dialog>
</template>