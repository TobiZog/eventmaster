import { defineStore } from "pinia";
import { ref } from "vue";
import { BandApiModel } from "../data/models/acts/bandApiModel";
import { fetchAllBands, fetchBandByName } from "../data/api/bandApi";
import { BandDetailsApiModel } from "../data/models/acts/bandDetailsApiModel";
import { GenreModel } from "@/data/models/acts/genreModel";
import { fetchAllGenres } from "@/data/api/genreApi";

export const useBandStore = defineStore("bandStore", {
  state: () => ({
    /** All available bands */
    bands: ref<Array<BandApiModel>>([]),

    /** All information about a single band */
    band: ref<BandDetailsApiModel>(new BandDetailsApiModel()),

    /** Genres to filter bands for */
    filteredGenres: ref<Array<GenreModel>>([]),

    /** All available genres from server */
    availableGenres: ref<Array<GenreModel>>([]),
    
    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Get all bands from server
     */
    async getBands() {
      this.fetchInProgress = true

      await fetchAllBands()
        .then(result => {
          this.bands = result.data.filter((band: BandApiModel) => {
            if (this.filteredGenres.length == 0) {
              return true
            }

            for (let bandGenre of band.genres) {
              for (let filteredGenres of this.filteredGenres) {
                if (bandGenre.name == filteredGenres.name) {
                  return true
                }
              }
            }

            return false
          })
        })

      await fetchAllGenres()
        .then(result => {
          this.availableGenres = result.data
        })

      this.fetchInProgress = false
    },

    /**
     * Get all available data about a specific band
     * 
     * @param name Name of band
     */
    async getBand(name: string) {
      this.fetchInProgress = true

      fetchBandByName(name)
        .then(result => {
          this.band = result.data
          this.fetchInProgress = false
        })
    }
  }
})