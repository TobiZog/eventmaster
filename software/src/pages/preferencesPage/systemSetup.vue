<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { ref } from 'vue';
import confirmDialog from '@/components/confirmDialog.vue';
import { getServerState, resetDatabase } from '@/data/api/mainApi';

const feedbackStore = useFeedbackStore()
const showConfirmDialog = ref(false)
const serverOnline = ref(false)

getServerState()
  .then(result => {
    if (result.status == 200) {
      serverOnline.value = true
    } else {
      serverOnline.value = false
    }
  })
  .catch(error => {
    serverOnline.value = false
  })

async function resetDb() {
  await resetDatabase()
    .then(result => {
      if (result.status == 200) {
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
  <card-view
    :title="$t('preferences.systemSetup')"
    prepend-icon="mdi-engine"
  >
    <v-row>
      <v-col>
        {{ $t('serverState') }}:
        <span v-if="serverOnline" class="text-green">
          <v-icon icon="mdi-check" />
          Online
        </span>

        <span v-else class="text-red">
          <v-icon icon="mdi-alert-circle" />
          Offline
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
          @click="showConfirmDialog = true"
          prepend-icon="mdi-database-refresh"
          color="red"
          :disabled="!serverOnline"
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
  </card-view>

  <confirm-dialog
    :title="$t('dialog.resetConfirm.title')"
    :description="$t('dialog.resetConfirm.description')"
    v-model="showConfirmDialog"
    :onConfirm="resetDb"
  />
</template>