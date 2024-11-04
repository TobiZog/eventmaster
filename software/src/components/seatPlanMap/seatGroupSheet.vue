<script setup lang="ts">
import { SeatGroupModel } from '@/data/models/locations/seatGroupModel';
import seatGroupTable from './seatGroupTable.vue';
import standingArea from './standingArea.vue';
import { ConcertModel } from '@/data/models/acts/concertModel';

let props = defineProps({
  seatGroup: SeatGroupModel,
  concert: ConcertModel,
  withStage: Boolean,
  disabled: Boolean
})

function getCornerClass() {
  switch(props.seatGroup.name) {
    case 'C': return "rounded-ts-xl"
    case 'E': return "rounded-bs-xl"
    case 'G': return "rounded-be-xl"
    case 'I': return "rounded-te-xl"
  }
}

function getStructureNumber() {
  switch(props.seatGroup.name) {
    case 'A':
    case 'B':
    case 'F': return 0
    case 'D':
    case 'H': return 1
    case 'C': return 2
    case 'E': return 3
    case 'G': return 4
    case 'I': return 5
  }
}

function getNameLocation() {
  switch(props.seatGroup.name) {
    case 'B':
    case 'C':
    case 'I': return 0
    case 'E': 
    case 'F': 
    case 'G': return 1
    case 'D': return 2
    case 'H': return 3
  }
}
</script>

<template>
  <standing-area
    :seat-group="seatGroup"
    :concert="concert"
    :with-stage="withStage"
    v-if="seatGroup != undefined && seatGroup.standingArea"
    :disabled="disabled"
  />

  <v-sheet
    v-else-if="seatGroup != undefined"
    class="pa-2"
    :class="getCornerClass()"
    border
    style="height: 100%;"
  >
    <!-- Block name above seat icons -->
    <div v-if="getNameLocation() == 0">
      <v-row >
        <v-col class="text-h4 text-center font-weight-black">
          {{ seatGroup.name }}
        </v-col>
      </v-row>

      <v-row>
        <v-spacer v-if="seatGroup.name == 'B' || seatGroup.name == 'C'" />

        <v-col cols="auto">
          <seat-group-table
            :seat-rows="seatGroup.seatRows"
            :seat-group="seatGroup"
            :concert="concert"
            :structure="getStructureNumber()"
            :disabled="disabled"
          />
        </v-col>

        <v-spacer v-if="seatGroup.name == 'B' || seatGroup.name == 'I'" />
      </v-row>
    </div>

    <!-- Block name under seat icons -->
    <div v-else-if="getNameLocation() == 1">
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-spacer v-if="seatGroup.name == 'E'" />

          <seat-group-table
            :seat-rows="seatGroup.seatRows"
            :seat-group="seatGroup"
            :concert="concert"
            :structure="getStructureNumber()"
            :disabled="disabled"
          />
        </v-col>

        <v-spacer v-if="seatGroup.name == 'G'" />
      </v-row>

      <v-row >
        <v-col class="text-h4 text-center font-weight-black">
          {{ seatGroup.name }}
        </v-col>
      </v-row>
    </div>

    <!-- Block name left to seat icons -->
    <div v-else-if="getNameLocation() == 2">
      <v-row>
        <v-col class="text-h4 font-weight-black d-flex justify-center align-center">
          {{ seatGroup.name }}
        </v-col>

        <v-col class="d-flex justify-center align-center">
          <seat-group-table
            :seat-rows="seatGroup.seatRows"
            :seat-group="seatGroup"
            :concert="concert"
            :structure="getStructureNumber()"
            :disabled="disabled"
          />
        </v-col>
      </v-row>
    </div>

    <!-- Block name right to seat icons -->
    <div v-else-if="getNameLocation() == 3">
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <seat-group-table
            :seat-rows="seatGroup.seatRows"
            :seat-group="seatGroup"
            :concert="concert"
            :structure="getStructureNumber()"
            :disabled="disabled"
          />
        </v-col>

        <v-col class="text-h4 font-weight-black d-flex justify-center align-center">
          {{ seatGroup.name }}
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>