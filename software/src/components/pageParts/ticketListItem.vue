<script setup lang="ts">
import { ConcertModel } from '@/data/models/acts/concertModel';
import cardWithLeftImage from '../basics/cardViewHorizontal.vue';
import { dateStringToHumanReadableString, dateToHumanReadableString } from '@/scripts/dateTimeScripts';

defineProps({
  concert: ConcertModel,

  /** Image to print on the left side */
  image: String,

  /** Event series name */
  eventName: String,

  seatGroup: String,

  seatRow: Number,

  seat: Number,

  standingArea: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <card-with-left-image
    :image="'http://localhost:3000/static/' + image"
    :link="false"
    color-header="primary"
    :title="concert.event.band.name + ' - ' + concert.event.name"
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
        {{ concert.location.name }}, {{ concert.location.city.name }}
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
                {{ seat }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </template>
  </card-with-left-image>
</template>