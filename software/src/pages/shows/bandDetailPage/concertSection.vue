<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithLeftImage from '@/components/cardWithLeftImage.vue';
import outlinedButton from '@/components/outlinedButton.vue';

defineProps({
  band: {
    type: BandModel,
    required: true
  }
})
</script>

<template>
  <v-row>
    <v-col>
      <section-divider title="Konzerte" />
    </v-col>
  </v-row>

  <v-row v-for="concert of band.tours[0].concerts">
    <v-col>
      <card-with-left-image
        :title="dateStringToHumanReadableString(concert.date)"
        :image="'http://localhost:3000/static/locations/' + concert.location.image"
        :link="false"
      >
        <div>
          {{ concert.location.name }}
        </div>

        <div>
          {{ concert.location.address }}
        </div>

        <div>
          {{ concert.location.city.name }}
        </div>

        <template #append>
          <div class="pb-3">
            {{ concert.price.toFixed(2) }} €
          </div>

          <div>
            <outlined-button
              prepend-icon="mdi-basket-plus"
            >
                Hinzufügen
            </outlined-button>
          </div>            
        </template>
      </card-with-left-image>
    </v-col>
  </v-row>
</template>