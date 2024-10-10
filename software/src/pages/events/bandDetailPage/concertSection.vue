<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { useRouter } from 'vue-router';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';

const router = useRouter()
const feedbackStore = useFeedbackStore()

defineProps({
  band: {
    type: BandModel,
    required: true
  }
})
</script>

<template>
  <v-row v-if="feedbackStore.fetchDataFromServerInProgress" v-for="i in 3">
    <v-col>
      <concert-list-item :loading="true" />
    </v-col>
  </v-row>

  <v-row v-else v-for="concert of band.events[0].concerts">
    <v-col>
      <concert-list-item
        :date="concert.date"
        :price="concert.price"
        :title="concert.location.city.name"
        :description="concert.location.name"
        :link="concert.inStock > 0"
        :in-stock="concert.inStock"
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
</template>