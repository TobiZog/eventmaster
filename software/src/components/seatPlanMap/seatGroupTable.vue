<script setup lang="ts">
import { SeatRowModel } from '@/data/models/locations/seatRowModel';

defineProps({
  seatRows: Array<SeatRowModel>,
})
</script>

<template>
  <table>
    <tbody>
      <tr v-for="seatRow in seatRows">
        <td v-for="seats in seatRow.seats">
          <v-btn
            variant="text"
            icon="mdi-seat"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>