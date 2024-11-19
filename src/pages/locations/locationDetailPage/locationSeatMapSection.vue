<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';

const locationStore = useLocationStore()
</script>

<template>
  <!-- Seat Map divider -->
  <v-row>
    <v-col>
      <section-divider :title="$t('location.seat.seatPlan')" />
    </v-col>
  </v-row>

  <!-- Loading circle during fetching -->
  <div v-if="locationStore.fetchInProgress">
    <v-col class="text-center">
      <circular-progress-indeterminate />
    </v-col>
  </div>

  <!-- Seat map -->
  <v-row v-else>
    <v-col>
      <seat-plan-map
        :location="locationStore.location"
        :seat-groups="locationStore.location.seatGroups"
        :disabled="true"
      />
    </v-col>
  </v-row>
</template>