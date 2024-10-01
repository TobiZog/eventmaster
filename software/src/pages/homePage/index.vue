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
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider :title="$t('topEvents')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="i in 4" cols="3">
            <card-with-top-image
              :image="'tours/' + concertStore.tours[i - 1].image"
              :title="concertStore.tours[i - 1].band.name"
              smaller-title
              @click="router.push('/bands/' + concertStore.tours[i - 1].band.name.replaceAll(' ', '-').toLowerCase())"
            >
              ab {{ lowestTicketPrice(concertStore.tours[i - 1]) }} €
            </card-with-top-image>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <outlined-button
              append-icon="mdi-chevron-right"
              @click="router.push('/events')"
              block
            >
              {{ $t('allEvents') }}
            </outlined-button>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <section-divider :title="$t('topLocations')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="i in 8" cols="3">
            <card-with-top-image
              :image="'locations/' + concertStore.locations[i + 2].image"
              :title="concertStore.locations[i + 2].name"
              smaller-title
              @click="router.push('/locations/' + concertStore.locations[i + 2].name.replaceAll(' ', '-').toLowerCase())"
            >
              {{ concertStore.locations[i + 2].city.name }}, {{ concertStore.locations[i + 2].city.country }}
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
