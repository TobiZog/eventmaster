<script setup lang="ts">
import cardViewTopImage from '../basics/cardViewTopImage.vue';
import { LocationModel } from '@/data/models/locations/locationModel';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps({
  location: LocationModel
})
</script>

<template>
  <card-view-top-image
    :image="location.imageOutdoor"
    :title="location.name"
    @click="router.push('locations/' + location.name.replaceAll(' ', '-').toLowerCase())"
  >
    <div>
      {{ location.concerts.length }} {{ $t('concert', location.concerts.length) }}
    </div>
  </card-view-top-image>
</template>