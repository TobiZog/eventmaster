<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import seatGroupSheet from './seatGroupSheet.vue';

let props = defineProps({
  seatGroups: Array<SeatGroupModel>
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
</script>

<template>
  <v-row>
    <v-col></v-col>

    <v-col>
      <v-sheet
        color="grey-darken-3"
        height="50"
        class="px-5 py-2 d-flex justify-center align-center"
      >
        {{ $t('stage') }}
      </v-sheet>
    </v-col>

    <v-col></v-col>
  </v-row>

  <v-row>
    <v-col>
      <seat-group-sheet :seat-group="seatGroupC" background-color="cyan-darken-2" />
    </v-col>

    <v-col>
      <seat-group-sheet :seat-group="seatGroupA" background-color="grey" />
    </v-col>

    <v-col>
      <seat-group-sheet :seat-group="seatGroupB" background-color="cyan-darken-2" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <seat-group-sheet :seat-group="seatGroupF" background-color="deep-purple-darken-2" />
    </v-col>

    <v-col>
      <seat-group-sheet :seat-group="seatGroupD" background-color="indigo-darken-2" />
    </v-col>

    <v-col>
      <seat-group-sheet :seat-group="seatGroupE" background-color="deep-purple-darken-2" />
    </v-col>
  </v-row>
</template>