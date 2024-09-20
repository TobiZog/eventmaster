<script setup lang="ts">
import alertBanner from '@/components/alertBanner.vue';
import accountDataCard from './accountDataCard.vue';
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <alert-banner />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <account-data-card />
      </v-col>
    </v-row>
  </v-container>
</template>