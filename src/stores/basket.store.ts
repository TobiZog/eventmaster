import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { BasketItemModel } from "../data/models/ordering/basketItemModel";
import { useFeedbackStore } from "./feedback.store";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { AddressModel } from "../data/models/user/addressModel";
import { PaymentModel } from "../data/models/user/paymentModel";
import { ref } from "vue";
import { SelectedSeatModel } from "../data/models/ordering/selectedSeatModel";
import { calcPrice } from "@/scripts/concertScripts";
import { BandModel } from "../data/models/acts/bandModel";
import { useAccountStore } from "./account.store";
import { createOrder } from "@/data/api/orderApi";
import { useExerciseStore } from "./exercise.store";

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    /** Items in customers basket */
    itemsInBasket: useLocalStorage<Array<BasketItemModel>>("eventMaster/basketStore/itemsInBasket", []),

    /** Address used in the order dialog */
    usedAddress: ref<AddressModel>(null),

    /** Payment method used in the order dialog */
    usedPayment: ref<PaymentModel>(null),

    /** Selected seats in the booking page */
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
      feedbackStore.addSnackbar(BannerStateEnum.BASKETTICKETREMOVED)

      this.itemsInBasket = this.itemsInBasket.filter((basketItemModel: BasketItemModel) => 
        basketItemModel.concert.id != item.concert.id
      )
    },

    /**
     * Move all selected seats from selectedSeats to itemsInBasket variable
     * 
     * @param band Band of the concert
     */
    moveSeatSelectionsToBasket(band: BandModel) {
      for (let selectedSeat of this.selectedSeats) {
        let itemInBasket: BasketItemModel = 
          this.itemsInBasket.find((basketItem: BasketItemModel) => 
        {
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
     * Take an order to the server. Sends all articles in the basket and 
     * creates an order entry in the backend database
     */
    async takeOrder() {
      const accountStore = useAccountStore()
      const feedbackStore = useFeedbackStore()
      const exerciseStore = useExerciseStore()

      await createOrder(
        this.itemsInBasket,
        this.usedPayment.id,
        this.usedAddress.id,
        accountStore.userAccountToken
      )
        .then(async result => {
          if (result.status == 201) {
            await accountStore.refreshOrders()

            feedbackStore.addSnackbar(BannerStateEnum.ORDERPLACESUCCESSFUL)

            // Exercise 0.3 is solved
            exerciseStore.solveExercise(0, 3)

            console.log(this.itemsInBasket)

            for (let item of this.itemsInBasket) {
              if (!item.concert.offered) {
                exerciseStore.solveExercise(1, 2)
              }
            }
            
            this.itemsInBasket = []
          } else {
            feedbackStore.addSnackbar(BannerStateEnum.ERROR)
          }
        })
    }
  }
})
