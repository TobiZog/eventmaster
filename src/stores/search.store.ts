import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchBandsBySearchTerm } from "../data/api/bandApi";
import { fetchLocationsBySearchTerm } from "../data/api/locationApi";
import { fetchConcertsBySearchTerm } from "../data/api/concertApi";
import { ConcertApiModel } from "@/data/models/acts/concertApiModel";
import { useExerciseStore } from "./exercise.store";
import { BandApiModel } from "@/data/models/acts/bandApiModel";
import { useBandStore } from "./band.store";
import { useAccountStore } from "./account.store";
import { LocationDetailsApiModel } from "@/data/models/locations/locationDetailsApiModel";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    /** Search term */
    searchTerm: ref<string>(""),

    /** Band results */
    bands: ref<Array<BandApiModel>>([]),

    /** Location results */
    locations: ref<Array<LocationDetailsApiModel>>([]),

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

      /**
       * Fetch all bands by this.searchTerm
       */
      await fetchBandsBySearchTerm(this.searchTerm)
        .then(async result => {
          this.bands = result.data

          // Check for exercise solution
          if (result.data.length != 0) {
            // Exercise 2.1
            if (this.bands[0].username != undefined) {
              exerciseStore.solveExercise(2, 1)
              console.log("Exercise 2.1 solved")
            }
            // Exercise 2.2
            else if (this.bands[0].privilegeAdminPanel != undefined) {
              exerciseStore.solveExercise(2, 2)
              console.log("Exercise 2.2 solved")
            }
          }

          // Exercise 2.3
          else if (this.searchTerm.includes("UPDATE")) {
            const accountStore = useAccountStore()
            await accountStore.refreshAccount()

            if (accountStore.userAccount.accountRole.privilegeAdminPanel == true) {
              exerciseStore.solveExercise(2, 3)
              console.log("Exercise 2.3 solved")
            }
          }

          // Exercise 2.5
          else if (this.searchTerm.includes("DELETE")) {
            const bandStore = useBandStore()
            await bandStore.getBand("muse")

            if (bandStore.band.ratingValues.find(rating => rating.value == 5).count == 0) {
              exerciseStore.solveExercise(2, 5)
              console.log("Exercise 2.5 solved")
            }
          }
        })


      /**
       * Fetch all locations by this.searchTerm
       */
      await fetchLocationsBySearchTerm(this.searchTerm)
        .then(result => {
          this.locations = result.data
        })


      /**
       * Fetch all concerts by this.searchTerm
       */
      await fetchConcertsBySearchTerm(this.searchTerm)
        .then(result => {
          this.concerts = result.data
        })

      this.fetchInProgress = false
    }
  }
})