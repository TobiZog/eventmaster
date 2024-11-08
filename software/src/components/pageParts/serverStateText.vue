<script setup lang="ts">
import { usePreferencesStore } from '@/stores/preferences.store';
import { ServerStateEnum } from '@/data/enums/serverStateEnum';

const preferencesStore = usePreferencesStore()
</script>

<template>
  <span
    v-if="preferencesStore.serverState == ServerStateEnum.PENDING || preferencesStore.fetchInProgress"
    class="text-orange"
  >
    <v-icon icon="mdi-clock" />
    Pending...
  </span>

  <span
    v-else-if="preferencesStore.serverState == ServerStateEnum.ONLINE"
    class="text-green"
  >
    <v-icon icon="mdi-check" />
    Online
  </span>

  <span
    v-else="preferencesStore.serverState == ServerStateEnum.OFFLINE"
    class="text-red"
  >
    <v-icon icon="mdi-alert-circle" />
    Offline
  </span>
</template>