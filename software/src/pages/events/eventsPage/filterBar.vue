<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { GenreModel } from '@/data/models/acts/genreModel';
import { CityModel } from '@/data/models/locations/cityModel';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useRoute, useRouter } from 'vue-router';

const shoppingStore = useShoppingStore()
const router = useRouter()

shoppingStore.getCities()
shoppingStore.getGenres()

function itemPropsCity(city: CityModel) {
  return {
    title: city.name
  }
}

function itemPropsGenre(genre: GenreModel) {
  return {
    title: genre.name
  }
}

function filter() {
  let queries = {}

  if (shoppingStore.cityFilterName != null && shoppingStore.cityFilterName != "undefined") {
    queries["city"] = shoppingStore.cityFilterName
  }

  if (shoppingStore.genreFilterName != null && shoppingStore.genreFilterName != "undefined") {
    queries["genre"] = shoppingStore.genreFilterName
  }

  router.push({ path: '/events', query: queries})

  shoppingStore.getEvents()
}
</script>

<template>
  <card-view
    variant="tonal"
    :title="$t('filtering')"
    icon="mdi-cog"
  >
    <v-row class="d-flex justify-center" >
      <v-col cols="3">
        <v-select
          variant="outlined"
          :items="shoppingStore.cities"
          :item-props="itemPropsCity"
          v-model="shoppingStore.cityFilterName"
          :label="$t('city')"
          class="mb-n5"
          :clearable="shoppingStore.cityFilterName != ''"
          base-color="secondary"
          color="secondary"
          item-value="name"
        />
      </v-col>

      <v-col cols="4">
        <v-select
          variant="outlined"
          :items="shoppingStore.genres"
          :item-props="itemPropsGenre"
          v-model="shoppingStore.genreFilterName"
          label="Genre"
          :clearable="shoppingStore.genreFilterName != ''"
          class="mb-n5"
          base-color="secondary"
          color="secondary"
          item-value="name"
        />
      </v-col>

      <v-col cols="2">
        <outlined-button
          height="100%"
          append-icon="mdi-chevron-right"
          @click="filter"
        >
          {{ $t('filtering') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>
</template>