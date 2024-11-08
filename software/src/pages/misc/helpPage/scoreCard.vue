<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { LanguageEnum } from '@/data/enums/languageEnum';
import { ExerciseGroupApiModel } from '@/data/models/exercises/exerciseGroupApiModel';
import { usePreferencesStore } from '@/stores/preferences.store';

defineProps({
  exerciseGroup: ExerciseGroupApiModel,
  loading: Boolean
})

const preferencesStore = usePreferencesStore()
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

  <card-view
    v-else
    :title="$t('help.scoreBoard.exerciseGroupNr', [exerciseGroup.groupNr]) + 
      (preferencesStore.language == LanguageEnum.GERMAN ? exerciseGroup.nameDe : exerciseGroup.nameEn)"
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
            <div class="text-center pb-3">
              <div class="text-h6">
                {{ (preferencesStore.language == LanguageEnum.GERMAN ? exercise.nameDe : exercise.nameEn) }}
              </div>

              <div>
                {{ (preferencesStore.language == LanguageEnum.GERMAN ? 
                  exercise.descriptionDe : exercise.descriptionEn) }}
              </div>
            </div>
          </v-skeleton-loader>
          </template>
        </v-timeline-item>
      </v-timeline>
    </template>
  </card-view>
</template>