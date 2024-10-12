<script setup lang="ts">
import cardViewTopImage from '../basics/cardViewTopImage.vue';
import { useRouter } from 'vue-router';
import { LocationModel } from '@/data/models/locations/locationModel';

const router = useRouter()

defineProps({
  location: {
    type: LocationModel,
    required: true
  },
  nrOfConcerts: {
    type: Number
  }
})
</script>

<template>
  <card-view-top-image
    :image="location.imageOutdoor"
    :title="location.name"
    @click="router.push('locations/details/' + location.name.replaceAll(' ', '-').toLowerCase())"
  >
    <div>
      {{ nrOfConcerts }} {{ $t('concert', nrOfConcerts) }}
    </div>
  </card-view-top-image>
</template>