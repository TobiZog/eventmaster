<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import confirmDialog from '@/components/basics/confirmDialog.vue';
import { ServerStateEnum } from '@/data/enums/serverStateEnum';
import { usePreferencesStore } from '@/stores/preferences.store';
import ServerStateText from '@/components/pageParts/serverStateText.vue';
import { useRouter } from 'vue-router';

const preferenceStore = usePreferencesStore()
const router = useRouter()

preferenceStore.getServerState()
</script>

<template>
  <card-view
    :title="$t('preferences.systemSetup')"
    icon="mdi-engine"
  >
    <template #borderless>
      <v-list>
        <v-list-item class="text-h6 text-center">
          {{ $t('preferences.serverState') }}: <server-state-text />
        </v-list-item>

        <v-list-item class="text-center">
          <outlined-button
            @click="preferenceStore.showDeleteDbDialog = true"
            prepend-icon="mdi-database-refresh"
            color="warning"
            :disabled="preferenceStore.serverState != ServerStateEnum.ONLINE || preferenceStore.fetchInProgress"
          >
            {{ $t('preferences.resetDatabase.resetDatabase') }}
          </outlined-button>
        </v-list-item>

        <v-list-item class="text-center">
          <outlined-button
            @click="preferenceStore.showDeleteExerciseDialog = true"
            prepend-icon="mdi-progress-close"
            color="warning"
            :disabled="preferenceStore.serverState != ServerStateEnum.ONLINE || preferenceStore.fetchInProgress"
          >
            {{ $t('preferences.resetExerciseProgress.resetExerciseProgress') }}
          </outlined-button>
        </v-list-item>

        <v-list-item class="text-center">
          <outlined-button
            @click="preferenceStore.showFactoryResetDialog = true"
            prepend-icon="mdi-factory"
            color="warning"
            :disabled="preferenceStore.serverState != ServerStateEnum.ONLINE || preferenceStore.fetchInProgress"
          >
            {{ $t('preferences.factoryReset.factoryReset') }}
          </outlined-button>
        </v-list-item>
      </v-list>
    </template>
  </card-view>

  <!-- Confirm delete database -->
  <confirm-dialog
    :title="$t('preferences.resetDatabase.dialog.title')"
    :description="$t('preferences.resetDatabase.dialog.description')"
    v-model="preferenceStore.showDeleteDbDialog"
    :onConfirm="preferenceStore.resetDb"
    :loading="preferenceStore.fetchInProgress"
    icon="mdi-database-refresh"
  />

  <!-- Confirm delete exercise progress -->
  <confirm-dialog
    :title="$t('preferences.resetExerciseProgress.dialog.title')"
    :description="$t('preferences.resetExerciseProgress.dialog.description')"
    v-model="preferenceStore.showDeleteExerciseDialog"
    :onConfirm="preferenceStore.resetExerciseProg"
    :loading="preferenceStore.fetchInProgress"
    icon="mdi-progress-close"
  />

  <confirm-dialog
    :title="$t('preferences.factoryReset.dialog.title')"
    :description="$t('preferences.factoryReset.dialog.description')"
    v-model="preferenceStore.showFactoryResetDialog"
    icon="mdi-factory"
    :onConfirm="() => {
      preferenceStore.resetToFactorySettings()
      router.push('/')
    }"
    :loading="preferenceStore.fetchInProgress"
  />
</template>