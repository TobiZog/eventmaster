import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { AccountModel } from "../models/accountModel";
import { OrderModel } from "../models/orderModel";
import { useFeedbackStore } from "./feedbackStore";
import { loginAccount, registerAccount, updateAccount } from "../api/accountApi";
import { getUserOrders } from "../api/orderApi";
import { BannerStateEnum } from "../enums/bannerStateEnum";
import { AddressModel } from "../models/addressModel";
import { PaymentModel } from "../models/paymentModel";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    userAccount: useLocalStorage("hackmycart/accountStore/userAccount", new AccountModel()),
    orders: useLocalStorage<Array<OrderModel>>("hackmycart/accountStore/orders", [ new OrderModel() ])
  }),

  actions: {
    async login(username: string, password: string) {
      const feedbackStore = useFeedbackStore()

      await loginAccount(username, password)
        .then(async result => {
          this.userAccount = result.data

          feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINSUCCESSFUL)

          this.refreshOrders()
        })
        .catch(error => {
          if (error.status == 400) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINERROR)
          } else if (error.status == 401) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINWRONGLOGIN)
          }
        })
    },

    async registerAccount(userAccount: AccountModel) {
      const feedbackStore = useFeedbackStore()

      await registerAccount(userAccount)
        .then(res => {
          if (res.status == 201) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL)
          }
        })
        .catch((error) => {
          if (error.status == 400) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTREGISTERERROR)
          } else if (error.status == 409) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE)
          }
        })
    },

    async updateAccount() {
      const feedbackStore = useFeedbackStore()

      await updateAccount(this.userAccount)
        .then(res => {
          if (res.status == 200) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTUPDATESUCCESSFUL)
          }
        })
    },

    logout() {
      const feedbackStore = useFeedbackStore()

      this.userAccount = new AccountModel()
      this.loggedIn = false
      
      feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL)
    },

    async refreshOrders() {
      await getUserOrders(this.userAccount.id)
        .then(result => {
          this.orders = result.data
        })
    },

    getOrderTotalPrice(orderId: number) {
      let totalPrice = 0
      let order: OrderModel = this.orders.find((order: OrderModel) => order.id == orderId)
      
      // for (let item of order.orderItems) {
      //   totalPrice += calcPrice(item.orderPrice, 0, item.quantity)
      // }

      return Math.round(totalPrice * 100) / 100
    },

    removeAddress(address: AddressModel) {
      this.userAccount.addresses = this.userAccount.addresses.filter((addr: AddressModel) => 
        addr != address
      )
    },

    removePayment(payment: PaymentModel) {
      this.userAccount.payments = this.userAccount.payments.filter((paym: PaymentModel) =>
        paym != payment
      )
    }
  }
})