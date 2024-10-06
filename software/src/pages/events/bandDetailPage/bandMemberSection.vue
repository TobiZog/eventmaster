<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import cardWithTopImage from '@/components/basics/cardViewTopImage.vue';
import { useFeedbackStore } from '@/data/stores/feedbackStore';

const feedbackStore = useFeedbackStore()

defineProps({
  band: {
    type: BandModel,
    required: true
  }
})
</script>

<template>
  <v-row v-if="feedbackStore.fetchDataFromServerInProgress" >
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