import { fetchAllExerciseGroups, updateExercise } from "@/data/api/exerciseApi";
import { ExerciseGroupApiModel } from "@/data/models/exercises/exerciseGroupApiModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExerciseStore = defineStore("exerciseStore", {
  state: () => ({
    exerciseGroups: ref<Array<ExerciseGroupApiModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    getAllExercises() {
      this.fetchInProgress = true

      fetchAllExerciseGroups()
        .then(result => {
          this.exerciseGroups = result.data
          this.fetchInProgress = false
        })
    },

    solveExercise(exerciseGroupNr: number, exerciseNr: number) {
      this.fetchInProgress = true
      
      updateExercise(exerciseGroupNr, exerciseNr, true)
        .then(result => {
          this.getAllExercises()
        })
    }
  }
})