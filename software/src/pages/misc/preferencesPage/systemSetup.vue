<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import confirmDialog from '@/components/basics/confirmDialog.vue';
import { ServerStateEnum } from '@/data/enums/serverStateEnum';
import { usePreferencesStore } from '@/stores/preferences.store';

const preferenceStore = usePreferencesStore()

preferenceStore.getServerState()
</script>

<template>
  <card-view
    :title="$t('preferences.systemSetup')"
    icon="mdi-engine"
  >
    <v-row>
      <v-col>
        {{ $t('preferences.serverState') }}:
        <span v-if="preferenceStore.serverState == ServerStateEnum.ONLINE" class="text-green">
          <v-icon icon="mdi-check" />
          Online
        </span>

        <span v-else-if="preferenceStore.serverState == ServerStateEnum.OFFLINE" class="text-red">
          <v-icon icon="mdi-alert-circle" />
          Offline
        </span>

        <span v-else-if="preferenceStore.serverState == ServerStateEnum.PENDING" class="text-orange">
          <v-icon icon="mdi-clock" />
          Pending...
        </span>
      </v-col>
    </v-row>

    

    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
          @click="preferenceStore.showDeleteDbDialog = true"
          prepend-icon="mdi-database-refresh"
          color="red"
          :disabled="preferenceStore.serverState != ServerStateEnum.ONLINE"
        >
          {{ $t('preferences.resetDatabase.resetDatabase') }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
        @click="preferenceStore.showDeleteExerciseDialog = true"
          prepend-icon="mdi-progress-close"
          color="red"
          :disabled="preferenceStore.serverState != ServerStateEnum.ONLINE"
        >
          {{ $t('preferences.resetExerciseProgress.resetExerciseProgress') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>

  <!-- Confirm delete database -->
  <confirm-dialog
    :title="$t('preferences.resetDatabase.dialog.title')"
    :description="$t('preferences.resetDatabase.dialog.description')"
    v-model="preferenceStore.showDeleteDbDialog"
    :onConfirm="preferenceStore.resetDb"
    :loading="preferenceStore.fetchInProgress"
  />

  <!-- Confirm delete exercise progress -->
  <confirm-dialog
    :title="$t('preferences.resetExerciseProgress.dialog.title')"
    :description="$t('preferences.resetExerciseProgress.dialog.description')"
    v-model="preferenceStore.showDeleteExerciseDialog"
    :onConfirm="preferenceStore.resetExerciseProg"
    :loading="preferenceStore.fetchInProgress"
  />
</template>