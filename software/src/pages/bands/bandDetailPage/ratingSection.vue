<script setup lang="ts">
import { BandApiModel } from '@/data/models/acts/bandApiModel';
import { RatingModel } from '@/data/models/acts/ratingModel';
import { calcRating, calcRatingValues } from '@/scripts/concertScripts';

defineProps({
  ratings: {
    type: Array<RatingModel>,
    required: true
  }
})
</script>

<template>
  <v-row>
    <v-col>
      <div class="d-flex align-center justify-center flex-column" style="height: 100%;">
        <div class="text-h2 mt-5">
          {{ calcRating(ratings).toFixed(1) }}
          <span class="text-h6 ml-n3">/5</span>
        </div>
    
        <v-rating
          :model-value="calcRating(ratings)"
          color="yellow-darken-3"
          half-increments
          size="x-large"
          readonly
        />

        <div class="px-3 text-h6">{{ ratings.length }} {{ $t('rating', ratings.length) }}</div>
      </div>
    </v-col>

    <v-col>
      <v-list>
        <v-list-item v-for="ratingValue in calcRatingValues(ratings)">
          <template v-slot:prepend>
            <span>{{ ratingValue.value }}</span>
            <v-icon class="ml-3 mr-n3" icon="mdi-star" />
          </template>

          <v-progress-linear
            :model-value="(ratingValue.count / ratings.length) * 100"
            height="20"
            color="yellow-darken-3"
            rounded
          />

          <template v-slot:append>
            <span class="d-flex justify-end" style="width: 25px;"> {{ ratingValue.count }} </span>
          </template>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>