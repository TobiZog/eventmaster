<script setup lang="ts">
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import { ref } from 'vue';
import heroImage from '@/components/pageParts/heroImage.vue';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { LocationDetailsApiModel } from '@/data/models/locations/locationDetailsApiModel';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import { useLocationStore } from '@/stores/location.store';

const router = useRouter()
const locationStore = useLocationStore()

locationStore.getLocationByName(String(router.currentRoute.value.params.name))
</script>

<template>
  <hero-image
    :title="locationStore.location.name"
    :image="locationStore.location.imageIndoor"
    :description="locationStore.location.address + locationStore.location.city.name"
    :loading="locationStore.fetchInProgress"
    :logo="locationStore.location.imageOutdoor"
  >
    <template #description>
      <p class="text-h6">{{ locationStore.location.address }}</p>
      <p class="text-h6">{{ locationStore.location.city.name }}</p>
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

        <v-row v-if="locationStore.fetchInProgress" v-for="i in 3">
          <v-col class="text-center">
            <card-view-horizontal :loading="true" />
          </v-col>
        </v-row>

        <v-row
          v-else-if="locationStore.location.concerts.length > 0"
          v-for="concert of locationStore.location.concerts"
        >
          <v-col>
            <concert-list-item
              :concert="concert"
              :band="concert.band"
              :location="locationStore.location"
              :title="concert.name"
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

        <div v-if="locationStore.fetchInProgress">
          <v-col class="text-center">
            <v-progress-circular indeterminate :size="128" :width="12" color="primary" />
          </v-col>
        </div>

        <v-row v-else>
          <v-col>
            <seat-plan-map
              :location="locationStore.location"
              :seat-groups="locationStore.location.seatGroups"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-spacer/>
    </v-row>
  </v-container>
</template>