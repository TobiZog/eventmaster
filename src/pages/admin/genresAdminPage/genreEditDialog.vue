<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { getStringRules } from '@/scripts/validationRules';
import { useGenreStore } from '@/stores/genre.store';
import { ref } from 'vue';

const valid = ref(false)

const genreStore = useGenreStore()
</script>

<template>
  <action-dialog
    v-model="genreStore.showEditDialog"
    :title="$t('band.editGenre')"
    icon="mdi-pencil"
    max-width="500"
  >
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('band.genre')"
              v-model="genreStore.genre.name"
              variant="outlined"
              hide-details
              :rules="getStringRules(3)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <template #actions>
      <outlined-button
        color="success"
        @click="genreStore.saveGenre"
        :disabled="!valid"
        :loading="genreStore.fetchInProgress"
      >
        {{ $t('misc.actions.save') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>