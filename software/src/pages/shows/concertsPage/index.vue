<script setup lang="ts">
import cardWithLeftImage from '@/components/cardWithLeftImage.vue';
import { useConcertStore } from '@/data/stores/concertStore';
import { createDateRangeString, lowestTicketPrice } from '@/scripts/concertScripts';

const concertStore = useConcertStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row v-for="tour of concertStore.tours">
          <v-col>
            <card-with-left-image
              :title="tour.band.name + ' - ' +  tour.name"
              :image="'http://localhost:3000/static/tours/' + tour.image"
            >
              {{ createDateRangeString(tour) }}
              <div>{{ tour.shows.length }} {{ $t('tours.concert', tour.shows.length) }}</div>

              <template #append>
                <div class="d-flex justify-center align-center text-h5" style="height: 100%;">
                  ab {{ lowestTicketPrice(tour) }} €
                </div>
              </template>
            </card-with-left-image>
          </v-col>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>