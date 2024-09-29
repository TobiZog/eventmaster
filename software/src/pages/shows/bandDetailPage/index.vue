<script setup lang="ts">
import { useConcertStore } from '@/data/stores/concertStore';
import { BandModel } from '@/data/models/acts/bandModel';
import { useRouter } from 'vue-router';
import bandBanner from './bandBanner.vue';
import ratingSection from './ratingSection.vue';
import bandMemberSection from './bandMemberSection.vue';
import gallerySection from './gallerySection.vue';
import concertSection from './concertSection.vue';

const router = useRouter()

const concertStore = useConcertStore()
const band: BandModel = concertStore.bands.find(band =>
  band.name.replaceAll(' ', '-').toLowerCase() == router.currentRoute.value.params.bandName
)
</script>

<template>
  <band-banner :band="band" />

  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <concert-section :band="band" />

        <band-member-section :band="band" />

        <rating-section :band="band" />

        <gallery-section :band="band" />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>