import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchAllLocations, fetchTopLocations } from "../data/api/locationApi";
import { LocationApiModel } from "../data/models/locations/locationApiModel";
import { CityModel } from "../data/models/locations/cityModel";
import { fetchAllCities } from "../data/api/cityApi";

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    locations: ref<Array<LocationApiModel>>([]),
    topLocations: ref<Array<LocationApiModel>>([]),
    cities: ref<Array<CityModel>>([]),
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Download all cities/locations from server
     */
    async getLocations() {
      this.fetchInProgress = true

      await fetchAllLocations()
        .then(result => {
          this.locations = result.data
        })

      await fetchAllCities()
        .then(result => {
          this.cities = result.data
          this.fetchInProgress = false
        })
    },

    /**
     * Get all locations in a specific city
     * 
     * @param city City to filter for
     * 
     * @returns Array of cities which are in the target city
     */
    getLocationsByCity(city: string): Array<LocationApiModel> {
      return this.locations.filter((location: LocationApiModel) => {
        return location.city.name == city
      })
    },


    async getTopLocations() {
      await fetchTopLocations(8)
        .then(result => {
          this.topLocations = result.data
        })
    }
  },
})