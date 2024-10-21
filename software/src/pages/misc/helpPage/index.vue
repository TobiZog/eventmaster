<script setup lang="ts">
import { getAllExerciseGroups } from '@/data/api/exerciseApi';
import scoreCard from './scoreCard.vue';
import { ref } from 'vue';
import { useFeedbackStore } from '@/stores/feedbackStore';
import { ExerciseGroupApiModel } from '@/data/models/exercises/exerciseGroupApiModel';

const exerciseGroups = ref<Array<ExerciseGroupApiModel>>([])
const feedbackStore = useFeedbackStore()

feedbackStore.fetchDataFromServerInProgress = true

getAllExerciseGroups()
  .then(result => {
    exerciseGroups.value = result.data
    feedbackStore.fetchDataFromServerInProgress = false
  })
</script>

<template>
  <v-container max-width="1000">
    <v-row v-if="feedbackStore.fetchDataFromServerInProgress" v-for="i in 3">
      <v-col>
        <score-card :loading="true"
      />
      </v-col>
    </v-row>

    <v-row v-for="exerciseGroup in exerciseGroups">
      <v-col>
        <score-card
          :exercise-group="exerciseGroup"
        />
      </v-col>
    </v-row>
  </v-container>
</template>