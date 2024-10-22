<script setup lang="ts">
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import { BandApiModel } from '@/data/models/acts/bandApiModel';
import { useBandStore } from '@/stores/band.store';

const bandStore = useBandStore()

defineProps({
  band: {
    type: BandApiModel,
    required: true
  }
})
</script>

<template>
  <v-row v-if="bandStore.fetchInProgress" >
    <v-col cols="3" v-for="i in 4">
      <card-with-top-image :loading="true" />
    </v-col>
  </v-row>

  <v-row>
    <v-spacer />

    <v-col v-for="member of band.members" cols="3">
      <card-with-top-image
        :title="member.name"
        :image=" member.image"
        :link="false"
      />
    </v-col>

    <v-spacer />
  </v-row>
</template>