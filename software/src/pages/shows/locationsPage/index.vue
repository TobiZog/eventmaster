<script setup lang="ts">
import sectionDivider from '@/components/sectionDivider.vue';
import { useConcertStore } from '@/data/stores/concertStore';
import cardWithTopImage from '@/components/cardWithTopImage.vue';

const concertStore = useConcertStore()
</script>

<template>
  <v-container>
    <div v-for="city in concertStore.cities">
      <v-row>
        <v-col>
          <section-divider 
            :title="city.name"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="location in city.locations" cols="3">
          <card-with-top-image
            :image="'locations/' + location.image"
            :title="location.name"
          >
            {{ location.address }}
          </card-with-top-image>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>