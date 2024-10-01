import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { TourModel } from "../models/acts/tourModel";
import { getAllTours } from "../api/tourApi";
import { GenreModel } from "../models/acts/genreModel";
import { getAllBands } from "../api/bandApi";
import { BandModel } from "../models/acts/bandModel";
import { LocationModel } from "../models/locations/locationModel";
import { getAllLocations } from "../api/locationApi";
import { getAllGenres } from "../api/genreApi";
import { CityModel } from "../models/locations/cityModel";
import { getAllCities } from "../api/cityApi";

export const useConcertStore = defineStore("concertStore", {
  state: () => ({
    tours: useLocalStorage<Array<TourModel>>("hackmycart/concertStore/tours", []),
    filteredTours: useLocalStorage<Array<TourModel>>("hackmycart/concertStore/filteredTours", []),
    bands: useLocalStorage<Array<BandModel>>("hackmycart/concertStore/bands", []),
    locations: useLocalStorage<Array<LocationModel>>("hackmycart/concertStore/locations", []),
    filteredLocations: useLocalStorage<Array<LocationModel>>("hackmycart/concertStore/filteredLocations", []),
    cities: useLocalStorage<Array<CityModel>>("hackmycart/concertStore/cities", []),
    genres: useLocalStorage<Array<GenreModel>>("hackmycart/concertStore/genres", []),
    cityFilter: useLocalStorage<CityModel>("hackmycart/concertStore/cityFilter", new CityModel()),
    locationFilter: useLocalStorage<LocationModel>("hackmycart/concertStore/locationFilter", new LocationModel),
    genreFilter: useLocalStorage<GenreModel>("hackmycart/concertStore/genreFilter", new GenreModel())
  }),
  
  actions: {
    async fetchAllTours() {
      await getAllTours()
        .then(result => {
          this.tours = result.data

          this.tours.sort((a, b) => {
            return new Date(a.concerts[0].date) < new Date(b.concerts[0].date) ? -1 : 1
          })

          this.filteredTours = this.tours

          this.filterTours()
        })

      await getAllBands()
        .then(result => {
          this.bands = result.data
        })

      await getAllLocations() 
        .then(result => {
          console.log(result.data)
          this.locations = result.data
        })

      await getAllGenres()
        .then(result => {
          this.genres = result.data

          this.genres.sort((a, b) => {
            return a.name > b.name
          })
        })

      await getAllCities()
        .then(result => {
          this.cities = result.data
        })
    },

    filterTours() {
      this.filteredTours = []

      // Filter tours by city, location and genre
      for (let tour of this.tours) {
        let rightGenre = false
        let rightCity = false
        let rightLocation = false
        
        // Genre filter
        if (this.genreFilter == null || this.genreFilter.id == undefined) {
          rightGenre = true
        } else {
          for (let genre of tour.band.genres) {
            if (genre.name == this.genreFilter.name) {
              rightGenre = true
            }
          }
        }

        // City filter
        if (this.cityFilter == null || this.cityFilter.id == undefined) {
          rightCity = true
        } else {
          for (let concert of tour.concerts) {
            if (concert.location.city.name == this.cityFilter.name) {
              rightCity = true
            }
          }

          // Filter locations by city
          this.filteredLocations = this.cities.find(city =>
            city.id == this.cityFilter.id
          ).locations
        }


        // Location filter
        if (this.locationFilter == null || this.locationFilter.id == undefined) {
          rightLocation = true
        } else {
          for (let concert of tour.concerts) {
            if (concert.location.id == this.locationFilter.id) {
              rightLocation = true
            }
          }
        }

        if (rightGenre && rightCity && rightLocation) {
          this.filteredTours.push(tour)
        }
      }
    }
  }
})