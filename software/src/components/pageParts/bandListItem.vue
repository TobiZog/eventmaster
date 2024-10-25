<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { lowestTicketPrice } from '@/scripts/concertScripts';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { useRouter } from 'vue-router';
import { GenreModel } from '@/data/models/acts/genreModel';
import { ConcertModel } from '@/data/models/acts/concertModel';

const router = useRouter()

defineProps({
  /** Band to display */
  band: {
    type: BandModel,
    required: true
  },

  concerts: {
    type: Array<ConcertModel>,
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
    @click="router.push('/bands/details/' + band.name.replaceAll(' ', '-').toLowerCase())"
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
          {{ $t('misc.from') + ' ' + lowestTicketPrice(concerts) + ' €' }}
        </div>

        <div>
          <v-btn variant="flat" color="secondary">
            {{ $t('misc.actions.more') }}
          </v-btn>
        </div>
      </div>
    </template>
  </card-view-horizontal>
</template>