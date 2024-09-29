<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { dateStringToHumanReadableString } from '@/scripts/dateTimeScripts';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithLeftImage from '@/components/cardWithLeftImage.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

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
        <v-row>
          <v-col cols="auto" class="d-flex justify-center align-center px-0">
            <v-btn
              icon="mdi-map"
              variant="text"
              size="x-large"
              @click="router.push('/locations/' + concert.location.name.replaceAll(' ', '-').toLowerCase())"
            />
          </v-col>

          <v-col>
            <div class="text-h6">
              {{ concert.location.name }}
            </div>

            <div class="text-h6">
              {{ concert.location.city.name }}
            </div>
          </v-col>
        </v-row>

        <template #append>
          <div class="pb-3">
            {{ concert.price.toFixed(2) }} €
          </div>

          <div>
            <outlined-button
              v-if="concert.inStock > 0"
              prepend-icon="mdi-basket-plus"
            >
              {{ $t('add') }}
            </outlined-button>

            <outlined-button v-else
              color="red"
              disabled
            >
              {{ $t('soldOut') }}
            </outlined-button>
          </div>
        </template>
      </card-with-left-image>
    </v-col>
  </v-row>
</template>