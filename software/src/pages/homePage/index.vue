<script setup lang="ts">
import highlightCarousel from './highlightCarousel.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import { lowestTicketPrice } from '@/scripts/concertScripts';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { useRouter } from 'vue-router';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { ref } from 'vue';
import { EventModel } from '@/data/models/acts/eventModel';
import { getTopEvents } from '@/data/api/eventApi';
import { LocationModel } from '@/data/models/locations/locationModel';
import { getTopLocations } from '@/data/api/locationApi';

const router = useRouter()
const feedbackStore = useFeedbackStore()
const topEvents = ref<Array<EventModel>>(Array.from({length: 4}, () => new EventModel()))
const topLocations = ref<Array<LocationModel>>(Array.from({length: 8}, () => new LocationModel()))

feedbackStore.fetchDataFromServerInProgress = true

getTopEvents(4)
  .then(events => {
    topEvents.value = events.data

    getTopLocations(8)
      .then(locations => {
        topLocations.value = locations.data
        feedbackStore.fetchDataFromServerInProgress = false
      })
  })
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
              :image="topEvents[i - 1].image"
              :title="topEvents[i - 1].band.name"
              smaller-title
              @click="router.push('/bands/' + topEvents[i - 1].band.name.replaceAll(' ', '-').toLowerCase())"
              :loading="feedbackStore.fetchDataFromServerInProgress"
            >
              ab {{ lowestTicketPrice(topEvents[i - 1]) }} €
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
              :image="topLocations[i - 1].imageOutdoor"
              :title="topLocations[i - 1].name"
              smaller-title
              @click="router.push('/locations/' + topLocations[i - 1].name.replaceAll(' ', '-').toLowerCase())"
              :loading="feedbackStore.fetchDataFromServerInProgress"
            >
              {{ topLocations[i - 1].city.name }}, {{ topLocations[i - 1].city.country }}
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
