import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchAllLocations, fetchLocationByName, fetchTopLocations } from "../data/api/locationApi";
import { LocationApiModel } from "../data/models/locations/locationApiModel";
import { CityModel } from "../data/models/locations/cityModel";
import { fetchAllCities } from "../data/api/cityApi";
import { LocationDetailsApiModel } from "@/data/models/locations/locationDetailsApiModel";
import { useFeedbackStore } from "./feedback.store";

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    /** All available locations */
    locations: ref<Array<LocationApiModel>>([]),

    /** Locations with the most concerts */
    topLocations: ref<Array<LocationApiModel>>([]),

    /** Enhanced data about a specific location */
    location: ref<LocationDetailsApiModel>(new LocationDetailsApiModel()),

    /** All available cities */
    cities: ref<Array<CityModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    showEditLocation: ref(false)
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

    getLocationByName(name: string) {
      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      fetchLocationByName(name)
        .then(result => {
          this.location = result.data
          this.fetchInProgress = false
        })
        .catch(res => {
          feedbackStore.notFound = true
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


    /**
     * Fetch top 8 locations from server
     */
    async getTopLocations() {
      this.fetchInProgress = true

      await fetchTopLocations(8)
        .then(result => {
          this.topLocations = result.data
          this.fetchInProgress = false
        })
    },


    newLocation() {
      this.location = new LocationDetailsApiModel()
      this.showEditLocation = true
    },

    editLocation(item: LocationApiModel) {
      this.location = item
      this.showEditLocation = true
    },

    async deleteLocation(item: LocationApiModel) {
      // todo
    }
  },
})