<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { CityModel } from '@/data/models/locations/cityModel';
import { LocationModel } from '@/data/models/locations/locationModel';
import { useConcertStore } from '@/stores/concert.store';
import { useLocationStore } from '@/stores/location.store';

const concertStore = useConcertStore()
const locationStore = useLocationStore()

locationStore.getLocations()

function itemProps(item: CityModel) {
  return {
    title: item.name
  }
}
</script>

<template>
  <card-view
    :title="$t('filtering')"
    icon="mdi-filter"
  >
    <v-row>
      <v-col>
        <v-select
          v-model="concertStore.filteredCities"
          :items="locationStore.cities"
          variant="outlined"
          :label="$t('city', 2)"
          :item-props="itemProps"
          chips
          clearable
          hide-details
          multiple
        />
      </v-col>

      <v-col cols="auto">
        <outlined-button
          @click="concertStore.getConcerts"
          height="100%"
        >
          {{ $t('filtering') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>
</template>