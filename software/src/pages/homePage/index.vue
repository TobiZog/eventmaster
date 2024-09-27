<script setup lang="ts">
import { useShowStore } from '@/data/stores/showStore';
import highlightCarousel from './highlightCarousel.vue';
import sectionDivider from '@/components/sectionDivider.vue';
import cardWithTopImage from '@/components/cardWithTopImage.vue';
import { calcRating } from '@/scripts/showsScripts';
import OutlinedButton from '@/components/outlinedButton.vue';
import router from '@/plugins/router';

const showStore = useShowStore()
</script>

<template>
  <highlight-carousel />

  <v-container>
    <v-row>
      <v-col>
        <section-divider :title="$t('shows.topEvents')" />
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
        <outlined-button
          append-icon="mdi-chevron-right"
          @click="router.push('/shows/events')"
          block
        >
          {{ $t('menu.allEvents') }}
        </outlined-button>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <section-divider :title="$t('shows.topBands')" />
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
        <outlined-button
          append-icon="mdi-chevron-right"
          @click="router.push('/shows/bands')"
          block
        >
          {{ $t('menu.allBands') }}
        </outlined-button>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <section-divider :title="$t('shows.topLocations')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="i in 4" cols="3">
        <card-with-top-image
          :image="'locations/' + showStore.locations[i + 2].image"
          :title="showStore.locations[i + 2].name"
        >
          <div>{{ showStore.locations[i + 2].address }}</div>
          {{ showStore.locations[i + 2].city.name }}, {{ showStore.locations[i + 2].city.country }}
        </card-with-top-image>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <outlined-button
          append-icon="mdi-chevron-right"
          @click="router.push('/shows/locations')"
          block
        >
          {{ $t('menu.allLocations') }}
        </outlined-button>
      </v-col>
    </v-row>
  </v-container>
</template>


