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
    cityFilterName: ref<String>(),
    genreFilterName: ref<String>()
  }),

  actions: {
    async getEvents() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchEvents(
        this.cityFilterName != null ? this.cityFilterName : "",
        this.genreFilterName != null ? this.genreFilterName : ""
      )
        .then(result => {
          this.events = result.data
          feedbackStore.fetchDataFromServerInProgress = false
        })
    },

    async getCities() {
      await fetchAllCities()
        .then(result => {
          this.cities = result.data
        })
    },

    async getGenres() {
      await fetchAllGenres()
        .then(result => {
          this.genres = result.data
        })
    }
  }
})