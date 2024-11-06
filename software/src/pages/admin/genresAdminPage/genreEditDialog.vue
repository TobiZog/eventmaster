<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useGenreStore } from '@/stores/genre.store';

const genreStore = useGenreStore()
</script>

<template>
  <action-dialog
    v-model="genreStore.showEditDialog"
    :title="$t('band.editGenre')"
    icon="mdi-pencil"
    max-width="500"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('band.genre')"
            v-model="genreStore.genre.name"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <outlined-button
        color="green"
        @click="genreStore.saveGenre"
        :loading="genreStore.fetchInProgress"
      >
        {{ $t('misc.actions.save') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>