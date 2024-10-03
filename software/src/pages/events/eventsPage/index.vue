<script setup lang="ts">
import cardWithLeftImage from '@/components/cardWithLeftImage.vue';
import { createDateRangeString, lowestTicketPrice } from '@/scripts/concertScripts';
import filterBar from './filterBar.vue';
import { useRouter } from 'vue-router';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useFeedbackStore } from '@/data/stores/feedbackStore';

const router = useRouter()
const shoppingStore = useShoppingStore()
const feedbackStore = useFeedbackStore()

shoppingStore.getEvents()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <filter-bar />
          </v-col>
        </v-row>

        <v-row v-if="feedbackStore.fetchDataFromServerInProgress">
          <v-col class="text-center">
            <v-progress-circular indeterminate :size="128" :width="12" color="primary" />
          </v-col>
        </v-row>

        <v-row
          v-else-if="shoppingStore.events.length > 0"
          v-for="event of shoppingStore.events"
        >
          <v-col>
            <card-with-left-image
              :title="event.band.name + ' - ' +  event.name"
              :image="'http://localhost:3000/static/tours/' + event.image"
              @click="router.push('/bands/' + event.band.name.replaceAll(' ', '-').toLowerCase())"
            >
              {{ createDateRangeString(event) }}
              <div>{{ event.concerts.length }} {{ $t('concert', event.concerts.length) }}</div>

              <template #append>
                <div>
                  <v-icon
                    icon="mdi-ticket"
                    color="secondary"
                    size="x-large"
                  />
                </div>
                ab {{ lowestTicketPrice(event) }} €
              </template>
            </card-with-left-image>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col>
            <v-empty-state 
              :title="$t('noEventsFound')"
              icon="mdi-magnify"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>