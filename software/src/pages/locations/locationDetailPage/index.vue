<script setup lang="ts">
import { LocationModel } from '@/data/models/locations/locationModel';
import { useConcertStore } from '@/data/stores/concertStore';
import { useRouter } from 'vue-router';
import cardWithLeftImage from '@/components/cardWithLeftImage.vue';
import sectionDivider from '@/components/sectionDivider.vue';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';

const router = useRouter()
const concertStore = useConcertStore()

const location: LocationModel = concertStore.locations.find(location =>
  location.name.replaceAll(' ', '-').toLowerCase() == router.currentRoute.value.params.locationName
)
</script>

<template>
  <div class="position-relative top-0 left-0">
    <v-img
      :src="'http://localhost:3000/static/locations/' + location.image"
      height="500"
      gradient="to top, rgba(0, 0, 0, .9), rgba(255, 255, 255, 0.1)"
      cover
    >
      <div class="position-absolute bottom-0 pa-5">
        <v-row>
          <v-col>
            <p class="text-h3">{{ location.name }}</p>
            <p class="text-h6">{{ location.address }}</p>
            <p class="text-h6">{{ location.city.name }}</p>
          </v-col>
        </v-row>
      </div>
    </v-img>
  </div>

  <v-container>
    <v-row>
      <v-spacer/>

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider title="Konzerte" />
          </v-col>
        </v-row>

        <v-row
          v-if="location.concerts.length > 0"
          v-for="concert of location.concerts"
        >
          <v-col>
            <card-with-left-image
              :title="concert.tour.bandName + ' - ' +  concert.tour.name"
              :image="'http://localhost:3000/static/tours/' + concert.tour.image"
              @click="router.push('/bands/' + concert.tour.bandName.replaceAll(' ', '-').toLowerCase())"
            >
              <div class="text-h6">
                {{ dateStringToHumanReadableString(concert.date) }}
              </div>
              <!-- <div>{{ concert.length }} {{ $t('concert', concert.tour.concerts.length) }}</div> -->

              <template #append>
                <div>
                  <v-icon
                    icon="mdi-ticket"
                    color="secondary"
                    size="x-large"
                  />
                </div>
                {{ $t('from') }} {{ concert.price.toFixed(2) }} €
              </template>
            </card-with-left-image>
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

        <v-row>
          <v-col>
            <seat-plan-map
              :seat-groups="location.seatGroups"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-spacer/>
    </v-row>
  </v-container>
</template>