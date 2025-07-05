<script setup lang="ts">
import { usePreferencesStore } from '@/stores/preferences.store';

const preferencesStore = usePreferencesStore()
</script>

<template>
  <v-container width="600" class="text-h4 text-center">
    <v-row>
      <v-col>
        <v-icon icon="mdi-database" />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        {{ $t('misc.firstStartup.createDatabase') }}
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="preferencesStore.fetchInProgress">
        <v-progress-linear indeterminate />
      </v-col>

      <v-col v-else class="text-green">
        <v-icon icon="mdi-check" /> {{ $t('misc.firstStartup.finished') }}
      </v-col>
    </v-row>
  </v-container>
</template>