<script setup lang="ts">
import concertListItem from '@/components/pageParts/concertListItem.vue';
import CardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useBandStore } from '@/stores/band.store';

const bandStore = useBandStore()
</script>

<template>
  <v-row>
    <v-col>
      <section-divider :title="$t('concert.concert', 2)" />
    </v-col>
  </v-row>

  <v-row v-if="bandStore.fetchInProgress" v-for="i in 3">
    <v-col>
      <card-view-horizontal :loading="true" />
    </v-col>
  </v-row>

  <v-row v-for="concert of bandStore.band.concerts">
    <v-col>
      <concert-list-item
        :concert="concert"
        :band="bandStore.band"
        :location="concert.location"
        :title="concert.location.city.name"
        :link="concert.inStock > 0"
      />
    </v-col>
  </v-row>
</template>