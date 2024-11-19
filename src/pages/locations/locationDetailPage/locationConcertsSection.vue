<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import concertListItem from '@/components/pageParts/concertListItem.vue';

const locationStore = useLocationStore()
</script>

<template>
  <!-- Concerts divider -->
  <v-row>
    <v-col>
      <section-divider :title="$t('concert.concert', 2)" />
    </v-col>
  </v-row>

  <!-- Display skeleton cards on fetching -->
  <v-row v-for="i in 3"  v-if="locationStore.fetchInProgress">
    <v-col class="text-center">
      <card-view-horizontal :loading="true" />
    </v-col>
  </v-row>

  <!-- Show concerts after fetching -->
  <div
    v-else-if="locationStore.location.concerts.length > 0"
    v-for="concert of locationStore.location.concerts"
  >
    <v-row
      v-if="concert.offered"
    >
      <v-col>
        <concert-list-item
          :concert="concert"
          :band="concert.band"
          :location="locationStore.location"
          :title="concert.name"
        >
          <template #description>
            {{ concert.band.name }}
          </template>
        </concert-list-item>
      </v-col>
    </v-row>
  </div>

  <!-- Show empty state if no items there -->
  <v-row v-else>
    <v-col>
      <v-empty-state
        icon="mdi-magnify"
        :title="$t('concert.noConcertsFound')"
      />
    </v-col>
  </v-row>
</template>