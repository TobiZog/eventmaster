<script setup lang="ts">
import { useConcertStore } from "@/stores/concert.store";
import { useLocationStore } from "@/stores/location.store";
import bandsSection from "../components/organisms/bandsSection.vue";
import upcomingConcertsSection from "../components/organisms/upcomingConcertsSection.vue";
import topLocationsSection from "../components/organisms/topLocationsSection.vue";
import { usePreferencesStore } from "@/stores/preferences.store";
import welcomeDialog from "../components/organisms/welcomeDialog.vue";
import { ref } from "vue";
import topGenresSection from "../components/organisms/topGenresSection.vue";

const concertStore = useConcertStore();
const locationStore = useLocationStore();
const preferencesStore = usePreferencesStore();
const showWelcomeDialog = ref(false);

concertStore.getUpcomingConcerts();
locationStore.getTopLocations();

// First startup
if (preferencesStore.firstStartup) {
  showWelcomeDialog.value = true;
}
</script>

<template>
  <div class="pt-4">
    <bands-section v-if="!preferencesStore.firstStartup" />
  </div>

  <v-container v-if="!preferencesStore.firstStartup">
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <upcoming-concerts-section />

        <top-genres-section />

        <top-locations-section />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>

  <welcome-dialog :model-value="showWelcomeDialog" />
</template>
