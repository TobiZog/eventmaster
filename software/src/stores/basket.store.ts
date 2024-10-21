import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { BasketItemModel } from "../data/models/ordering/basketItemModel";
import { useFeedbackStore } from "./feedbackStore";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { AddressModel } from "../data/models/user/addressModel";
import { PaymentModel } from "../data/models/user/paymentModel";
import { ref } from "vue";
import { SelectedSeatModel } from "../data/models/ordering/selectedSeatModel";
import { calcPrice } from "@/scripts/concertScripts";
import { BandModel } from "../data/models/acts/bandModel";
import { ConcertModel } from "../data/models/acts/concertModel";
import { useAccountStore } from "./account.store";
import { createOrder } from "@/data/api/orderApi";

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    itemsInBasket: useLocalStorage<Array<BasketItemModel>>("hackmycart/basketStore/productsInBasket", []),
    usedAddress: useLocalStorage("hackmycart/basketStore/usedAddress", new AddressModel()),
    usedPayment: useLocalStorage("hackmycart/basketStore/usedPayment", new PaymentModel()),
    selectedSeats: ref<Array<SelectedSeatModel>>([])
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
        result += calcPrice(item.price, item.seats.length)
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
        basketItemModel.concert.id != item.concert.id
      )
    },

    moveSeatSelectionsToBasket(concert: ConcertModel, band: BandModel) {
      for (let selectedSeat of this.selectedSeats) {
        let itemInBasket: BasketItemModel = this.itemsInBasket.find((basketItem: BasketItemModel) => {
          return basketItem.concert.id == selectedSeat.concert.id
        })

        if (itemInBasket != undefined) {
          itemInBasket.seats.push(selectedSeat.seat)
        } else {
          this.itemsInBasket.push(
            new BasketItemModel(
              selectedSeat.concert,
              band,
              selectedSeat.seat,
              selectedSeat.concert.price
            )
          )
        }
      }

      this.selectedSeats = []
    },

    /**
     * Take an order to the server. Sends all articles in the basket and creates an order entry in the backend database
     */
    async takeOrder() {
      const accountStore = useAccountStore()
      const feedbackStore = useFeedbackStore()

      await createOrder(accountStore.userAccount.id, this.itemsInBasket, this.usedPayment.id, this.usedAddress.id)
        .then(async result => {
          if (result.status == 201) {
            await accountStore.refreshOrders()

            this.itemsInBasket = []
            feedbackStore.changeBanner(BannerStateEnum.ORDERPLACESUCCESSFUL)
          } else {
            feedbackStore.changeBanner(BannerStateEnum.ERROR)
          }
        })
    }
  }
})
