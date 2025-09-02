<script setup lang="ts">
import { useExerciseStore } from "@/stores/exercise.store";
import outlinedButton from "@/components/basics/outlinedButton.vue";
import { generateResultsPdf } from "@/scripts/pdfScripts";
import { usePreferencesStore } from "@/stores/preferences.store";
import cardView from "@/components/basics/cardView.vue";
import { LanguageEnum } from "@/data/enums/languageEnum";
import { ExerciseModel } from "@/data/models/exercises/exerciseModel";
import { getExerciseDotColor } from "@/scripts/colorScripts";
import { getExerciseDescriptionLanguage, getExerciseNameLanguage } from "@/scripts/languageScripts";

const exerciseStore = useExerciseStore();
const preferencesStore = usePreferencesStore();

// Mark this exercise as solved if page was opened
exerciseStore.solveExercise(1, 1);

function generateExerciseKey() {
  try {
    let code = "";

    for (let i = 0; i < 13; i++) {
      if (exerciseStore.exercises[i].solved) {
        code += "3";
      } else {
        code += "0";
      }
    }

    return (Number(code) + Number(preferencesStore.registrationNumber)) * 237;
  } catch (e) {}
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
          :disabled="
            preferencesStore.studentName.length < 3 ||
            preferencesStore.registrationNumber.length < 7
          "
        >
          {{ $t("help.scoreBoard.generatePdf") }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-h5 text-center">
        <div>
          {{ $t("help.scoreBoard.personalSolutionKey") + ":" }}
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
            <v-timeline side="end" class="px-5" align="start">
              <template v-for="exercise of exerciseStore.exercises">
                <!-- Add exercise group description item -->
                <v-timeline-item
                  v-if="exercise.exerciseNr == 1"
                  :dot-color="
                    getExerciseDotColor(exercise.exerciseGroup.groupNr)
                  "
                  :icon="exercise.exerciseGroup.icon"
                  fill-dot
                >
                  <div
                    :class="`pt-1 text-h5 font-weight-bold text-${getExerciseDotColor(
                      exercise.exerciseGroup.groupNr
                    )}`"
                  >
                    {{
                      preferencesStore.language == LanguageEnum.GERMAN
                        ? exercise.exerciseGroup.nameDe
                        : exercise.exerciseGroup.nameEn
                    }}
                  </div>

                  <div>
                    {{
                      preferencesStore.language == LanguageEnum.GERMAN
                        ? exercise.exerciseGroup.descriptionDe
                        : exercise.exerciseGroup.descriptionEn
                    }}
                  </div>
                </v-timeline-item>

                <!-- Exercise item -->
                <v-timeline-item
                  v-if="exercise.available"
                  :dot-color="exercise.solved ? 'green-darken-4' : 'primary'"
                  :icon="exercise.solved ? 'mdi-check' : 'mdi-pencil'"
                >
                  <!-- Right side -->
                  <card-view
                    :title="
                      $t('help.scoreBoard.exerciseNr', [
                        exercise.exerciseGroup.groupNr,
                        exercise.exerciseNr,
                      ]) + getExerciseNameLanguage(exercise)
                    "
                    :color="exercise.solved ? 'green-darken-4' : 'primary'"
                  >
                    {{ getExerciseDescriptionLanguage(exercise) }}
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
