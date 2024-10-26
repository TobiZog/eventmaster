<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useBandStore } from '@/stores/band.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { GenreModel } from '@/data/models/acts/genreModel';
import { useGenreStore } from '@/stores/genre.store';

const bandStore = useBandStore()
const genreStore = useGenreStore()

function itemProps(item: GenreModel) {
  return {
    title: item.name
  }
}
</script>

<template>
  <card-view
    :title="$t('misc.actions.filtering')"
    icon="mdi-filter"
  >
    <v-row>
      <v-col>
        <v-select
          v-model="genreStore.filteredGenres"
          :items="genreStore.genres"
          variant="outlined"
          :label="$t('band.genre', 2)"
          :item-props="itemProps"
          chips
          clearable
          hide-details
          multiple
        />
      </v-col>

      <v-col cols="auto">
        <outlined-button
          @click="bandStore.getBands"
          height="100%"
        >
          {{ $t('misc.actions.filtering') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>
</template>