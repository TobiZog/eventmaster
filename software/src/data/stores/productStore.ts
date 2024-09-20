import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { getAllProducts } from "../api/productApi";
import { SortOrder } from "../enums/sortOrderEnum";
import { CategoryModel } from "../models/categoryModel";
import { ProductWithCategoryModel } from "../models/productWithCategoryModel";


export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: useLocalStorage<Array<ProductWithCategoryModel>>("hackmycart/productStore/products", []),
    filteredProducts: useLocalStorage<Array<ProductWithCategoryModel>>("hackmycart/productStore/filteredProducts", []),
    sortOrder: useLocalStorage<SortOrder>("hackmycart/productStore/sortOrder", SortOrder.NAMEATOZ),
    filteredCategory: useLocalStorage<CategoryModel>("hackmycart/productStore/filteredCategory", new CategoryModel()),
    onlyDiscounts: useLocalStorage<Boolean>("hackmycart/productStore/onlyDiscounts", false)
  }),

  actions: {
    async fetchAllProducts() {
      await getAllProducts()
        .then(products => {
          this.products = products.data
          this.filteredProducts = products.data
        })
    },

    async filterProducts() {
      if (this.filteredCategory.id == -1 || this.filteredCategory.id == 0) {
        this.filteredProducts = this.products
      } else {
        this.filteredProducts = this.products.filter((product: ProductWithCategoryModel) => 
          product.category.id == this.filteredCategory.id
        )
      }

      if (this.onlyDiscounts) {
        this.filteredProducts = this.filteredProducts.filter((product: ProductWithCategoryModel) => 
          product.discount > 0
        )
      }
    },

    sortProducts() {
      this.filteredProducts.sort((a: ProductWithCategoryModel, b: ProductWithCategoryModel) => {
        switch (this.sortOrder)
        {
          case SortOrder.PRICELOWTOHIGH: {
            return a.price - b.price
          }
          case SortOrder.PRICEHIGHTOLOW: {
            return b.price - a.price
          }
          case SortOrder.NAMEATOZ: {
            if (b.name > a.name) {
              return -1
            }
            else {
              return 1
            }
          }
          case SortOrder.NAMEZTOA: {
            if (b.name < a.name) {
              return -1
            }
            else {
              return 1
            }
          }
        }
      })
    }
  }
})