import { defineStore } from "pinia";
import { ref } from "vue";
import { useFeedbackStore } from "./feedbackStore";
import { fetchAllLocations } from "../api/locationApi";
import { LocationApiModel } from "../models/locations/locationApiModel";
import { CityModel } from "../models/locations/cityModel";
import { fetchAllCities } from "../api/cityApi";

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    locations: ref<Array<LocationApiModel>>([]),
    cities: ref<Array<CityModel>>([])
  }),

  actions: {
    async getLocations() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchAllLocations()
        .then(result => {
          this.locations = result.data
        })

      await fetchAllCities()
        .then(result => {
          this.cities = result.data
          feedbackStore.fetchDataFromServerInProgress = false
        })
    },

    getLocationsByCity(city: string): Array<LocationApiModel> {
      return this.locations.filter(location => location.city.name == city)
    }
  },
})