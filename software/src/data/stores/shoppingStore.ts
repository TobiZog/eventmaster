import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchEvents } from "../api/eventApi";
import { fetchAllCities } from "../api/cityApi";
import { fetchAllGenres } from "../api/genreApi";
import { useFeedbackStore } from "./feedbackStore";
import { CityApiModel } from "../models/locations/cityApiModel";
import { GenreApiModel } from "../models/acts/genreApiModel";

export const useShoppingStore = defineStore("shoppingStore", {
  state: () => ({
    cities: ref<Array<CityApiModel>>([]),
    genres: ref<Array<GenreApiModel>>([]),
    cityFilterName: ref<string>(),
    genreFilterName: ref<string>()
  }),

  actions: {
    async getEvents() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchEvents(
        this.cityFilterName != null && this.cityFilterName != "undefined" && !this.cityFilterName.startsWith("<") ? this.cityFilterName : "",
        this.genreFilterName != null && this.genreFilterName != "undefined" && !this.genreFilterName.startsWith("<") ? this.genreFilterName : ""
      )
        .then(result => {
          this.events = result.data
          feedbackStore.fetchDataFromServerInProgress = false
        })
    },

    async getCities() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchAllCities()
        .then(result => {
          this.cities = result.data
          feedbackStore.fetchDataFromServerInProgress = false
        })
    },

    async getGenres() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchAllGenres()
        .then(result => {
          this.genres = result.data
          feedbackStore.fetchDataFromServerInProgress = false
        })
    }
  }
})