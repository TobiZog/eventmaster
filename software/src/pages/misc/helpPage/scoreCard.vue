<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { ExerciseGroupApiModel } from '@/data/models/exercises/exerciseGroupApiModel';

defineProps({
  exerciseGroup: ExerciseGroupApiModel,
  loading: Boolean
})
</script>

<template>
  <card-view v-if="loading" :loading="loading" >
    <v-timeline
      direction="horizontal"
      side="start"
      class="pb-3"
    >
      <v-timeline-item
        v-for="i in 3"
        dot-color="grey"
        icon="mdi-pencil"
      >
        <v-skeleton-loader
          type="list-item"
          :loading="loading"
          width="200"
        />

      <template #opposite>
        <v-skeleton-loader
          type="sentences"
          :loading="loading"
          width="200"
        />
        </template>
      </v-timeline-item>
    </v-timeline>
  </card-view>

  <!-- todo: English -->
  <card-view
    v-else
    :title="$t('help.scoreBoard.exerciseGroupNr', [exerciseGroup.groupNr]) +  exerciseGroup.nameDe"
    :loading="loading"
  >
    <template #borderless>
      <v-timeline
        direction="horizontal"
        side="start"
        class="pt-3"
      >
        <v-timeline-item
          v-for="exercise in exerciseGroup.exercises"
          :dot-color="exercise.solved ? 'green' : 'grey'"
          :icon="exercise.solved ? 'mdi-check' : 'mdi-pencil'"
        >
          <v-skeleton-loader
            type="text"
            :loading="loading"
          >
            <div class="text-h6">
              {{ $t('help.scoreBoard.exerciseNr', [exercise.exerciseNr]) }}
            </div>
          </v-skeleton-loader>
          

          <template #opposite>
            <v-skeleton-loader
            type="text"
            :loading="loading"
          >
            <div class="text-center">
              <div class="text-h6">
                {{ exercise.nameDe }}
              </div>

              <div>
                <!-- todo: English -->
                {{ exercise.descriptionDe }}
              </div>
            </div>
          </v-skeleton-loader>
          </template>
        </v-timeline-item>
      </v-timeline>
    </template>
  </card-view>
</template>