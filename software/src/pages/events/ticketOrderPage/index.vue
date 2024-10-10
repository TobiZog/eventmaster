<script setup lang="ts">
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import { ref } from 'vue';
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import { getConcert } from '@/data/api/concertApi';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useBasketStore } from '@/data/stores/basketStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import { ConcertModel } from '@/data/models/acts/concertModel';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import outlinedButton from '@/components/basics/outlinedButton.vue';

const router = useRouter()
const seatGroups = ref<Array<SeatGroupModel>>()
const concertModel = ref<ConcertModel>(new ConcertModel())
const feedbackStore = useFeedbackStore()
const basketStore = useBasketStore()

feedbackStore.fetchDataFromServerInProgress = true

getConcert(Number(router.currentRoute.value.params.id))
  .then(result => {
    seatGroups.value = result.data.location.seatGroups
    concertModel.value = result.data
    feedbackStore.fetchDataFromServerInProgress = false
  })
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <concert-list-item
              :loading="feedbackStore.fetchDataFromServerInProgress"
              :link="false"
              :title="concertModel.event.band.name + ' - ' + concertModel.event.name"
              :image="concertModel.location.imageOutdoor"
            >
              <template #description>
                <p>{{ dateStringToHumanReadableString(concertModel.date) }}</p>
                <p>{{ concertModel.location.name }}</p>
                <p>{{ concertModel.location.city.name }}</p>
              </template>
            </concert-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <section-divider :title="$t('seatSelection')" />
          </v-col>
        </v-row>

        <v-row >
          <v-col class="text-center" v-if="feedbackStore.fetchDataFromServerInProgress">
            <v-progress-circular
              size="x-large"
              width="10"
              color="primary"
              indeterminate
            />

            <div class="pt-5 text-h3">
              {{ $t('loading') }}...
            </div>
          </v-col>

          <v-col v-else>
            <seat-plan-map
              :concert="concertModel" :seat-groups="seatGroups" :location="concertModel.location" />
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <section-divider :title="$t('orderSummary')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-list >
              <v-list-item v-for="seat in basketStore.selectedSeats" >
                Group: {{ seat.seatGroupName }} - Row: {{ seat.seatRow }} - Seat: {{ seat.seat.seatNr }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row class="pb-5">
          <outlined-button
            prepend-icon="mdi-basket-plus"
            @click="basketStore.moveSeatSelectionsToBasket(); router.push('/basket')"
            :disabled="basketStore.selectedSeats.length == 0"
            block
          >
            {{ $t('addToBasket') }}
          </outlined-button>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>