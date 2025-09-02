<script setup lang="ts">
import cardView from "@/components/molecules/cardView.vue";
import OutlinedButton from "@/components/atoms/outlinedButton.vue";
import { ExerciseGroupModel } from "@/data/models/exercises/exerciseGroupModel";
import { ExerciseModel } from "@/data/models/exercises/exerciseModel";
import { getExerciseGroupNameLanguage } from "@/scripts/languageScripts";
import { useExerciseStore } from "@/stores/exercise.store";
import { ref, watch } from "vue";
import exerciseDialog from "./exerciseDialog.vue";
import listItem from "@/components/atoms/listItem.vue";

const exerciseStore = useExerciseStore();
const exerciseGroups = ref<Array<ExerciseGroupModel>>([]);
const showExerciseDialog = ref(false);

exerciseStore.getAllExercises();

/**
 * Extract exercise groups from all exercises
 */
function groupExercises() {
  exerciseStore.exercises.forEach((exercise) => {
    if (
      !exerciseGroups.value.find(
        (exerciseGroup) => exerciseGroup.id == exercise.exerciseGroup.id
      )
    ) {
      exerciseGroups.value.push(exercise.exerciseGroup);
    }
  });
}

function filterByExerciseGroup(
  exercises: Array<ExerciseModel>,
  group: ExerciseGroupModel
) {
  return exercises.filter((exercise) => exercise.exerciseGroup.id == group.id);
}

watch(
  () => exerciseStore.exercises,
  () => groupExercises()
);
</script>

<template>
  <card-view
    :title="$t('preferences.exercises.settings')"
    icon="mdi-book-open-blank-variant"
  >
    <template #borderless>
      <v-list>
        <list-item
          v-for="group in exerciseGroups"
          :title="getExerciseGroupNameLanguage(group)"
          hover
          :subtitle="
            $t('preferences.exercises.available', [
              filterByExerciseGroup(exerciseStore.exercises, group).filter((exercise) => exercise.available)
                .length,
              filterByExerciseGroup(exerciseStore.exercises, group).length,
            ])
          "
          :prepend-icon="group.icon"
        />
      </v-list>
    </template>

    <template #actions>
      <outlined-button prepend-icon="mdi-pencil" @click="showExerciseDialog = true">
        {{ $t("preferences.exercises.edit") }}
      </outlined-button>
    </template>
  </card-view>

  <exercise-dialog v-model="showExerciseDialog" />
</template>
