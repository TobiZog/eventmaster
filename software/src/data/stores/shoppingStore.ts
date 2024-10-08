import { defineStore } from "pinia";
import { ref } from "vue";
import { EventModel } from "../models/acts/eventModel";
import { fetchEvents } from "../api/eventApi";
import { fetchAllCities } from "../api/cityApi";
import { CityModel } from "../models/locations/cityModel";
import { GenreModel } from "../models/acts/genreModel";
import { fetchAllGenres } from "../api/genreApi";
import { useFeedbackStore } from "./feedbackStore";

export const useShoppingStore = defineStore("shoppingStore", {
  state: () => ({
    events: ref<Array<EventModel>>([]),
    cities: ref<Array<CityModel>>([]),
    genres: ref<Array<GenreModel>>([]),
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