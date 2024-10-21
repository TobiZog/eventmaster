import { defineStore } from "pinia";
import { ref } from "vue";
import { searchBand } from "../data/api/bandApi";
import { searchLocation } from "../data/api/locationApi";
import { searchConcert } from "../data/api/concertApi";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    searchTerm: ref(""),
    bands: ref(),
    locations: ref(),
    concerts: ref(),
    alreadySearched: ref(false),
    searchInProgress: ref(false)
  }),

  actions: {
    /**
     * Search for the termin in all bands, locations, events 
     */
    async startSearch() {
      this.alreadySearched = true
      this.searchInProgress = true

      await searchBand(this.searchTerm)
        .then(result => {
          this.bands = result.data
        })

      await searchLocation(this.searchTerm)
        .then(result => {
          this.locations = result.data
        })

      await searchConcert(this.searchTerm)
        .then(result => {
          this.concerts = result.data
        })

      this.searchInProgress = false
    }
  }
})