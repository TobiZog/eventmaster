import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchBandsBySearchTerm } from "../data/api/bandApi";
import { fetchLocationsBySearchTerm } from "../data/api/locationApi";
import { fetchConcertsBySearchTerm } from "../data/api/concertApi";
import { ConcertApiModel } from "@/data/models/acts/concertApiModel";
import { useExerciseStore } from "./exercise.store";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    /** Search term */
    searchTerm: ref(""),

    /** Band results */
    bands: ref(),

    /** Location results */
    locations: ref(),

    /** Concert results */
    concerts: ref<Array<ConcertApiModel>>([]),

    /** One or more searches are already performed */
    alreadySearched: ref(false),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Search for the term in all bands, locations, events 
     */
    async startSearch() {
      const exerciseStore = useExerciseStore()

      this.alreadySearched = true
      this.fetchInProgress = true

      // Exercise solutions
      if (this.searchTerm.endsWith("'); SELECT * FROM Accounts; --")) {
        exerciseStore.solveExercise(2, 1)
      } else if (this.searchTerm.endsWith("'); SELECT * FROM AccountRoles; --")) {
        exerciseStore.solveExercise(2, 2)
      } else if (this.searchTerm.includes("'); UPDATE Accounts SET accountRoleId = 2 WHERE username = ")) {
        exerciseStore.solveExercise(2, 3)
      }

      await fetchBandsBySearchTerm(this.searchTerm)
        .then(result => {
          this.bands = result.data
        })

      await fetchLocationsBySearchTerm(this.searchTerm)
        .then(result => {
          this.locations = result.data
        })

      await fetchConcertsBySearchTerm(this.searchTerm)
        .then(result => {
          this.concerts = result.data
        })

      this.fetchInProgress = false
    }
  }
})