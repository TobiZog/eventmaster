<script setup lang="ts">
import { useShowStore } from '@/data/stores/showStore';
import highlightCarousel from './highlightCarousel.vue';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithTopImage from '@/components/cardWithTopImage.vue';
import { RatingModel } from '@/data/models/ratingModel';

const showStore = useShowStore()

function calcRating(ratings: Array<RatingModel>) {
  let sum = 0

  for (let rating of ratings) {
    sum += rating.rating
  }

  return sum / ratings.length
}
</script>

<template>
  <highlight-carousel />

  <v-container>
    <v-row>
      <v-col>
        <section-divider title="Top Tours" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="i in 4" cols="3">
        <card-with-top-image
          :image="'bands/' + showStore.tours[i].band.images[0]"
          :title="showStore.tours[i].name"
        >
          {{ showStore.bands[i].name }} 
        </card-with-top-image>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <section-divider title="Top Bands" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="i in 4" cols="3">
        <card-with-top-image
          :image="'bands/' + showStore.bands[i - 1].logo"
          :title="showStore.bands[i - 1].name"
        >
          {{ showStore.bands[i - 1].genre.name }}

          <div class="d-flex justify-center pt-3">
            <v-rating
              density="compact"
              readonly
              size="large"
              half-increments
              active-color="orange"
              :model-value="calcRating(showStore.bands[i - 1].ratings)"
            />
          </div>
        </card-with-top-image>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <section-divider title="Top Locations" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="location in showStore.locations" cols="3">
        <card-with-top-image
          :image="'locations/' + location.image"
          :title="location.name"
        >
          {{ location.address }}
          {{ location.city.name }}, {{ location.city.country }}
        </card-with-top-image>
      </v-col>
    </v-row>
  </v-container>
</template>


