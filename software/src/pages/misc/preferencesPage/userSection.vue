<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { usePreferencesStore } from '@/stores/preferences.store';

const preferencesStore = usePreferencesStore()
</script>

<template>
  <card-view icon="mdi-account-school" :title="$t('misc.user')">
    <v-row>
      <v-col>
        <v-text-field
          variant="outlined"
          hide-details
          :label="$t('misc.yourFullName')"
          v-model="preferencesStore.studentName"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          variant="outlined"
          hide-details
          :label="$t('misc.registrationNumber')"
          v-model="preferencesStore.registrationNumber"
        />
      </v-col>
    </v-row>
  </card-view>
</template>