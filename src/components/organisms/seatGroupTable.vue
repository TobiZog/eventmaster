<script setup lang="ts">
import { ConcertModel } from '@/data/models/acts/concertModel';
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import { SeatModel } from '@/data/models/locations/seatModel';
import { SeatRowModel } from '@/data/models/locations/seatRowModel';
import { SelectedSeatModel } from '@/data/models/ordering/selectedSeatModel';
import { getSeatColor } from '@/scripts/colorScripts';
import { useBasketStore } from '@/stores/basket.store';

const basketStore = useBasketStore()

let props = defineProps({
  seatRows: Array<SeatRowModel>,
  concert: ConcertModel,
  seatGroup: SeatGroupModel,

  /** Seat is selectable (false) or not (true) */
  disabled: Boolean,

  /**
   * Structure of the seat placment
   * 
   * 0 = Normal rectangular form, rows from top to bottom (default)
   * 1 = Normal rectangular form but rows and cols are switched
   * 2 = Pyramid structure from right bottom corner
   * 3 = Pyramid structure from right top corner
   * 4 = Pyramid structure from left top corner
   * 5 = Pyramid structure from left bottom corner
   */
  structure: {
    type: Number,
    default: 0
  }
})

/**
 * Moves seat to store and changes the state
 * 
 * @param clickedSeat Model which is clicked
 * @param seatRow Row of the seat
 */
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
</script>

<template>
  <table v-if="structure == 0">
    <tbody>
      <tr v-for="seatRow in seatRows">
        <td v-for="seat in seatRow.seats">
          <v-btn
            variant="text"
            icon="mdi-circle"
            :color="getSeatColor(seatGroup.surcharge, seat.state)"
            :disabled="seat.state == 1"
            density="compact"
            @click="() => !disabled ? handleSeatClick(seat, seatRow) : {}"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else-if="structure == 1">
    <tbody>
      <tr v-for="i in seatRows[0].seats.length">
        <td v-for="row in seatRows">
          <v-btn
            variant="text"
            icon="mdi-circle"
            :color="getSeatColor(seatGroup.surcharge, row.seats[i - 1].state)"
            :disabled="row.seats[i - 1].state == 1"
            density="compact"
            @click="() => !disabled ? handleSeatClick(row.seats[i - 1], row) : {}"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else-if="structure == 2">
    <tbody>
      <tr v-for="i in seatRows.length">
        <td v-for="j in seatRows[i - 1].seats.length">
          <v-btn
            v-if="seatRows[i - 1].seats.length - i < j"
            variant="text"
            icon="mdi-circle"
            :color="getSeatColor(seatGroup.surcharge, seatRows[i - 1].seats[j - 1].state)"
            :disabled="seatRows[i - 1].seats[j - 1].state == 1"
            density="compact"
            @click="() => !disabled ? handleSeatClick(seatRows[i - 1].seats[j - 1], seatRows[i - 1]) : {}"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else-if="structure == 3">
    <tbody>
      <tr v-for="i in seatRows.length">
        <td v-for="j in seatRows[i - 1].seats.length">
          <v-btn
            v-if="j >= i"
            variant="text"
            icon="mdi-circle"
            :color="getSeatColor(seatGroup.surcharge, seatRows[i - 1].seats[j - 1].state)"
            :disabled="seatRows[i - 1].seats[j - 1].state == 1"
            density="compact"
            @click="() => !disabled ? handleSeatClick(seatRows[i - 1].seats[j - 1], seatRows[i - 1]) : {}"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else-if="structure == 4">
    <tbody>
      <tr v-for="i in seatRows.length">
        <td v-for="j in seatRows[i - 1].seats.length">
          <v-btn
            v-if="seatRows[i - 1].seats.length - i >= j - 1"
            variant="text"
            icon="mdi-circle"
            :color="getSeatColor(seatGroup.surcharge, seatRows[i - 1].seats[j - 1].state)"
            :disabled="seatRows[i - 1].seats[j - 1].state == 1"
            density="compact"
            @click="() => !disabled ? handleSeatClick(seatRows[i - 1].seats[j - 1], seatRows[i - 1]) : {}"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else-if="structure == 5">
    <tbody>
      <tr v-for="i in seatRows.length">
        <td v-for="j in seatRows[i - 1].seats.length">
          <v-btn
            v-if="j <= i"
            variant="text"
            icon="mdi-circle"
            :color="getSeatColor(seatGroup.surcharge, seatRows[i - 1].seats[j - 1].state)"
            :disabled="seatRows[i - 1].seats[j - 1].state == 1"
            density="compact"
            @click="() => !disabled ? handleSeatClick(seatRows[i - 1].seats[j - 1], seatRows[i - 1]) : {}"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>