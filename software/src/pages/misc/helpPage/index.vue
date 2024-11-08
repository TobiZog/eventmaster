<script setup lang="ts">
import scoreCard from './scoreCard.vue';
import { useExerciseStore } from '@/stores/exercise.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { generateResultsPdf } from '@/scripts/pdfScripts';
import { usePreferencesStore } from '@/stores/preferences.store';

const exerciseStore = useExerciseStore()
const preferencesStore = usePreferencesStore()

exerciseStore.getAllExercises()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-spacer />

      <v-col cols="auto">
        <outlined-button
          prepend-icon="mdi-file-pdf-box"
          @click="generateResultsPdf()"
          :disabled="preferencesStore.studentName.length < 3 || preferencesStore.registrationNumber.length < 7"
        >
          PDF generieren
        </outlined-button>
      </v-col>
    </v-row>
    <v-row v-if="exerciseStore.fetchInProgress" v-for="i in 3">
      <v-col>
        <score-card :loading="true"
      />
      </v-col>
    </v-row>

    <v-row v-for="exerciseGroup in exerciseStore.exerciseGroups">
      <v-col>
        <score-card
          :exercise-group="exerciseGroup"
        />
      </v-col>
    </v-row>
  </v-container>
</template>