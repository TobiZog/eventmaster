<script setup lang="ts">
import { useRouter } from 'vue-router';
import ratingSection from './components/ratingSection.vue';
import bandMemberSection from './components/bandMemberSection.vue';
import gallerySection from './components/gallerySection.vue';
import concertSection from './components/concertSection.vue';
import heroImage from '@/components/pageParts/heroImage.vue';
import { useBandStore } from '@/stores/band.store';
import { onMounted, watch } from 'vue';
import { useConcertStore } from '@/stores/concert.store';

const router = useRouter()
const bandStore = useBandStore()
const concertStore = useConcertStore()

concertStore.getConcerts()

onMounted(async () => {
  bandStore.getBand(String(router.currentRoute.value.params.name).replaceAll('-', ' '))
})

watch(() => router.currentRoute.value.params.name, () => {
  bandStore.getBand(String(router.currentRoute.value.params.name).replaceAll('-', ' '))
})
</script>

<template>
  <hero-image
    :image="bandStore.band.imageMembers"
    :logo="bandStore.band.logo"
    :title="bandStore.band.name"
    :chips="bandStore.band.genres.map(genre => genre.name)"
    :description="bandStore.band.descriptionDe"
    :loading="bandStore.fetchInProgress"
  />

  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="12" md="10">
        <concert-section />

        <band-member-section />

        <rating-section
          :rating="bandStore.band.rating"
          :ratings="bandStore.band.ratingValues"
        />

        <gallery-section />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>