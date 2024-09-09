import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ProductModel } from "../models/productModel";
import { calcProductPrice } from "@/scripts/productScripts";

export const useBasketStore = defineStore('basket', {
  state: () => ({
    productsInBasket: useLocalStorage<Array<ProductModel>>("hackmycart/basketStore/productsInBasket", [])
  }),

  getters: {
    getTotalPrice() {
      let result = 0

      for (let product of this.productsInBasket) {
        result += calcProductPrice(product)
      }

      return result
    }
  },

  actions: {
    removeProductFromBasket(product: ProductModel) {
      this.productsInBasket = this.productsInBasket.filter((p: ProductModel) => 
        p.id != product.id
      )
    }
  }
})
