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

export const useConcertStore = defineStore("concertStore", {
  state: () => ({
    tours: useLocalStorage<Array<TourModel>>("hackmycart/concertStore/tours", []),
    bands: useLocalStorage<Array<BandModel>>("hackmycart/concertStore/bands", []),
    locations: useLocalStorage<Array<LocationModel>>("hackmycart/concertStore/locations", []),
    cities: useLocalStorage<Array<CityModel>>("hackmycart/concertStore/cities", []),
    genres: useLocalStorage<Array<GenreModel>>("hackmycart/concertStore/genres", [])
  }),
  
  actions: {
    async fetchAllTours() {
      await getAllTours()
        .then(result => {
          this.tours = result.data

          this.tours.sort((a, b) => {
            return new Date(a.shows[0].date) < new Date(b.shows[0].date) ? -1 : 1
          })
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