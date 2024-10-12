<script setup lang="ts">
import searchBar from './searchBar.vue';
import eventListItem from '@/components/pageParts/eventListItem.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import locationListItem from '@/components/pageParts/locationListItem.vue';
import cardViewTopImage from '@/components/basics/cardViewTopImage.vue';
import bandListItem from '@/components/pageParts/bandListItem.vue';
import { useSearchStore } from '@/data/stores/searchStore';

const searchStore = useSearchStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <search-bar />
          </v-col>
        </v-row>

        <div v-if="searchStore.alreadySearched">
          <v-row>
            <v-col>
              <section-divider :title="$t('band', 2)" />
            </v-col>
          </v-row>

          <v-row
            v-if="searchStore.searchInProgress"
            v-for="i in 2"
          >
            <v-col>
              <card-view-horizontal :loading="true" />
            </v-col>
          </v-row>

          <v-row 
            v-else-if="searchStore.bands.length > 0"
            v-for="band in searchStore.bands">
            <v-col>
              <band-list-item
                :band="band"
                :events="band.events"
                :genres="band.genres"
                :loading="searchStore.searchInProgress"
              />
            </v-col>
          </v-row>

          <v-row v-else >
            <v-col>
              <v-empty-state 
                :title="$t('noBandFound')"
                icon="mdi-guitar-electric"
              />
            </v-col>
          </v-row>



          <!-- Section Location results -->
          <v-row>
            <v-col>
              <section-divider :title="$t('location', 2)" />
            </v-col>
          </v-row>

          <v-row
            v-if="searchStore.searchInProgress"
          >
            <v-col v-for="i in 4">
              <card-view-top-image :loading="true" />
            </v-col>
          </v-row>

          <v-row 
            v-else-if="searchStore.locations.length > 0"
          >
            <v-col
              cols="3"
              v-for="locaiton in searchStore.locations"
            >
              <location-list-item
                :location="locaiton"
                :concerts="locaiton.concerts"
              />
            </v-col>
          </v-row>

          <v-row v-else >
            <v-col>
              <v-empty-state 
                :title="$t('noLocationsFound')"
                icon="mdi-city"
              />
            </v-col>
          </v-row>



          <!-- Section Event results -->
          <v-row>
            <v-col>
              <section-divider :title="$t('event', 2)" />
            </v-col>
          </v-row>

          <v-row
            v-if="searchStore.searchInProgress"
            v-for="i in 2"
          >
            <v-col>
              <card-view-horizontal :loading="true" />
            </v-col>
          </v-row>

          <v-row
            v-else-if="searchStore.events.length > 0"
            v-for="event in searchStore.events"
          >
            <v-col>
              <event-list-item
                :event="event"
                :band="event.band"
                :concerts="event.concerts"
                :loading="searchStore.searchInProgress"
              />
            </v-col>
          </v-row>

          <v-row v-else >
            <v-col>
              <v-empty-state 
                :title="$t('noEventsFound')"
                icon="mdi-party-popper"
              />
            </v-col>
          </v-row>
        </div>

      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>