import { defineStore } from "pinia";
import { ref } from "vue";
import { BandApiModel } from "../data/models/acts/bandApiModel";
import { fetchAllBands, fetchBandByName } from "../data/api/bandApi";
import { BandDetailsApiModel } from "../data/models/acts/bandDetailsApiModel";

export const useBandStore = defineStore("bandStore", {
  state: () => ({
    /** All available bands */
    bands: ref<Array<BandApiModel>>([]),

    /** All information about a single band */
    band: ref<BandDetailsApiModel>(new BandDetailsApiModel()),
    
    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    async getBands() {
      this.fetchInProgress = true

      fetchAllBands()
        .then(result => {
          this.bands = result.data
          this.fetchInProgress = false
        })
    },

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