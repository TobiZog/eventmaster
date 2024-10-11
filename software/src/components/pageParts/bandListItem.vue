<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { lowestTicketPrice, lowestTicketPriceEvents } from '@/scripts/concertScripts';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { EventModel } from '@/data/models/acts/eventModel';
import { useRouter } from 'vue-router';
import { GenreModel } from '@/data/models/acts/genreModel';
import { EventApiModel } from '@/data/models/acts/eventApiModel';

const router = useRouter()

defineProps({
  /** Band to display */
  band: {
    type: BandModel,
    required: true
  },

  /** Events where the band participate */
  events: {
    type: Array<EventApiModel>,
    required: true
  },

  genres: {
    type: Array<GenreModel>,
    required: true
  },

  /** Display text parts as skeleton */
  loading: Boolean
})
</script>

<template>
  <card-view-horizontal
    v-if="!loading"
    :title="band.name"
    :image="'http://localhost:3000/static/' + band.logo"
    @click="router.push('/bands/' + band.name.replaceAll(' ', '-').toLowerCase())"
  >
    <template #content>
      <div>
        <v-chip
          v-for="genre in genres"
          class="mr-2 my-1"
          variant="flat"
        >
          {{ genre.name }}
        </v-chip>
      </div>
    </template>

    <template #append>
      <div>
        <div class="text-secondary font-weight-medium text-h6 pb-1">
          {{ $t('from') + ' ' + lowestTicketPriceEvents(events) + ' €' }}
        </div>

        <div>
          <v-btn variant="flat" color="secondary">
            {{ events.length }} {{ $t('event', events.length) }}
          </v-btn>
        </div>
      </div>
    </template>
  </card-view-horizontal>
</template>