<script setup lang="ts">
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { BandApiModel } from '@/data/models/acts/bandApiModel';
import { ConcertApiModel } from '@/data/models/acts/concertApiModel';
import CardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { useConcertStore } from '@/stores/concertStore';

const concertStore = useConcertStore()

defineProps({
  band: BandApiModel,
  concerts: Array<ConcertApiModel>
})
</script>

<template>
  <v-row v-if="concertStore.fetchInProgress" v-for="i in 3">
    <v-col>
      <card-view-horizontal :loading="true" />
    </v-col>
  </v-row>

  <v-row v-for="concert of concerts">
    <v-col>
      <concert-list-item
        :concert="concert"
        :band="band"
        :location="concert.location"
        :title="concert.location.city.name"
        :link="concert.inStock > 0"
      />
    </v-col>
  </v-row>
</template>