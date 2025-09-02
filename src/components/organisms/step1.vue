<script setup lang="ts">
import ServerStateText from '@/components/organisms/serverStateText.vue';
</script>

<template>
  <v-container class="text-h4 text-center">
    <v-row>
      <v-col>
        <v-icon icon="mdi-server" />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <div>
          {{ $t('preferences.serverState') + ':' }}
        </div>

        <server-state-text />
      </v-col>
    </v-row>
  </v-container>
</template>