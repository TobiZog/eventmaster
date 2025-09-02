<script setup lang="ts">
import { useRouter } from 'vue-router';
import heroImage from '@/components/organisms/heroImage.vue';
import { useLocationStore } from '@/stores/location.store';
import locationConcertsSection from '../components/organisms/locationConcertsSection.vue';
import locationSeatMapSection from '../components/organisms/locationSeatMapSection.vue';
import { onMounted, watch } from 'vue';

const router = useRouter()
const locationStore = useLocationStore()

onMounted(async () => {
  locationStore.getLocationByName(String(router.currentRoute.value.params.name))
})

watch(() => router.currentRoute.value.params.name, () => {
  locationStore.getLocationByName(String(router.currentRoute.value.params.name))
})
</script>

<template>
  <hero-image
    :title="locationStore.location.name"
    :image="locationStore.location.imageIndoor"
    :description="locationStore.location.address + locationStore.location.city.name"
    :loading="locationStore.fetchInProgress"
    :logo="locationStore.location.imageOutdoor"
  >
    <template #description>
      <p class="text-h6">{{ locationStore.location.address }}</p>
      <p class="text-h6">{{ locationStore.location.city.name }}</p>
    </template>
  </hero-image>

  <v-container>
    <v-row>
      <v-spacer/>

      <v-col cols="10">
        <location-concerts-section />

        <location-seat-map-section />
      </v-col>

      <v-spacer/>
    </v-row>
  </v-container>
</template>