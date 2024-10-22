<script setup lang="ts">
import sectionDivider from '@/components/basics/sectionDivider.vue';
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import locationListItem from '@/components/pageParts/locationListItem.vue';
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore()

locationStore.getLocations()
</script>

<template>
  <v-container>
    <v-row>

    </v-row>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <!-- During fetching -->
        <div v-if="locationStore.fetchInProgress" v-for="i in 2">
          <v-row>
            <v-col>
              <section-divider :loading="true" />
            </v-col>
          </v-row>

          <v-row >
            <v-col class="text-center" v-for="i in 4" cols="3">
              <card-with-top-image :loading="true" />
            </v-col>
          </v-row>
        </div>

        <!-- When all data are downloaded -->
        <div
          v-else-if="locationStore.locations.length > 0"
          v-for="city in locationStore.cities"
        >
          <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <section-divider 
                    :title="city.name"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  v-for="location in locationStore.getLocationsByCity(city.name)"
                  cols="3"
                >
                  <location-list-item
                    :location="location"
                    :nrOfConcerts="location.nrOfConcerts"
                  />
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>