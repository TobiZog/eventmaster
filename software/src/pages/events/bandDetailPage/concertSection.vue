<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
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
        :title="dateStringToHumanReadableString(concert.date)"
        :image="concert.location.imageOutdoor"
        @click="(concert.inStock > 0) && router.push('/concert/' + concert.id)"
        :link="concert.inStock > 0"
        :append-icon="concert.inStock == 0 ? 'mdi-minus-circle' : 'mdi-ticket'"
        :append-icon-color="concert.inStock > 0 ? 'green' : 'red'"
      >
        <template #description>
          <v-row>
            <v-col cols="auto" class="d-flex justify-center align-center px-0">
              <v-btn
                icon="mdi-map"
                variant="text"
                size="x-large"
                @click="router.push('/locations/' + concert.location.name.replaceAll(' ', '-').toLowerCase())"
              />
            </v-col>

            <v-col>
              <div class="text-h6">
                {{ concert.location.name }}
              </div>

              <div class="text-h6">
                {{ concert.location.city.name }}
              </div>
            </v-col>
          </v-row>
        </template>

        <template #append-text>
          <div class="pb-3" v-if="concert.inStock > 0">
            {{ concert.price.toFixed(2) }} €
          </div>

          <div v-else>
            {{ $t('soldOut') }}
          </div>
        </template>
      </concert-list-item>
    </v-col>
  </v-row>
</template>