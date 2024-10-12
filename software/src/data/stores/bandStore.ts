import { defineStore } from "pinia";
import { ref } from "vue";
import { BandApiModel } from "../models/acts/bandApiModel";
import { fetchAllBands, getBand } from "../api/bandApi";
import { BandDetailsApiModel } from "../models/acts/bandDetailsApiModel";

export const useBandStore = defineStore("bandStore", {
  state: () => ({
    bands: ref<Array<BandApiModel>>([]),
    band: ref<BandDetailsApiModel>(new BandDetailsApiModel()),
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

      getBand(name)
        .then(result => {
          this.band = result.data
          this.fetchInProgress = false
        })
    } 
  }
})