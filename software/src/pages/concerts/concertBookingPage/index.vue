<script setup lang="ts">
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useBasketStore } from '@/stores/basketStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useConcertStore } from '@/stores/concertStore';

const router = useRouter()
const basketStore = useBasketStore()
const concertStore = useConcertStore()

concertStore.getConcert(Number(router.currentRoute.value.params.id))
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <section-divider :title="$t('selectedConcert')"  />
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
            >
              <template #description>
                <p>{{ concertStore.concert.location.name }}</p>
                <!-- todo <p>{{ concertModel.event.band.name }} - {{ concertModel.event.name }}</p> -->
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
          <v-col class="text-center" v-if="concertStore.fetchInProgress">
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
              :concert="concertStore.concert"
              :seat-groups="concertStore.concert.location.seatGroups"
              :location="concertStore.concert.location"
            />
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
          <outlined-button todo
            prepend-icon="mdi-basket-plus"
            @click="basketStore.moveSeatSelectionsToBasket(concertStore.concert, concertStore.concert.band); 
              router.push('/basket')"
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