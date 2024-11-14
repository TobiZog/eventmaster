<script setup lang="ts">
import { useExerciseStore } from '@/stores/exercise.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { generateResultsPdf } from '@/scripts/pdfScripts';
import { usePreferencesStore } from '@/stores/preferences.store';
import cardView from '@/components/basics/cardView.vue';
import { LanguageEnum } from '@/data/enums/languageEnum';

const exerciseStore = useExerciseStore()
const preferencesStore = usePreferencesStore()

exerciseStore.getAllExercises()

function getDotColor(exerciseGroupNr: number) {
  switch(exerciseGroupNr) {
    case 0: return "purple"
    case 1: return "orange"
    case 2: return "blue"
    case 3: return "pink"
  }
}
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

    <v-row>
      <v-col>
        <card-view
          :title="$t('misc.firstStartup.exercises')"
          icon="mdi-checkbox-marked-circle-auto-outline"
        >
          <template #borderless>
            <v-timeline
              side="end"
              class="px-5"
              align="start"
            >
              <v-timeline-item
                v-for="exercise of exerciseStore.exercises"
                :dot-color="getDotColor(exercise.exerciseGroup.groupNr)"
                :icon="exercise.solved ? 'mdi-check' : 'mdi-pencil'"
              >
                <!-- Left side -->
                <template #opposite>
                  <div
                    v-if="exercise.exerciseNr == 1"
                    :class="`pt-1 font-weight-bold text-${getDotColor(exercise.exerciseGroup.groupNr)}`"
                  >
                    {{
                      (preferencesStore.language == LanguageEnum.GERMAN 
                      ? exercise.exerciseGroup.nameDe 
                      : exercise.exerciseGroup.nameEn) 
                    }}
                  </div>
                </template>

                <!-- Right side -->
                <card-view
                  :title="$t('help.scoreBoard.exerciseNr', [exercise.exerciseGroup.groupNr, exercise.exerciseNr]) + 
                    (preferencesStore.language == LanguageEnum.GERMAN ? exercise.nameDe : exercise.nameEn)"
                  :color="exercise.solved ? 'green' : 'primary'"
                >
                  {{ preferencesStore.language == LanguageEnum.GERMAN ? exercise.descriptionDe : exercise.descriptionEn }}
                </card-view>
              </v-timeline-item>
            </v-timeline>
          </template>
        </card-view>
      </v-col>
    </v-row>
  </v-container>
</template>