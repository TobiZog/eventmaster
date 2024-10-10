<script setup lang="ts">
import { createDateRangeString, lowestTicketPrice } from '@/scripts/concertScripts';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { EventModel } from '@/data/models/acts/eventModel';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps({
  event: EventModel,
  loading: Boolean
})
</script>

<template>
  <card-view-horizontal
    v-if="!loading"
    :image="'http://localhost:3000/static/' + event.image"
    @click="router.push('/bands/' + event.band.name.replaceAll(' ', '-').toLowerCase())"
  >
    <template #content>
      <div class="text-h6 font-weight-black pt-1">
        {{ event.band.name }} - {{ event.name }}
      </div>
      
      <div class="descriptionShort mb-2 pr-4 text-disabled" >
        {{ event.band.descriptionDe }}
      </div>

      <div class="text-disabled">
        {{ createDateRangeString(event) }} - {{ event.concerts.length }} {{ $t('concert', event.concerts.length) }}
      </div>
    </template>

    <template #append>
      <div>
        <div class="text-secondary font-weight-medium text-body-1 pb-1">
          {{ $t('from') + ' ' + lowestTicketPrice(event) + ' €' }}
        </div>

        <div>
          <v-btn variant="flat" color="secondary">
            {{ event.concerts.length }} {{ $t('concert', event.concerts.length) }}
          </v-btn>
        </div>
      </div>
    </template>
  </card-view-horizontal>

  <card-view-horizontal
    :loading="loading"
    v-else
  >
    <v-skeleton-loader
      type="text" />
  </card-view-horizontal>
</template>

<style scoped>
.descriptionShort {
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
}
</style>