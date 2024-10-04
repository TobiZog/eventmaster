<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import { SeatModel } from '@/data/models/locations/seatModel';
import { SeatRowModel } from '@/data/models/locations/seatRowModel';
import { SelectedSeatModel } from '@/data/models/ordering/selectedSeatModel';
import { useBasketStore } from '@/data/stores/basketStore';

const basketStore = useBasketStore()

let props = defineProps({
  seatGroup: SeatGroupModel,
  backgroundColor: String
})

function handleSeatClick() {
  let freeSeat = props.seatGroup.seatRows[0].seats.find(seat =>
    seat.state == 0
  )

  freeSeat.state = 2

  basketStore.selectedSeats.push(new SelectedSeatModel(freeSeat, 0, props.seatGroup.name))
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
        :color="isHovering ? 'red' : backgroundColor"
        @click="handleSeatClick"
      >
        <v-row >
          <v-col class="text-h4 text-center font-weight-black">
            {{ seatGroup.name }}
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-center">
            <v-icon
              icon="mdi-account-group"
              size="x-large"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-center text-h6">
            {{ seatGroup.capacity - seatGroup.occupied }} Stehplätze
          </v-col>
        </v-row>
      </v-sheet>
    </template>
  </v-hover>
</template>