<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { useConcertStore } from '@/data/stores/concertStore';

const concertStore = useConcertStore()
</script>

<template>
  <card-view
    variant="tonal"
  >
    <v-row>
      <v-col cols="3">
        <v-select
          variant="outlined"
          :items="concertStore.cities"
          v-model="concertStore.cityFilter"
          label="Stadt"
          density="compact"
          class="mb-n5"
          :clearable="concertStore.cityFilter != null && concertStore.cityFilter.id != undefined"
          base-color="secondary"
          color="secondary"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props" :title="item.raw.name" />
          </template>

          <template #selection="{ item }">
            <v-list-item :title="item.raw.name" />
          </template>
        </v-select>
      </v-col>

      <v-col cols="auto" class="d-flex justify-center align-center px-0">
        <v-icon icon="mdi-chevron-right" />
      </v-col>

      <v-col cols="4">
        <v-select
          variant="outlined"
          :items="concertStore.filteredLocations"
          v-model="concertStore.locationFilter"
          :label="$t('concerts.location')"
          density="compact"
          :clearable="concertStore.locationFilter != null && concertStore.locationFilter.id != undefined"
          :disabled="concertStore.cityFilter == null || concertStore.cityFilter.id == undefined"
          class="mb-n5"
          base-color="secondary"
          color="secondary"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props" :title="item.raw.name" />
          </template>

          <template #selection="{ item }">
            <v-list-item :title="item.raw.name" />
          </template>
        </v-select>
      </v-col>

      <v-divider vertical />

      <v-col cols="4">
        <v-select
          variant="outlined"
          :items="concertStore.genres"
          v-model="concertStore.genreFilter"
          label="Genre"
          density="compact"
          :clearable="concertStore.genreFilter != null && concertStore.genreFilter.id != undefined"
          class="mb-n5"
          base-color="secondary"
          color="secondary"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props" :title="item.raw.name" />
          </template>

          <template #selection="{ item }">
            <v-list-item :title="item.raw.name" />
          </template>
        </v-select>
      </v-col>
    </v-row>
  </card-view>
</template>