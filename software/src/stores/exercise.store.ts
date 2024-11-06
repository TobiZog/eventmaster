import { fetchAllExerciseGroups, updateExercise } from "@/data/api/exerciseApi";
import { ExerciseGroupApiModel } from "@/data/models/exercises/exerciseGroupApiModel";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFeedbackStore } from "./feedback.store";
import { BannerStateEnum } from "@/data/enums/bannerStateEnum";

export const useExerciseStore = defineStore("exerciseStore", {
  state: () => ({
    /** All exercise groups with sub-exercises */
    exerciseGroups: ref<Array<ExerciseGroupApiModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Get all exercises and exercise groups from server
     */
    async getAllExercises() {
      this.fetchInProgress = true

      await fetchAllExerciseGroups()
        .then(result => {
          this.exerciseGroups = result.data
          this.fetchInProgress = false
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
      if(!this.exerciseGroups[exerciseGroupNr].exercises[exerciseNr - 1].solved) {      
        updateExercise(exerciseGroupNr, exerciseNr, true)
          .then(result => {
            let bannerState = BannerStateEnum.ERROR

            switch(exerciseGroupNr) {
                case 0: {
                  switch(exerciseNr) {
                    case 1: bannerState = BannerStateEnum.EXERCISESOLVED01; break;
                    case 2: bannerState = BannerStateEnum.EXERCISESOLVED02; break;
                  }

                  break;
                }

                case 1: {
                  switch(exerciseNr) {
                    case 1: bannerState = BannerStateEnum.EXERCISESOLVED11; break;
                    case 2: bannerState = BannerStateEnum.EXERCISESOLVED12; break;
                    case 3: bannerState = BannerStateEnum.EXERCISESOLVED13; break;
                  }

                  break;
                }

                case 2: {
                  switch(exerciseNr) {
                    case 1: bannerState = BannerStateEnum.EXERCISESOLVED21; break;
                    case 2: bannerState = BannerStateEnum.EXERCISESOLVED22; break;
                    case 3: bannerState = BannerStateEnum.EXERCISESOLVED23; break;
                  }

                  break;
                }

                case 3: {
                  switch(exerciseNr) {
                    case 1: bannerState = BannerStateEnum.EXERCISESOLVED31; break;
                    case 2: bannerState = BannerStateEnum.EXERCISESOLVED32; break;
                    case 3: bannerState = BannerStateEnum.EXERCISESOLVED33; break;
                  }

                  break;
                }
              }

            feedbackStore.changeBanner(bannerState)
            this.getAllExercises()
          })
      }
    }
  }
})