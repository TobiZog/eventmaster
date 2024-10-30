import { defineStore } from "pinia";
import { ref } from "vue";
import { BandApiModel } from "../data/models/acts/bandApiModel";
import { fetchAllBands, fetchBandByName, patchBand, postBand } from "../data/api/bandApi";
import { BandDetailsApiModel } from "../data/models/acts/bandDetailsApiModel";
import { useFeedbackStore } from "./feedback.store";
import { BannerStateEnum } from "@/data/enums/bannerStateEnum";
import { useGenreStore } from "./genre.store";

export const useBandStore = defineStore("bandStore", {
  state: () => ({
    /** All available bands */
    bands: ref<Array<BandApiModel>>([]),

    /** All information about a single band */
    band: ref<BandDetailsApiModel>(new BandDetailsApiModel()),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    /** Show or hide the edit dialog for edit a band */
    showEditDialog: ref(false)
  }),

  actions: {
    /**
     * Get all bands from server
     */
    async getBands() {
      const genreStore = useGenreStore()
      this.fetchInProgress = true

      await fetchAllBands()
        .then(result => {
          this.bands = result.data.filter((band: BandApiModel) => {
            if (genreStore.filteredGenres.length == 0) {
              return true
            }

            for (let bandGenre of band.genres) {
              for (let filteredGenres of genreStore.filteredGenres) {
                if (bandGenre.name == filteredGenres.name) {
                  return true
                }
              }
            }

            return false
          })
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

      await fetchBandByName(name)
        .then(result => {
          this.band = result.data
          this.fetchInProgress = false
        })
    },

    /**
     * Prepare edit dialog for new band, opens it
     */
    newBand() {
      this.band = new BandDetailsApiModel()
      this.showEditDialog = true
    },

    
    /**
     * Edit a band. Fetch all information about the band, opens the edit dialog
     * 
     * @param name Name of band to edit
     */
    async editBand(name: string) {
      await this.getBand(name)
      
      this.showEditDialog = true
    },

    /**
     * Save band in this store to the database
     */
    saveBand() {
      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      if (this.band.id == undefined) {
        postBand(this.band)
          .then(result => {
            if (result.status == 200) {
              feedbackStore.changeBanner(BannerStateEnum.BANDSAVEDSUCCESSFUL)

              this.getBands()
              this.showEditDialog = false
            } else {
              feedbackStore.changeBanner(BannerStateEnum.BANDSAVEDERROR)
            }
          })
      } else {
        patchBand(this.band)
          .then(result => {
            if (result.status == 200) {
              feedbackStore.changeBanner(BannerStateEnum.BANDSAVEDSUCCESSFUL)

              this.getBands()
              this.showEditDialog = false
            } else {
              feedbackStore.changeBanner(BannerStateEnum.BANDSAVEDERROR)
            }
          })
      }
    },

    /**
     * Delete a band by it's identifier
     * 
     * @param id Id of the band in the database
     */
    deleteBand(id: number) {
      // todo
    }
  }
})