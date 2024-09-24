import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { calcProductPrice } from "@/scripts/productScripts";
import { BasketItemModel } from "../models/basketItemModel";
import { useFeedbackStore } from "./feedbackStore";
import { BannerStateEnum } from "../enums/bannerStateEnum";
import { addOrder } from "../api/orderApi";
import { useAccountStore } from "./accountStore";

export const useBasketStore = defineStore('basketStore', {
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
        basketItemModel.product.id != item.product.id
      )
    },

    addItemToBasket(item: BasketItemModel) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.changeBanner(BannerStateEnum.BASKETPRODUCTADDED)

      // Product is already in the basket, increase number of items
      if (this.itemsInBasket.find((basketItem) => basketItem.productId == item.product.id)) {
        this.itemsInBasket.find((basketItem) => 
          basketItem.productId == item.product.id).quantity += item.quantity
      } else {
        this.itemsInBasket.push(item)
      }
    },

    takeOrder() {
      const accountStore = useAccountStore()
// 
      // const order = new OrderModel()
      // order.accountId = userStore.userAccount.id
      // order.orderItem = this.itemsInBasket
// 
      // console.log(order)

      addOrder(accountStore.userAccount.id, this.itemsInBasket)
    }
  }
})
