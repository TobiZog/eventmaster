<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import { useLocationStore } from '@/stores/location.store';
import bandSection from './bandsSection.vue';
import UpcomingConcertsSection from './upcomingConcertsSection.vue';
import TopLocationsSection from './topLocationsSection.vue';
import { usePreferencesStore } from '@/stores/preferences.store';
import welcomeDialog from './welcomeDialog.vue';
import { ref } from 'vue';

const concertStore = useConcertStore()
const locationStore = useLocationStore()
const preferencesStore = usePreferencesStore()
const showWelcomeDialog = ref(false)

concertStore.getUpcomingConcerts()
locationStore.getTopLocations()

// First startup
if (preferencesStore.firstStartup) {
  showWelcomeDialog.value = true
}
</script>

<template>
  <div class="pt-4">
    <band-section v-if="!preferencesStore.firstStartup" />
  </div>

  <v-container v-if="!preferencesStore.firstStartup">
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <upcoming-concerts-section />
        
        <top-locations-section />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>

  <welcome-dialog :model-value="showWelcomeDialog" />
</template>