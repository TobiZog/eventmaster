<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { ref } from 'vue';
import confirmDialog from '@/components/basics/confirmDialog.vue';
import { getServerState, resetDatabase } from '@/data/api/mainApi';
import { ServerStateEnum } from '@/data/enums/serverStateEnum';
import packageJson from './../../../../package.json'

const feedbackStore = useFeedbackStore()
const showConfirmDialog = ref(false)
const serverOnline = ref(ServerStateEnum.PENDING)

getServerState()
  .then(result => {
    if (result.status == 200) {
      serverOnline.value = ServerStateEnum.ONLINE
    } else {
      serverOnline.value = ServerStateEnum.OFFLINE
    }
  })
  .catch(error => {
    serverOnline.value = ServerStateEnum.OFFLINE
  })

async function resetDb() {
  serverOnline.value = ServerStateEnum.PENDING

  await resetDatabase()
    .then(result => {
      if (result.status == 200) {
        feedbackStore.changeBanner(BannerStateEnum.DATABASERESETSUCCESSFUL)
        serverOnline.value = ServerStateEnum.ONLINE
      }
    })

  showConfirmDialog.value = false
  // todo: Request all data
}
</script>

<template>
  <card-view
    :title="$t('preferences.systemSetup')"
    icon="mdi-engine"
  >
    <v-row>
      <v-col>
        {{ $t('serverState') }}:
        <span v-if="serverOnline == ServerStateEnum.ONLINE" class="text-green">
          <v-icon icon="mdi-check" />
          Online
        </span>

        <span v-else-if="serverOnline == ServerStateEnum.OFFLINE" class="text-red">
          <v-icon icon="mdi-alert-circle" />
          Offline
        </span>

        <span v-else-if="serverOnline == ServerStateEnum.PENDING" class="text-orange">
          <v-icon icon="mdi-clock" />
          Pending...
        </span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        Software Version: {{ packageJson.version }}
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
          @click="showConfirmDialog = true"
          prepend-icon="mdi-database-refresh"
          color="red"
          :disabled="serverOnline != ServerStateEnum.ONLINE"
        >
          {{ $t('resetDatabase') }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
          prepend-icon="mdi-progress-close"
          color="red"
        >
          {{ $t('resetProgress') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>


  <confirm-dialog
    :title="$t('resetDatabaseConfirm.title')"
    :description="$t('resetDatabaseConfirm.description')"
    v-model="showConfirmDialog"
    :onConfirm="resetDb"
  />
</template>