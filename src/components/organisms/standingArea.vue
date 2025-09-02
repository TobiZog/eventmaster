<script setup lang="ts">
import { ConcertModel } from '@/data/models/acts/concertModel';
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import { SelectedSeatModel } from '@/data/models/ordering/selectedSeatModel';
import { useBasketStore } from '@/stores/basket.store';

const basketStore = useBasketStore()

let props = defineProps({
  seatGroup: SeatGroupModel,
  concert: ConcertModel,
  backgroundColor: String,
  withStage: Boolean,
  disabled: {
    type: Boolean,
    default: false
  }
})

function handleSeatClick() {
  let freeSeat = props.seatGroup.seatRows[0].seats.find(seat =>
    seat.state == 0
  )

  freeSeat.state = 2

  basketStore.selectedSeats.push(new SelectedSeatModel(freeSeat, 0, props.seatGroup.name, props.concert))
}
</script>

<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props}">
      <v-sheet
        v-bind="props"
        class="pa-5"
        min-height="200"
        height="100%"
        border
        :color="isHovering ? 'orange' : ''"
        @click="() => { !disabled ? handleSeatClick() : {} }"
      >
        <v-row class="d-flex justify-center align-center h-100">
          <v-col>
            <v-row>
              <v-spacer />

              <v-col class="text-center" cols="6">
                <v-icon
                  v-if="!withStage"
                  icon="mdi-account-group"
                  size="x-large"
                />

                <v-sheet
                  v-else
                  color="grey-darken-3"
                  height="100"
                  width="100%"
                  
                >
                  {{ $t('location.stage') }}
                </v-sheet>
              </v-col>

              <v-spacer />
            </v-row>

            <v-row>
              <v-col class="text-center text-h6">
                {{ seatGroup.occupied != undefined
                  ? seatGroup.capacity - seatGroup.occupied 
                  : seatGroup.capacity
                }}
                {{ $t('location.seat.standingPlace', 2) }}
              </v-col>
            </v-row>

          </v-col>
        </v-row>
      </v-sheet>
    </template>
  </v-hover>
</template>