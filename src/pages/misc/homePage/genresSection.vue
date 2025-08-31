<script setup lang="ts">
import CardView from "@/components/basics/cardView.vue";
import CardViewOneLine from "@/components/basics/cardViewOneLine.vue";
import SectionDivider from "@/components/basics/sectionDivider.vue";
import { GenreApiModel } from "@/data/models/acts/genreApiModel";
import { useGenreStore } from "@/stores/genre.store";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const genreStore = useGenreStore();
const genresByNumberOfBands = ref<Array<GenreApiModel>>([]);
const router = useRouter();

genreStore.getGenres();

watch(
  () => genreStore.genres,
  () => {
    genresByNumberOfBands.value = genreStore.genres;

    genresByNumberOfBands.value.sort((a, b) => {
      return b.bands.length - a.bands.length;
    });
  }
);
</script>

<template>
  <v-row>
    <v-col>
      <section-divider :title="$t('genre.popular')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col v-if="genreStore.fetchInProgress" v-for="n in 4" cols="6" md="">
      <v-skeleton-loader :loading="true" type="card" />
    </v-col>

    <v-col v-else v-for="genre in genresByNumberOfBands" cols="6" md="3">
      <card-view
        @click="router.push({ path: '/bands', query: { genreName: genre.name }})"
        :title="genre.name"
        :subtitle="genre.bands.length + ' ' + $t('band.band', genre.bands.length)"
      />
    </v-col>
  </v-row>
</template>
