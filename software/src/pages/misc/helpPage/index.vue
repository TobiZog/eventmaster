<script setup lang="ts">
import scoreCard from './scoreCard.vue';
import { useExerciseStore } from '@/stores/exercise.store';

const exerciseStore = useExerciseStore()

exerciseStore.getAllExercises()
</script>

<template>
  <v-container max-width="1000">
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