<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import concertFilterbar from './concertFilterbar.vue';
import ConcertsListSection from './concertsListSection.vue';
import { onMounted } from 'vue';

const concertStore = useConcertStore()

onMounted(async () => {
  concertStore.getConcerts()
})
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