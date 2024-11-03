<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import concertFilterbar from './concertFilterbar.vue';
import ConcertsListSection from './concertsListSection.vue';

const concertStore = useConcertStore()

concertStore.getConcerts()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <concert-filterbar />
          </v-col>
        </v-row>

        <concerts-list-section />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>