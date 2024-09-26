import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { TourModel } from "../models/tourModel";
import { getAllTours } from "../api/tourApi";
import { GenreModel } from "../models/genreModel";

export const useTourStore = defineStore("tourStore", {
  state: () => ({
    tours: useLocalStorage<Array<TourModel>>("hackmycart/tourStore/tours", []),
    genres: useLocalStorage<Array<GenreModel>>("hackmycart/tourStore/genres", [])
  }),
  
  actions: {
    async fetchAllTours() {
      await getAllTours()
        .then(result => {
          this.tours = result.data
        })
    }
  }
})