<script setup lang="ts">
import highlightCarousel from './highlightCarousel.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { useRouter } from 'vue-router';
import { useConcertStore } from '@/stores/concert.store';
import { useLocationStore } from '@/stores/location.store';

const router = useRouter()
const concertStore = useConcertStore()
const locationStore = useLocationStore()

concertStore.getUpcomingConcerts()
locationStore.getTopLocations()
</script>

<template>
  <highlight-carousel />

  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider :title="$t('upcomingConcerts')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="concert in concertStore.upcomingConcerts" cols="3">
            <card-with-top-image
              :image="concert.image"
              :title="concert.band.name"
              smaller-title
              @click="router.push('/bands/details/' + concert.band.name.replaceAll(' ', '-').toLowerCase())"
              :loading="concertStore.fetchInProgress"
            >
              {{ $t("from") }} {{ (concert.price).toPrecision(4) }} €
              <!-- ab  € todo -->
            </card-with-top-image>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <outlined-button
              append-icon="mdi-chevron-right"
              @click="router.push('/concerts')"
              block
            >
              {{ $t('allConcerts') }}
            </outlined-button>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <section-divider :title="$t('topLocations')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="location in locationStore.topLocations" cols="3">
            <card-with-top-image
              :image="location.imageOutdoor"
              :title="location.name"
              smaller-title
              @click="router.push('/locations/details/' + location.name.replaceAll(' ', '-').toLowerCase())"
              :loading="locationStore.fetchInProgress"
            >
              {{ location.city.name }}, {{ location.city.country }}
            </card-with-top-image>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <outlined-button
              append-icon="mdi-chevron-right"
              @click="router.push('/locations')"
              block
            >
              {{ $t('allLocations') }}
            </outlined-button>
          </v-col>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
    

    
  </v-container>
</template>
