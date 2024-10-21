<script setup lang="ts">
import { ConcertModel } from '@/data/models/acts/concertModel';
import cardWithLeftImage from '../basics/cardViewHorizontal.vue';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import { BandModel } from '@/data/models/acts/bandModel';
import { LocationModel } from '@/data/models/locations/locationModel';
import { CityModel } from '@/data/models/locations/cityModel';

defineProps({
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

  city: {
    type: CityModel,
    required: true
  },

  /** Image to print on the left side */
  image: String,

  seatGroup: String,

  seatRow: Number,

  seatNr: Number,

  standingArea: Boolean
})
</script>

<template>
  <card-with-left-image
    :image="'http://localhost:3000/static/' + image"
    :link="false"
    color-header="primary"
    :title="band.name + ' - ' + concert.name"
  >
    <template #content>
      <div class="text-caption">
        {{ $t('date') }}
      </div>

      <div>
        {{ dateStringToHumanReadableString(concert.date) }}
      </div>

      <div class="text-caption">
        {{ $t('location') }}
      </div>

      <div>
        {{ location.name }}, {{ city.name }}
      </div>

      <div class="text-caption">
        {{ $t('price') }}
      </div>

      <div>
        {{ concert.price }} €
      </div>
    </template>

    <template #append>
      <v-row>
        <v-col>
          <v-card variant="outlined" class="my-1" >
            <div class="text-caption">
              {{ $t('seatGroup') }}
            </div>

            <div>
              {{ seatGroup }}
            </div>

            <div v-if="standingArea" class="text-caption">
              {{ $t('standingArea') }}
            </div>
          </v-card>

          <div v-if="!standingArea">
            <v-card variant="outlined" class="my-1" >
              <div class="text-caption">
                {{ $t('seatRow') }}
              </div>

              <div>
                {{ seatRow }}
              </div>
            </v-card>

            <v-card variant="outlined" class="my-1" >
              <div class="text-caption">
                {{ $t('seat') }}
              </div>

              <div>
                {{ seatNr }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </template>
  </card-with-left-image>
</template>