import { defineStore } from "pinia";
import { ref } from "vue";
import { EventModel } from "../models/acts/eventModel";
import { fetchEvents } from "../api/eventApi";
import { fetchAllCities } from "../api/cityApi";
import { CityModel } from "../models/locations/cityModel";
import { GenreModel } from "../models/acts/genreModel";
import { fetchAllGenres } from "../api/genreApi";

export const useShoppingStore = defineStore("shoppingStore", {
  state: () => ({
    events: ref<Array<EventModel>>([ new EventModel() ]),
    cities: ref<Array<CityModel>>([ new CityModel() ]),
    genres: ref<Array<GenreModel>>([ new GenreModel() ]),
    cityFilterName: ref<String>(),
    genreFilterName: ref<String>()
  }),

  actions: {
    async getEvents() {
      await fetchEvents(
        this.cityFilterName != null ? this.cityFilterName : "",
        this.genreFilterName != null ? this.genreFilterName : ""
      )
        .then(result => {
          this.events = result.data
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