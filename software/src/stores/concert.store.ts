import { defineStore } from "pinia";
import { ref } from "vue";
import { ConcertApiModel } from "../data/models/acts/concertApiModel";
import { fetchConcertById, fetchAllConcerts, fetchUpcomingConcerts } from "../data/api/concertApi";
import { ConcertDetailsApiModel } from "../data/models/acts/concertDetailsApiModel";
import { CityModel } from "@/data/models/locations/cityModel";

export const useConcertStore = defineStore("concertStore", {
  state: () => ({
    /** All available concerts */
    concerts: ref<Array<ConcertApiModel>>([]),

    /** Next upcoming concerts */
    upcomingConcerts: ref<Array<ConcertApiModel>>([]),

    /** Enhanced data about a specific concert */
    concert: ref<ConcertDetailsApiModel>(new ConcertDetailsApiModel()),

    /** Array of cities for which the concerts should be filtered */
    filteredCities: ref<Array<CityModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Download all concerts from server
     */
    async getConcerts() {
      this.fetchInProgress = true

      fetchAllConcerts()
        .then(result => {
          this.concerts = result.data.filter((concert: ConcertApiModel) => {
            if (this.filteredCities.length == 0) {
              return true
            }

            for (let city of this.filteredCities) {
              if (city.name == concert.location.city.name) {
                return true
              }
            }

            return false
          })

          this.fetchInProgress = false
        })
    },

    /**
     * Get all data about a specific concert 
     * 
     * @param id ID of the concert in the database
     */
    async getConcert(id: number) {
      this.fetchInProgress = true

      fetchConcertById(id)
        .then(result => {
          this.concert = result.data
          this.fetchInProgress = false
        })
    },

    /**
     * Download the next four upcoming concerts from server
     */
    async getUpcomingConcerts() {
      this.fetchInProgress = true

      fetchUpcomingConcerts(4)
        .then(result => {
          this.upcomingConcerts = result.data
          this.fetchInProgress = false
        })
    }
  }
})