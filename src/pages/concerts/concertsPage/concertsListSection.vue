<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import concertFilterbar from './concertFilterbar.vue';

const concertStore = useConcertStore()
</script>

<template>
  <div
    v-if="concertStore.fetchInProgress"
  >
    <section-divider :loading="true" />
    <v-row v-for="i in 3">
      <v-col>
        <card-view-horizontal :loading="true" />
      </v-col>
    </v-row>
  </div>

  <div
    v-else-if="concertStore.concerts.length > 0"
    v-for="(concert, index) of concertStore.concerts"
  >
    <div v-if="concert.offered">
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
  </div>
</template>