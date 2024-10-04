<script setup lang="ts">
import seatPlanMap from '@/components/seatPlanMap/seatPlanMap.vue';
import { ref } from 'vue';
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import { getConcert } from '@/data/api/concertApi';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { useRouter } from 'vue-router';
import sectionDivider from '@/components/sectionDivider.vue';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useBasketStore } from '@/data/stores/basketStore';

const router = useRouter()
const seatGroups = ref<Array<SeatGroupModel>>()
const feedbackStore = useFeedbackStore()
const basketStore = useBasketStore()

feedbackStore.fetchDataFromServerInProgress = true

getConcert(Number(router.currentRoute.value.params.id))
  .then(result => {
    seatGroups.value = result.data.location.seatGroups
    feedbackStore.fetchDataFromServerInProgress = false
  })

// function findRow(seatRowId: number) {
//   for (let seatGroup of seatGroups.value) {
//     for(let seatRow of seatGroup.seatRows) {
//       let result = seatRow.seats.find()
//     }
//   }
// }
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
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
            <seat-plan-map :seat-groups="seatGroups" />
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
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>