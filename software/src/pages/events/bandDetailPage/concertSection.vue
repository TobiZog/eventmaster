<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { ConcertApiModel } from '@/data/models/acts/concertApiModel';
import { BandApiModel } from '@/data/models/acts/bandApiModel';
import { EventApiModel } from '@/data/models/acts/eventApiModel';

const router = useRouter()
const feedbackStore = useFeedbackStore()

defineProps({
  band: BandApiModel,
  events: Array<EventApiModel>
})
</script>

<template>
  <v-row v-if="feedbackStore.fetchDataFromServerInProgress" v-for="i in 3">
    <v-col>
      <!-- <concert-list-item
        :loading="true" /> -->
    </v-col>
  </v-row>

  <div v-else v-for="event of events">
    <v-row v-for="concert of event.concerts">
      <v-col>
        <concert-list-item
          :concert="concert"
          :title="concert.location.city.name"
          :link="concert.inStock > 0"
          :onClick="() => router.push('/concert/' + concert.id)"
        >
          <template #description>
            <div>
              {{ concert.location.name }}
            </div>

            <div>
              {{ band.name }} - {{ band.events[0].name }}
            </div>
          </template>
        </concert-list-item>
      </v-col>
    </v-row>
  </div>
</template>