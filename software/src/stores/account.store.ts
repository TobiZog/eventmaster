import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { AccountModel } from "../data/models/user/accountModel";
import { OrderModel } from "../data/models/ordering/orderModel";
import { useFeedbackStore } from "./feedbackStore";
import { loginAccount, registerAccount, updateAccount } from "../data/api/accountApi";
import { getUserOrders } from "../data/api/orderApi";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { AddressModel } from "../data/models/user/addressModel";
import { PaymentModel } from "../data/models/user/paymentModel";
import { AccountApiModel } from "../data/models/user/accountApiModel";
import { ref } from "vue";
import { OrderApiModel } from "@/data/models/ordering/orderApiModel";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    /** Useraccount which is currently logged in */
    userAccount: useLocalStorage("hackmycart/accountStore/userAccount", new AccountApiModel()),

    /** All orders of the user */
    orders: ref<Array<OrderApiModel>>([])
  }),

  actions: {
    /**
     * Start the login process
     * 
     * @param username Account username
     * @param password Account password
     */
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

    /**
     * Register a new account to the database
     * 
     * @param userAccount New account dataset
     */
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

    /**
     * Get all orders from current user
     */
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

    /**
     * Remove an address from the user model
     * 
     * @param address Address dataset to remove
     */
    removeAddress(address: AddressModel) {
      this.userAccount.addresses = this.userAccount.addresses.filter((addr: AddressModel) => 
        addr != address
      )
    },

    /**
     * Remove an payment from the user model
     * 
     * @param address Payment dataset to remove
     */
    removePayment(payment: PaymentModel) {
      this.userAccount.payments = this.userAccount.payments.filter((paym: PaymentModel) =>
        paym != payment
      )
    }
  }
})