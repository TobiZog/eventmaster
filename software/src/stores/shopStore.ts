import { defineStore } from "pinia";
import { ref } from "vue";
import { ConcertApiModel } from "../data/models/acts/concertApiModel";
import { BandApiModel } from "../data/models/acts/bandApiModel";
import { CityApiModel } from "../data/models/locations/cityApiModel";
import { GenreApiModel } from "../data/models/acts/genreApiModel";
import { searchBand } from "../data/api/bandApi";
import { searchLocation } from "../data/api/locationApi";
import { fetchConcerts, searchConcert } from "../data/api/concertApi";
import { useFeedbackStore } from "./feedbackStore";

export const useShopStore = defineStore("shopStore", {
  state: () => ({
    concertsFiltered: ref<Array<ConcertApiModel>>([]),
    bandsFiltered: ref<Array<BandApiModel>>([]),
    cities: ref<Array<CityApiModel>>([]),
    cityFilterName: ref<string>(),
    genreFilterName: ref<string>(),
    genres: ref<Array<GenreApiModel>>([]),
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
    },

    async getConcerts() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchConcerts()
        .then(result => {
          this.concerts = result.data
        })
    }
  }
})