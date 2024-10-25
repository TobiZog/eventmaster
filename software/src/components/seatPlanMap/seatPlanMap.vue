<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import seatGroupSheet from './seatGroupSheet.vue';
import { ConcertModel } from '@/data/models/acts/concertModel';
import { LocationModel } from '@/data/models/locations/locationModel';

let props = defineProps({
  location: LocationModel,
  seatGroups: {
    type: Array<SeatGroupModel>,
    required: true
  },
  concert: {
    type: ConcertModel,
    default: new ConcertModel()
  }
})

function findSeatCategory(name: string): SeatGroupModel {
  return props.seatGroups.find(category =>
    category.name == name
  )
}

const seatGroupA = findSeatCategory("A")
const seatGroupB = findSeatCategory("B")
const seatGroupC = findSeatCategory("C")
const seatGroupD = findSeatCategory("D")
const seatGroupE = findSeatCategory("E")
const seatGroupF = findSeatCategory("F")
const seatGroupG = findSeatCategory("G")
const seatGroupH = findSeatCategory("H")
const seatGroupI = findSeatCategory("I")
</script>

<template>
  <v-sheet border class="pa-5">
    <v-row>
      <!-- Seat Group C -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupC"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <!-- Seat Group B -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupB"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <!-- Seat Group I -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupI"
          :concert="concert"
          background-color="grey"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- Seat Group D -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          v-if="location.layout != 1"
          :seat-group="seatGroupD"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <!-- Seat Group A -->
      <v-col :cols="location.layout == 1 ? 10 : 4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupA"
          :concert="concert"
          background-color="grey"
          :withStage="location.layout == 3"
        />
      </v-col>

      <!-- Seat Group H or stage -->
      <v-col v-if="location.layout != 3">
        <v-sheet
          color="grey-darken-3"
          height="100%"
          width="50"
          class="px-5 py-2 d-flex justify-center align-center"
        >
          {{ $t('location.stage') }}
        </v-sheet>
      </v-col>

      <v-col v-else cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupH"
          :concert="concert"
          background-color="grey"
        />
      </v-col>
    </v-row>


    <v-row v-if="location.layout != 1">
      <!-- Seat Group E -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupE"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <!-- Seat Group F -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupF"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <!-- Seat Group G -->
      <v-col cols="4" class="pa-0">
        <seat-group-sheet
          :seat-group="seatGroupG"
          :concert="concert"
          background-color="grey"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>