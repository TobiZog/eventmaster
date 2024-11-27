<script setup lang="ts">
import { useExerciseStore } from '@/stores/exercise.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { generateResultsPdf } from '@/scripts/pdfScripts';
import { usePreferencesStore } from '@/stores/preferences.store';
import cardView from '@/components/basics/cardView.vue';
import { LanguageEnum } from '@/data/enums/languageEnum';

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

function checksum(num: number) {
  let cs = 0

  for (; num > 0; num = Math.trunc(num / 10)) {
      cs += num % 10;
  }

  return cs
}

function generateExerciseKey(exerciseGroup: number, exerciseNr: number) {
  try {
    let matrikelNr = Number(preferencesStore.registrationNumber)
    let a = matrikelNr + exerciseGroup * 100 + exerciseNr * 12345678 + 
      checksum(Number(preferencesStore.registrationNumber)) * 123
    return a.toString(16).toUpperCase()
  } catch(e) {}
}
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-spacer />

      <v-col
        v-if="preferencesStore.studentName.length < 3 || preferencesStore.registrationNumber.length < 7"
        cols="auto"
      >
        <card-view variant="outlined" >
          {{ $t('misc.fulfillYourPersonalDataFirst') }}
        </card-view>
      </v-col>

      <v-col cols="auto">
        <v-tooltip :text="$t('misc.fulfillYourPersonalDataFirst')">
          <template #activator="{ props }"></template>

        </v-tooltip>
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
              <template v-for="exercise of exerciseStore.exercises">
                <v-timeline-item v-if="exercise.exerciseNr == 1"
                  dot-color="grey"
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

                <v-timeline-item
                  :dot-color="getDotColor(exercise.exerciseGroup.groupNr)"
                  :icon="exercise.solved ? 'mdi-check' : 'mdi-pencil'"
                >
                   <!-- Right side -->
                  <card-view
                    :title="$t('help.scoreBoard.exerciseNr', [exercise.exerciseGroup.groupNr, exercise.exerciseNr]) + 
                      (preferencesStore.language == LanguageEnum.GERMAN ? exercise.nameDe : exercise.nameEn)"
                    :color="exercise.solved ? 'green' : 'primary'"
                  >
                    {{ preferencesStore.language == LanguageEnum.GERMAN ? exercise.descriptionDe : exercise.descriptionEn }}
                    <div class="pt-2 text-h6">
                      Solution Code: 0x{{ generateExerciseKey(exercise.exerciseGroup.groupNr, exercise.exerciseNr) }}
                    </div>
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