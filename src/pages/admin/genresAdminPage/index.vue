<script setup lang="ts">
import dataLayout from '@/layouts/dataLayout.vue';
import genreEditDialog from './genreEditDialog.vue';
import { useGenreStore } from '@/stores/genre.store';

const genreStore = useGenreStore()

const headers = [
  { title: "Name", value: "name" },
  { title: "Bands", value: "bands" },
  { title: "", value: "edit", width: 130 }
]

genreStore.getGenres()
</script>

<template>
  <data-layout
    :add-button-string="$t('band.addNewGenre')"
    :fetch-in-progress="genreStore.fetchInProgress"
    :on-add-click="() => { genreStore.newGenre() }"
  >
    <v-data-table
      :loading="genreStore.fetchInProgress"
      :items="genreStore.genres"
      :headers="headers"
      :items-per-page="100"
    >
      <template #item.bands="{ item }">
        <v-chip v-for="band of item.bands" class="mx-1">
          {{ band.name }}
        </v-chip>
      </template>

      <template #item.edit="{ item }">
        <!-- todo <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="genreStore.editGenre(item)"
        /> -->

        <!-- todo <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="genreStore.deleteGenre(item)"
        /> -->
      </template>
    </v-data-table>
  </data-layout>

  <genre-edit-dialog />
</template>