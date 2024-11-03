<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import { useLocationStore } from '@/stores/location.store';
import bandSection from './bandsSection.vue';
import UpcomingConcertsSection from './upcomingConcertsSection.vue';
import TopLocationsSection from './topLocationsSection.vue';

const concertStore = useConcertStore()
const locationStore = useLocationStore()

concertStore.getUpcomingConcerts()
locationStore.getTopLocations()
</script>

<template>
  <div class="pt-4">
    <band-section />
  </div>

  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <upcoming-concerts-section />
        
        <top-locations-section />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>