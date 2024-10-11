<script setup lang="ts">
import cardViewTopImage from '../basics/cardViewTopImage.vue';
import { useRouter } from 'vue-router';
import { LocationModel } from '@/data/models/locations/locationModel';
import { ConcertModel } from '@/data/models/acts/concertModel';

const router = useRouter()

defineProps({
  location: {
    type: LocationModel,
    required: true
  },
  concerts: {
    type: Array<ConcertModel>,
    required: true
  }
})
</script>

<template>
  <card-view-top-image
    :image="location.imageOutdoor"
    :title="location.name"
    @click="router.push('locations/' + location.name.replaceAll(' ', '-').toLowerCase())"
  >
    <div>
      {{ concerts.length }} {{ $t('concert', concerts.length) }}
    </div>
  </card-view-top-image>
</template>