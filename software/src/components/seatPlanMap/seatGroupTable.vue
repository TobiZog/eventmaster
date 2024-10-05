<script setup lang="ts">
import { ConcertModel } from '@/data/models/acts/concertModel';
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import { SeatModel } from '@/data/models/locations/seatModel';
import { SeatRowModel } from '@/data/models/locations/seatRowModel';
import { SelectedSeatModel } from '@/data/models/ordering/selectedSeatModel';
import { useBasketStore } from '@/data/stores/basketStore';

const basketStore = useBasketStore()

let props = defineProps({
  seatRows: Array<SeatRowModel>,
  concert: ConcertModel,
  seatGroup: SeatGroupModel
})

function handleSeatClick(clickedSeat: SeatModel, seatRow: SeatRowModel) {
  let storeSeat = basketStore.selectedSeats.find(seat => 
    seat.seat.id == clickedSeat.id
  )

  if (storeSeat == undefined) {
    clickedSeat.state = 2
    basketStore.selectedSeats.push(new SelectedSeatModel(clickedSeat, seatRow.row, props.seatGroup.name, props.concert))
  } else {
    clickedSeat.state = 0
    basketStore.selectedSeats = basketStore.selectedSeats.filter(seat => 
      seat.seat.id != clickedSeat.id
    )
  }
}

function seatColor(state: number) {
  switch (state) {
    case 0: return "grey"
    case 1: return "red"
    case 2: return "orange"
  }
}
</script>

<template>
  <table>
    <tbody>
      <tr v-for="seatRow in seatRows">
        <td v-for="seat in seatRow.seats">
          <v-btn
            variant="text"
            icon="mdi-circle"
            :color="seatColor(seat.state)"
            :disabled="seat.state == 1"
            density="compact"
            @click="handleSeatClick(seat, seatRow)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>