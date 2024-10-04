<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import seatGroupTable from './seatGroupTable.vue';
import { useBasketStore } from '@/data/stores/basketStore';
import standingArea from './standingArea.vue';

defineProps({
  seatGroup: SeatGroupModel,
  backgroundColor: String
})


</script>

<template>
  <standing-area
    :seat-group="seatGroup"
    :background-color="backgroundColor"
    v-if="seatGroup != undefined && seatGroup.standingArea"
  />

  <v-sheet
    v-else-if="seatGroup != undefined"
    class="pa-5"
    :color="backgroundColor"
  >
    <v-row >
      <v-col class="text-h4 text-center font-weight-black">
        {{ seatGroup.name }}
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center align-center">
        <seat-group-table :seat-rows="seatGroup.seatRows" :seat-group="seatGroup"/>
      </v-col>
    </v-row>
  </v-sheet>
</template>