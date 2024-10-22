<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useBandStore } from '@/stores/band.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { GenreModel } from '@/data/models/acts/genreModel';

const bandStore = useBandStore()

function itemProps(item: GenreModel) {
  return {
    title: item.name
  }
}
</script>

<template>
  <card-view :title="$t('filtering')">
    <v-row>
      <v-col>
        <v-select
          v-model="bandStore.filteredGenres"
          :items="bandStore.availableGenres"
          variant="outlined"
          :label="$t('genres')"
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
          {{ $t('filtering') }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>
</template>