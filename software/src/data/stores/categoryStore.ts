import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { CategoryModel } from "../models/categoryModel";
import { getAllCategories } from "../api/categoryApi";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: useLocalStorage<Array<CategoryModel>>("hackmycart/categoryStore/categories", [])
  }),

  actions: {
    async fetchAllCategories() {
      await getAllCategories()
        .then(categories => {
          this.categories = categories.data
        })
    },

    getProductById(id: number): CategoryModel {
      return this.categories.find(category => 
        category.id === id
      )
    }
  }
})