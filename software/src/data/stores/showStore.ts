import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { TourModel } from "../models/tourModel";
import { getAllTours } from "../api/tourApi";
import { GenreModel } from "../models/genreModel";
import { getAllBands } from "../api/bandApi";
import { BandModel } from "../models/bandModel";
import { LocationModel } from "../models/locationModel";
import { getAllLocations } from "../api/locationApi";

export const useShowStore = defineStore("showStore", {
  state: () => ({
    tours: useLocalStorage<Array<TourModel>>("hackmycart/showStore/tours", []),
    bands: useLocalStorage<Array<BandModel>>("hackmycart/showStore/bands", []),
    locations: useLocalStorage<Array<LocationModel>>("hackmycart/showStore/locations", [])
  }),
  
  actions: {
    async fetchAllTours() {
      await getAllTours()
        .then(result => {
          this.tours = result.data
        })

      await getAllBands()
        .then(result => {
          this.bands = result.data
        })

      await getAllLocations() 
        .then(result => {
          this.locations = result.data
        })
    }
  }
})