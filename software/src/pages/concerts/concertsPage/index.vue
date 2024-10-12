<script setup lang="ts">
import { useConcertStore } from '@/data/stores/concertStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';

const concertStore = useConcertStore()
const feedbackStore = useFeedbackStore()

concertStore.getConcerts()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            Filterbar
            <!-- todo: Filterbar? -->
          </v-col>
        </v-row>

        <v-row
          v-if="feedbackStore.fetchDataFromServerInProgress"
          v-for="i in 3"
        >
          <v-col>
            <card-view-horizontal :loading="true" />        
          </v-col>
        </v-row>



        <div
          v-else-if="concertStore.concerts.length > 0"
          v-for="(concert, index) of concertStore.concerts"
        >
          <v-row 
            v-if="index == 0 || 
            new Date(concertStore.concerts[index - 1].date).getMonth() != 
            new Date(concertStore.concerts[index].date).getMonth()"
          >
            <v-col>
              <section-divider
                :title="new Date(concert.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(concert.date).getFullYear()"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <concert-list-item
                :concert="concert"
                :band="concert.band"
                :location="concert.location"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>