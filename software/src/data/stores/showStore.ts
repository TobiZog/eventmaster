import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { TourModel } from "../models/tourModel";
import { getAllTours } from "../api/tourApi";
import { GenreModel } from "../models/genreModel";
import { getAllBands } from "../api/bandApi";
import { BandModel } from "../models/bandModel";
import { LocationModel } from "../models/locationModel";
import { getAllLocations } from "../api/locationApi";
import { getAllGenres } from "../api/genreApi";
import { CityModel } from "../models/cityModel";
import { getAllCities } from "../api/cityApi";

export const useShowStore = defineStore("showStore", {
  state: () => ({
    tours: useLocalStorage<Array<TourModel>>("hackmycart/showStore/tours", []),
    bands: useLocalStorage<Array<BandModel>>("hackmycart/showStore/bands", []),
    locations: useLocalStorage<Array<LocationModel>>("hackmycart/showStore/locations", []),
    cities: useLocalStorage<Array<CityModel>>("hackmycart/showStore/cities", []),
    genres: useLocalStorage<Array<GenreModel>>("hackmycart/showStore/genres", [])
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

      await getAllGenres()
        .then(result => {
          this.genres = result.data
        })

      await getAllCities()
        .then(result => {
          this.cities = result.data
        })
    }
  }
})