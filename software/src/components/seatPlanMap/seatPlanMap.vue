<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import seatGroupSheet from './seatGroupSheet.vue';
import { ConcertModel } from '@/data/models/acts/concertModel';
import { LocationApiModel } from '@/data/models/locations/locationApiModel';

let props = defineProps({
  location: LocationApiModel,
  concert: {
    type: ConcertModel,
    default: new ConcertModel()
  }
})

function findSeatCategory(name: string): SeatGroupModel {
  return props.location.seatGroups.find(category =>
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
      <v-col cols="4">
        <seat-group-sheet
          :seat-group="seatGroupC"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <v-col cols="4">
        <seat-group-sheet
          :seat-group="seatGroupB"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <v-col cols="4">
        <seat-group-sheet
          :seat-group="seatGroupI"
          :concert="concert"
          background-color="grey"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <seat-group-sheet
          v-if="location.layout != 1"
          :seat-group="seatGroupD"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <v-col :cols="location.layout == 1 ? 10 : 4">
        <seat-group-sheet
          :seat-group="seatGroupA"
          :concert="concert"
          background-color="grey"
          :withStage="location.layout == 3"
        />
      </v-col>

      <v-col v-if="location.layout != 3">
        <v-sheet
          color="grey-darken-3"
          height="100%"
          width="50"
          class="px-5 py-2 d-flex justify-center align-center"
        >
          {{ $t('stage') }}
        </v-sheet>
      </v-col>

      <v-col v-else cols="4">
        <seat-group-sheet
          :seat-group="seatGroupH"
          :concert="concert"
          background-color="grey"
        />
      </v-col>
    </v-row>


    <v-row v-if="location.layout != 1">
      <v-col cols="4">
        <seat-group-sheet
          :seat-group="seatGroupE"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <v-col cols="4">
        <seat-group-sheet
          :seat-group="seatGroupF"
          :concert="concert"
          background-color="grey"
        />
      </v-col>

      <v-col cols="4">
        <seat-group-sheet
          :seat-group="seatGroupG"
          :concert="concert"
          background-color="grey"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>