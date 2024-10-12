import { defineStore } from "pinia";
import { ref } from "vue";
import { ConcertApiModel } from "../models/acts/concertApiModel";
import { useFeedbackStore } from "./feedbackStore";
import { fetchConcerts } from "../api/concertApi";

export const useConcertStore = defineStore("concertStore", {
  state: () => ({
    concerts: ref<Array<ConcertApiModel>>([])
  }),

  actions: {
    async getConcerts() {
      const feedbackStore = useFeedbackStore()
      feedbackStore.fetchDataFromServerInProgress = true

      await fetchConcerts()
        .then(result => {
          this.concerts = result.data
          feedbackStore.fetchDataFromServerInProgress = false
        })
    }
  }
})