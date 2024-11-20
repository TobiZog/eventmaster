import { fetchAllExerciseGroups, updateExercise } from "@/data/api/exerciseApi";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFeedbackStore } from "./feedback.store";
import { BannerStateEnum } from "@/data/enums/bannerStateEnum";
import { ExerciseModel } from "@/data/models/exercises/exerciseModel";

export const useExerciseStore = defineStore("exerciseStore", {
  state: () => ({
    /** All exercise groups with sub-exercises */
    exercises: ref<Array<ExerciseModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    helpPageVisible: ref(false)
  }),

  actions: {
    /**
     * Get all exercises and exercise groups from server
     */
    async getAllExercises() {
      this.fetchInProgress = true

      await fetchAllExerciseGroups()
        .then(result => {
          this.exercises = result.data

          this.helpPageVisible = this.getExercise(1, 1).solved
          this.fetchInProgress = false
        })
    },

    /**
     * Get a exercise by group and exercise number
     * 
     * @param exerciseGroupNr Number of group of exercise
     * @param exerciseNr Number of exercise in group
     * 
     * @returns ExerciseModel
     */
    getExercise(exerciseGroupNr: number, exerciseNr: number): ExerciseModel {
      return this.exercises.find((exercise: ExerciseModel) => {
        return exercise.exerciseNr == exerciseNr && exercise.exerciseGroup.groupNr == exerciseGroupNr
      })
    },

    /**
     * Mark an exercise as solved
     * 
     * @param exerciseGroupNr Exercise group number (0-3)
     * @param exerciseNr Exercise number (1-3)
     */
    async solveExercise(exerciseGroupNr: number, exerciseNr: number) {
      // Request all exercises from server
      await this.getAllExercises()

      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      // Change only if the exercise is not solved
      updateExercise(exerciseGroupNr, exerciseNr, true)
        .then(result => {
          if (result.data.changed) {

            let bannerState = BannerStateEnum.ERROR

            switch(exerciseGroupNr) {
              case 0: {
                switch(exerciseNr) {
                  case 1: bannerState = BannerStateEnum.EXERCISESOLVED01; break;
                  case 2: bannerState = BannerStateEnum.EXERCISESOLVED02; break;
                  case 3: bannerState = BannerStateEnum.EXERCISESOLVED03; break;
                }

                break;
              }

              case 1: {
                switch(exerciseNr) {
                  case 1: bannerState = BannerStateEnum.EXERCISESOLVED11; break;
                  case 2: bannerState = BannerStateEnum.EXERCISESOLVED12; break;
                }

                break;
              }

              case 2: {
                switch(exerciseNr) {
                  case 1: bannerState = BannerStateEnum.EXERCISESOLVED21; break;
                  case 2: bannerState = BannerStateEnum.EXERCISESOLVED22; break;
                  case 3: bannerState = BannerStateEnum.EXERCISESOLVED23; break;
                  case 4: bannerState = BannerStateEnum.EXERCISESOLVED24; break;
                  case 5: bannerState = BannerStateEnum.EXERCISESOLVED25; break;
                }

                break;
              }

              case 3: {
                switch(exerciseNr) {
                  case 1: bannerState = BannerStateEnum.EXERCISESOLVED31; break;
                  case 2: bannerState = BannerStateEnum.EXERCISESOLVED32; break;
                }

                break;
              }
            }

            feedbackStore.addSnackbar(bannerState)
            this.getAllExercises()
          }
        })
    }
  }
})