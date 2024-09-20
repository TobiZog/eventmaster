import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { calcProductPrice } from "@/scripts/productScripts";
import { BasketItemModel } from "../models/basketItemModel";
import { useFeedbackStore } from "./feedbackStore";
import { BannerStateEnum } from "../enums/bannerStateEnum";

export const useBasketStore = defineStore('basket', {
  state: () => ({
    itemsInBasket: useLocalStorage<Array<BasketItemModel>>("hackmycart/basketStore/productsInBasket", [])
  }),

  getters: {
    getTotalPrice() {
      let result = 0

      for (let item of this.itemsInBasket) {
        result += calcProductPrice(item, item.quantity)
      }

      return Math.round(result * 100) / 100
    }
  },

  actions: {
    removeItemFromBasket(item: BasketItemModel) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.changeBanner(BannerStateEnum.BASKETPRODUCTREMOVED)

      this.itemsInBasket = this.itemsInBasket.filter((basketItemModel: BasketItemModel) => 
        basketItemModel.productId != item.productId
      )
    },

    addItemToBasket(item: BasketItemModel) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.changeBanner(BannerStateEnum.BASKETPRODUCTADDED)

      // Product is already in the basket, increase number of items
      if (this.itemsInBasket.find((basketItem) => basketItem.productId == item.productId)) {
        this.itemsInBasket.find((basketItem) => basketItem.productId == item.productId).quantity += item.quantity
      } else {
        this.itemsInBasket.push(item)
      }
    }
  }
})
