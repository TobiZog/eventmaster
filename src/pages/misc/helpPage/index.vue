<script setup lang="ts">
import { useExerciseStore } from '@/stores/exercise.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { generateResultsPdf } from '@/scripts/pdfScripts';
import { usePreferencesStore } from '@/stores/preferences.store';
import cardView from '@/components/basics/cardView.vue';
import { LanguageEnum } from '@/data/enums/languageEnum';
import { ExerciseModel } from '@/data/models/exercises/exerciseModel';

const exerciseStore = useExerciseStore()
const preferencesStore = usePreferencesStore()

exerciseStore.solveExercise(1, 1)

function getDotColor(exerciseGroupNr: number) {
  switch(exerciseGroupNr) {
    case 0: return "purple"
    case 1: return "orange"
    case 2: return "blue"
    case 3: return "pink"
  }
}

function generateExerciseKey() {
  try {
    let code = ""

    for (let i = 0; i < 13; i++) {
      if (exerciseStore.exercises[i].solved) {
        code += "3"
      } else {
        code += "0"
      }
    }

    return (Number(code) + Number(preferencesStore.registrationNumber)) * 237
  } catch(e) {}
}

function getNameLanguage(exercise: ExerciseModel) {
  switch(preferencesStore.language) {
    case LanguageEnum.GERMAN: return exercise.nameDe
    case LanguageEnum.ENGLISH: return exercise.nameEn
  }
}

function getDescriptionLanguage(exercise: ExerciseModel) {
  switch(preferencesStore.language) {
    case LanguageEnum.GERMAN: return exercise.descriptionDe
    case LanguageEnum.ENGLISH: return exercise.descriptionEn
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
          {{ $t('help.scoreBoard.generatePdf') }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-h5 text-center">
        <div>
          {{ $t('help.scoreBoard.personalSolutionKey') + ':' }}
        </div>
        <div>
          {{ generateExerciseKey() }}
        </div>
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
              <template v-for="exercise of exerciseStore.exercises">
                <!-- Add exercise group description item -->
                <v-timeline-item v-if="exercise.exerciseNr == 1"
                  :dot-color="getDotColor(exercise.exerciseGroup.groupNr)"
                  :icon="exercise.exerciseGroup.icon"
                  fill-dot
                >
                  <div
                    :class="`pt-1 text-h5 font-weight-bold text-${getDotColor(exercise.exerciseGroup.groupNr)}`"
                  >
                    {{
                      (preferencesStore.language == LanguageEnum.GERMAN 
                      ? exercise.exerciseGroup.nameDe 
                      : exercise.exerciseGroup.nameEn) 
                    }}
                  </div>

                  <div>
                    {{
                      (preferencesStore.language == LanguageEnum.GERMAN 
                      ? exercise.exerciseGroup.descriptionDe 
                      : exercise.exerciseGroup.descriptionEn) 
                    }}
                  </div>
                </v-timeline-item>

                <!-- Exercise item -->
                <v-timeline-item
                  :dot-color="exercise.solved ? 'green' : 'primary'"
                  :icon="exercise.solved ? 'mdi-check' : 'mdi-pencil'"
                >
                   <!-- Right side -->
                  <card-view
                    :title="$t('help.scoreBoard.exerciseNr', [exercise.exerciseGroup.groupNr, exercise.exerciseNr]) + 
                      getNameLanguage(exercise)"
                    :color="exercise.solved ? 'green' : 'primary'"
                  >
                    {{ getDescriptionLanguage(exercise) }}
                  </card-view>
                </v-timeline-item>
              </template>
            </v-timeline>
          </template>
        </card-view>
      </v-col>
    </v-row>
  </v-container>
</template>