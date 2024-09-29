<script setup lang="ts">
import { useConcertStore } from '@/data/stores/concertStore';
import highlightCarousel from './highlightCarousel.vue';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithTopImage from '@/components/cardWithTopImage.vue';
import { calcRating, lowestTicketPrice } from '@/scripts/concertScripts';
import OutlinedButton from '@/components/outlinedButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const concertStore = useConcertStore()
</script>

<template>
  <highlight-carousel />

  <v-container>
    <v-row>
      <v-col>
        <section-divider :title="$t('shows.highlights')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="i in 6" cols="2">
        <card-with-top-image
          :image="'tours/' + concertStore.tours[i - 1].image"
          :title="concertStore.tours[i - 1].band.name"
          smaller-title
        >
          Tickets ab {{ lowestTicketPrice(concertStore.tours[i - 1]) }} €
        </card-with-top-image>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <outlined-button
          append-icon="mdi-chevron-right"
          @click="router.push('/shows/concerts')"
          block
        >
          {{ $t('menu.allConcerts') }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <section-divider :title="$t('shows.topLocations')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="i in 6" cols="2">
        <card-with-top-image
          :image="'locations/' + concertStore.locations[i + 2].image"
          :title="concertStore.locations[i + 2].name"
          smaller-title
        >
          {{ concertStore.locations[i + 2].city.name }}, {{ concertStore.locations[i + 2].city.country }}
        </card-with-top-image>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <outlined-button
          append-icon="mdi-chevron-right"
          @click="router.push('/shows/locations')"
          block
        >
          {{ $t('menu.allLocations') }}
        </outlined-button>
      </v-col>
    </v-row>
  </v-container>
</template>
