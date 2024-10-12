import { defineStore } from "pinia";
import { ref } from "vue";
import { ConcertApiModel } from "../models/acts/concertApiModel";
import { fetchConcert, fetchConcerts, fetchUpcomingConcerts } from "../api/concertApi";
import { ConcertDetailsApiModel } from "../models/acts/concertDetailsApiModel";

export const useConcertStore = defineStore("concertStore", {
  state: () => ({
    concerts: ref<Array<ConcertApiModel>>([]),
    upcomingConcerts: ref<Array<ConcertApiModel>>([]),
    concert: ref<ConcertDetailsApiModel>(new ConcertDetailsApiModel()),
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Download all concerts from server
     */
    async getConcerts() {
      this.fetchInProgress = true

      fetchConcerts()
        .then(result => {
          this.concerts = result.data
          this.fetchInProgress = false
        })
    },

    async getConcert(id: number) {
      this.fetchInProgress = true

      fetchConcert(id)
        .then(result => {
          this.concert = result.data
          this.fetchInProgress = false
        })
    },

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