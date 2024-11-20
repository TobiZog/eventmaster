<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { GenreModel } from '@/data/models/acts/genreModel';
import { useGenreStore } from '@/stores/genre.store';
import { useRouter } from 'vue-router';

const genreStore = useGenreStore()
const router = useRouter()

genreStore.getGenres()

function itemProps(item: GenreModel) {
  return {
    title: item.name
  }
}

// Select genre from query parameter
genreStore.setGenreByName(String(router.currentRoute.value.query["genreName"]))
</script>

<template>
  <card-view
    :title="$t('misc.actions.filtering')"
    icon="mdi-filter"
  >
    <v-row>
      <v-col>
        <v-select
          v-model="genreStore.genre"
          :items="genreStore.genres"
          variant="outlined"
          :label="$t('band.genre', 2)"
          :item-props="itemProps"
          clearable
          hide-details
        />
      </v-col>

      <v-col cols="auto">
        <outlined-button
          @click="router.push({ path: '/bands', query: { genreName: genreStore.genre.name }})"
          height="100%"
        >
          {{ $t('misc.actions.filtering') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>
</template>