<script setup lang="ts">
import searchBar from './searchBar.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import locationListItem from '@/components/pageParts/locationListItem.vue';
import cardViewTopImage from '@/components/basics/cardViewTopImage.vue';
import bandListItem from '@/components/pageParts/bandListItem.vue';
import { useSearchStore } from '@/stores/search.store';
import ConcertListItem from '@/components/pageParts/concertListItem.vue';

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

        <v-row v-if="!searchStore.alreadySearched">
          <v-col>
            <v-empty-state
              icon="mdi-magnify"
              :headline="$t('misc.search.empty.headline')"
              :title="$t('misc.enterSomeKeywords')"
            />
          </v-col>
        </v-row>

        <div v-else>
          <v-row>
            <v-col>
              <section-divider :title="$t('band.band', 2)" />
            </v-col>
          </v-row>

          <v-row
            v-if="searchStore.fetchInProgress"
            v-for="i in 2"
          >
            <v-col>
              <card-view-horizontal :loading="true" />
            </v-col>
          </v-row>

          <v-row 
            v-else-if="searchStore.bands.length > 0"
            v-for="band in searchStore.bands"
          >
            <v-col>
              <band-list-item
                :band="band"
                :concerts="band.concerts"
                :genres="band.genres"
                :loading="searchStore.fetchInProgress"
              />
            </v-col>
          </v-row>

          <v-row v-else >
            <v-col>
              <v-empty-state 
                :title="$t('band.noBandFound')"
                icon="mdi-guitar-electric"
              />
            </v-col>
          </v-row>



          <!-- Section Concert results -->
          <v-row>
            <v-col>
              <section-divider :title="$t('concert.concert', 2)" />
            </v-col>
          </v-row>

          <v-row
            v-if="searchStore.fetchInProgress"
            v-for="i in 2"
          >
            <v-col>
              <card-view-horizontal :loading="true" />
            </v-col>
          </v-row>

          <v-row
            v-else-if="searchStore.concerts.length > 0"
            v-for="concert in searchStore.concerts"
          >
            <v-col>
              <concert-list-item
                :concert="concert"
                :band="concert.band"
                :location="concert.location"
              />
            </v-col>
          </v-row>

          <v-row v-else >
            <v-col>
              <v-empty-state 
                :title="$t('concert.noConcertsFound')"
                icon="mdi-party-popper"
              />
            </v-col>
          </v-row>



          <!-- Section Location results -->
          <v-row>
            <v-col>
              <section-divider :title="$t('location.location', 2)" />
            </v-col>
          </v-row>

          <v-row
            v-if="searchStore.fetchInProgress"
          >
            <v-col v-for="i in 4">
              <card-view-top-image :loading="true" />
            </v-col>
          </v-row>

          <v-row 
            v-else-if="searchStore.locations.length > 0"
          >
            <v-col
              cols="6"
              md="3"
              v-for="location in searchStore.locations"
            >
              <location-list-item
                :location="location"
                :nr-of-concerts="location.concerts.length"
              />
            </v-col>
          </v-row>

          <v-row v-else >
            <v-col>
              <v-empty-state 
                :title="$t('location.noLocationsFound')"
                icon="mdi-city"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>