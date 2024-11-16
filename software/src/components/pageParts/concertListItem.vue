<script setup lang="ts">
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { BandModel } from '@/data/models/acts/bandModel';
import { ConcertModel } from '@/data/models/acts/concertModel';
import { LocationModel } from '@/data/models/locations/locationModel';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps({
  /** Concert to display */
  concert: {
    type: ConcertModel,
    required: true
  },

  band: {
    type: BandModel,
    required: true
  },

  location: {
    type: LocationModel,
    required: true
  },

  /** Display text parts as skeleton */
  loading: Boolean,

  /** Show or hide the button on the right side */
  showButton: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <card-view-horizontal
    :title="concert.name"
    v-if="!loading"
    :link="showButton && concert.inStock > 0"
    @click="showButton && concert.inStock > 0 ? router.push('/concerts/booking/' + location.urlName + '/' + concert.date) : () => {}"
  >
    <template #prepend>
      <div>
        <div class="text-h4">
          {{ String(new Date(concert.date).getDate()).padStart(2, "0") }}
        </div>

        <div class="text-h6">
          {{ new Date(concert.date).toLocaleString('default', { month: 'long' }) }}
        </div>

        <div class="text-h6">
          {{ new Date(concert.date).getFullYear() }}
        </div>
      </div>
    </template>

    <template #content>
      <div>
        {{ band.name }}
      </div>

      <div>
        {{ location.name }}
      </div>
    </template>

    <template #append>
      <div>
        <div class="text-secondary font-weight-medium text-h6 pb-1">
          {{ $t('misc.from') + ' ' + concert.price.toFixed(2) + ' €' }}
        </div>

        <div v-if="concert.inStock == 0 && showButton" class="text-h6">
          {{ $t('concert.concertSoldOut') }}
        </div>

        <div v-else-if="showButton">
          <v-btn variant="flat" color="secondary">
            {{ $t('concert.goToTheConcert') }}
          </v-btn>
        </div>

      </div>
    </template>
  </card-view-horizontal>

  <card-view-horizontal 
    v-else
    :loading="loading"
  >
    <v-skeleton-loader
      type="text" />
  </card-view-horizontal>
</template>