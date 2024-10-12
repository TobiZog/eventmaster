<script setup lang="ts">
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import { getLocation } from '@/data/api/locationApi';
import { ref } from 'vue';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import heroImage from '@/components/pageParts/heroImage.vue';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { LocationDetailsApiModel } from '@/data/models/locations/locationDetailsApiModel';

const router = useRouter()
const feedbackStore = useFeedbackStore()
const location = ref<LocationDetailsApiModel>(new LocationDetailsApiModel())

feedbackStore.fetchDataFromServerInProgress = true

getLocation(String(router.currentRoute.value.params.name))
  .then(result => {
    location.value = result.data
    feedbackStore.fetchDataFromServerInProgress = false
  })
</script>

<template>
  <hero-image
    :title="location.name"
    :image="location.imageIndoor"
    :description="location.address + location.city.name"
    :loading="feedbackStore.fetchDataFromServerInProgress"
    :logo="location.imageOutdoor"
  >
    <template #description>
      <p class="text-h6">{{ location.address }}</p>
      <p class="text-h6">{{ location.city.name }}</p>
    </template>
  </hero-image>

  <v-container>
    <v-row>
      <v-spacer/>

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider :title="$t('concert', 2)" />
          </v-col>
        </v-row>

        <v-row v-if="feedbackStore.fetchDataFromServerInProgress" v-for="i in 3">
          <v-col class="text-center">
            Loading...
            <!-- todo <concert-list-item :loading="feedbackStore.fetchDataFromServerInProgress" /> -->
          </v-col>
        </v-row>

        <v-row
          v-else-if="location.concerts.length > 0"
          v-for="concert of location.concerts"
        >
          <v-col>
            <concert-list-item
              :concert="concert"
              :title="concert.name"
              :onClick="() => router.push('/bands/' + concert.band.name.replaceAll(' ', '-').toLowerCase())"
            >
              <template #description>
                {{ concert.band.name }}
              </template>
            </concert-list-item>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col>
            <v-empty-state
              icon="mdi-magnify"
              :title="$t('noEventsFound')"
            />
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <section-divider :title="$t('seatPlan')" />
          </v-col>
        </v-row>

        <div v-if="feedbackStore.fetchDataFromServerInProgress">
          <v-col class="text-center">
            <v-progress-circular indeterminate :size="128" :width="12" color="primary" />
          </v-col>
        </div>

        <v-row v-else>
          <v-col>
            <seat-plan-map
              :location="location"
              :seat-groups="location.seatGroups"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-spacer/>
    </v-row>
  </v-container>
</template>