<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithTopImage from '@/components/cardWithTopImage.vue';

defineProps({
  band: {
    type: BandModel,
    required: true
  }
})
</script>

<template>
  <v-row>
    <v-col>
      <section-divider title="Band Mitglieder" />
    </v-col>
  </v-row>

  <v-row>
    <v-spacer />

    <v-col v-for="member of band.members" cols="3">
      <card-with-top-image
        :title="member.name"
        :image="'artists/' + member.image"
        :link="false"
      />
    </v-col>

    <v-spacer />
  </v-row>
</template>