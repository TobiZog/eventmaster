<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import seatGroupTable from './seatGroupTable.vue';

defineProps({
  seatGroup: SeatGroupModel,
  backgroundColor: String
})
</script>

<template>
  <v-sheet
    v-if="seatGroup != undefined && seatGroup.standingArea"
    class="pa-5"
    min-height="200"
    height="100%"
    :color="backgroundColor"
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
        {{ seatGroup.capacity }} Stehplätze
      </v-col>
    </v-row>
  </v-sheet>

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
        <seat-group-table :seat-rows="seatGroup.seatRows" />
      </v-col>
    </v-row>
  </v-sheet>
</template>