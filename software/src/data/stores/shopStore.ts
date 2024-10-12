import { defineStore } from "pinia";
import { ref } from "vue";
import { ConcertApiModel } from "../models/acts/concertApiModel";
import { BandApiModel } from "../models/acts/bandApiModel";
import { CityApiModel } from "../models/locations/cityApiModel";
import { GenreApiModel } from "../models/acts/genreApiModel";
import { searchBand } from "../api/bandApi";
import { searchLocation } from "../api/locationApi";
import { fetchConcerts, searchConcert } from "../api/concertApi";
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