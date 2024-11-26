<script setup lang="ts">
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useBasketStore } from '@/stores/basket.store';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useConcertStore } from '@/stores/concert.store';
import ticketListItem from '@/components/pageParts/ticketListItem.vue';
import circularProgressIndeterminate from '@/components/basics/circularProgressIndeterminate.vue';
import { onMounted, watch } from 'vue';

const router = useRouter()
const basketStore = useBasketStore()
const concertStore = useConcertStore()

onMounted(async () => {
  concertStore.getConcert(
    String(router.currentRoute.value.params.locationUrl), 
    String(router.currentRoute.value.params.date)
  )
})

watch(() => router.currentRoute.value.params.locationUrl, () => {
  concertStore.getConcert(
    String(router.currentRoute.value.params.locationUrl), 
    String(router.currentRoute.value.params.date)
  )
})

watch(() => router.currentRoute.value.params.date, () => {
  concertStore.getConcert(
    String(router.currentRoute.value.params.locationUrl), 
    String(router.currentRoute.value.params.date)
  )
})
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider :title="$t('concert.selectedConcert')"  />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <concert-list-item
              :concert="concertStore.concert"
              :band="concertStore.concert.band"
              :location="concertStore.concert.location"
              :loading="concertStore.fetchInProgress"
              :link="false"
              :title="concertStore.concert.location.city.name"
              :show-button="false"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <section-divider :title="$t('location.seat.seatSelection')" />
          </v-col>
        </v-row>

        <v-row >
          <v-col class="text-center" v-if="concertStore.fetchInProgress">
            <circular-progress-indeterminate />

            <div class="pt-5 text-h3">
              {{ $t('misc.loading') }}...
            </div>
          </v-col>

          <v-col v-else>
            <seat-plan-map
              :concert="concertStore.concert"
              :seat-groups="concertStore.concert.location.seatGroups"
              :location="concertStore.concert.location"
            />
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <section-divider :title="$t('order.orderSummary')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-list style="background-color: transparent;">
              <v-list-item v-for="seat in basketStore.selectedSeats" >
                <ticket-list-item
                  :concert="concertStore.concert"
                  :band="concertStore.concert.band"
                  :location="concertStore.concert.location"
                  :city="concertStore.concert.location.city"
                  :image="concertStore.concert.image"
                  :seat-group="seat.seatGroupName"
                  :seat-nr="seat.seat.seatNr"
                  :seat-row="seat.seatRow"
                />
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row class="pb-5">
          <outlined-button todo
            prepend-icon="mdi-basket-plus"
            @click="basketStore.moveSeatSelectionsToBasket(concertStore.concert.band); 
              router.push('/basket')"
            :disabled="basketStore.selectedSeats.length == 0"
            block
          >
            {{ $t('basket.addToBasket') }}
          </outlined-button>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>