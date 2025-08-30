<script setup lang="ts">
import actionDialog from "@/components/basics/actionDialog.vue";
import OutlinedButton from "@/components/basics/outlinedButton.vue";
import {
  getExerciseGroupNameLanguage,
  getExerciseNameLanguage,
} from "@/scripts/languageScripts";
import { useExerciseStore } from "@/stores/exercise.store";
import { usePreferencesStore } from "@/stores/preferences.store";
import { ModelRef } from "vue";

const showDialog: ModelRef<boolean> = defineModel();
const exerciseStore = useExerciseStore();
const preferencesStore = usePreferencesStore();

function saveConfig() {
  preferencesStore.notAvailableExercises = []

  for (let exercise of exerciseStore.exercises) {
    if (!exercise.available) {
      preferencesStore.notAvailableExercises.push(exercise.uuid)
    }
  }

  showDialog.value = false
}
</script>

<template>
  <action-dialog
    v-model="showDialog"
    :title="$t('preferences.exercises.edit')"
    icon="mdi-pencil"
    width="800"
    persistent
  >
    <v-container>
      <v-list>
        <div v-for="exercise in exerciseStore.exercises">
          <div
            v-if="exercise.exerciseNr == 1"
          >
            <v-divider v-if="exercise.exerciseGroup.groupNr != 0"></v-divider>
            <v-list-item
              type="subheader"
              :title="getExerciseGroupNameLanguage(exercise.exerciseGroup)"
            />
          </div>

          <v-list-item>
            <v-checkbox
              :label="getExerciseNameLanguage(exercise)"
              v-model="exercise.available"
              hide-details
              density="compact"
            />
          </v-list-item>
        </div>
      </v-list>
    </v-container>

    <template #actions>
      <outlined-button color="warning" prepend-icon="mdi-close" @click="showDialog = false">
        {{ $t('misc.actions.cancel') }}
      </outlined-button> 
      <outlined-button color="success" prepend-icon="mdi-content-save" @click="saveConfig()">
        {{ $t("misc.actions.save") }}
      </outlined-button>
    </template>
  </action-dialog>
</template>
