import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { calcPrice } from "@/scripts/productScripts";
import { BasketItemModel } from "../models/basketItemModel";
import { useFeedbackStore } from "./feedbackStore";
import { BannerStateEnum } from "../enums/bannerStateEnum";
import { addOrder } from "../api/orderApi";
import { useAccountStore } from "./accountStore";
import { ProductModel } from "../models/productModel";
import { useProductStore } from "./productStore";
import { AddressModel } from "../models/addressModel";
import { PaymentModel } from "../models/paymentModel";

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    itemsInBasket: useLocalStorage<Array<BasketItemModel>>("hackmycart/basketStore/productsInBasket", []),
    usedAddress: useLocalStorage("hackmycart/basketStore/usedAddress", new AddressModel()),
    usedPayment: useLocalStorage("hackmycart/basketStore/usedPayment", new PaymentModel())
  }),

  getters: {
    /**
     * Calculate price of all items in the basket with discount
     * 
     * @returns Total price of basket
     */
    getTotalPrice() {
      let result = 0

      for (let item of this.itemsInBasket) {
        result += calcPrice(item.product.price, item.product.discount, item.quantity)
      }

      return Math.round(result * 100) / 100
    }
  },

  actions: {
    /**
     * Remove an item from the basket
     * 
     * @param item Item to remove
     */
    removeItemFromBasket(item: BasketItemModel) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.changeBanner(BannerStateEnum.BASKETPRODUCTREMOVED)

      this.itemsInBasket = this.itemsInBasket.filter((basketItemModel: BasketItemModel) => 
        basketItemModel.product.id != item.product.id
      )
    },

    /**
     * Add an item to the basket. If the product is already in the basket, the quantity will increase
     * 
     * @param product Product to add
     * @param quantity Quantity of the product
     */
    addItemToBasket(product: ProductModel, quantity: number) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.changeBanner(BannerStateEnum.BASKETPRODUCTADDED)

      // Product is already in the basket, increase number of items
      if (this.itemsInBasket.find((basketItem: BasketItemModel) => 
        basketItem.product.id == product.id))
      {
        this.itemsInBasket.find((basketItem: BasketItemModel) => 
          basketItem.product.id == product.id).quantity += quantity
      } else {
        this.itemsInBasket.push(new BasketItemModel(quantity, product))
      }
    },

    /**
     * Take an order to the server. Sends all articles in the basket and creates an order entry in the backend database
     */
    async takeOrder() {
      const accountStore = useAccountStore()
      const productStore = useProductStore()
      const feedbackStore = useFeedbackStore()

      await addOrder(accountStore.userAccount.id, this.itemsInBasket, this.usedPayment.id, this.usedAddress.id)
        .then(async result => {
          if (result.status == 201) {
            await accountStore.refreshOrders()
            await productStore.fetchAllProducts()

            this.itemsInBasket = []
            feedbackStore.changeBanner(BannerStateEnum.ORDERPLACESUCCESSFUL)
          } else {
            feedbackStore.changeBanner(BannerStateEnum.ERROR)
          }
        })
    }
  }
})
