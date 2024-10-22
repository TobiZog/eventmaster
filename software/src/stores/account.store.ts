import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { AccountModel } from "../data/models/user/accountModel";
import { OrderModel } from "../data/models/ordering/orderModel";
import { useFeedbackStore } from "./feedback.store";
import { loginAccount, registerAccount, updateAccount } from "../data/api/accountApi";
import { fetchUserOrders } from "../data/api/orderApi";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { AddressModel } from "../data/models/user/addressModel";
import { PaymentModel } from "../data/models/user/paymentModel";
import { AccountApiModel } from "../data/models/user/accountApiModel";
import { ref } from "vue";
import { OrderApiModel } from "@/data/models/apiEndpoints/orderApiModel";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    /** Useraccount which is currently logged in */
    userAccount: useLocalStorage("hackmycart/accountStore/userAccount", new AccountApiModel()),

    /** User input on login screen */
    loginData: ref<{ username: String, password: String}>(
      { username: "duranduran", password: "H4nn0ver" }
    ),

    /** */
    registerData: ref<AccountModel>(new AccountModel()),

    /** All orders of the user */
    orders: ref<Array<OrderApiModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Start the login process
     * 
     * @returns True on success
     */
    async login(): Promise<boolean> {
      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      // Validate
      if (this.loginData.username == null || this.loginData.username.length == 0 ||
        this.loginData.password == null || this.loginData.password.length == 0
      ) {
        feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINWRONGLOGIN)
        this.fetchInProgress = false
        return false
      }
      else
      {
        await loginAccount(this.loginData.username, this.loginData.password)
        .then(async result => {
          this.userAccount = result.data

          feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINSUCCESSFUL)

          this.fetchInProgress = false
          return true
        })
        .catch(error => {
          if (error.status == 400) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINERROR)
          } else if (error.status == 401) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINWRONGLOGIN)
          }

          this.fetchInProgress = false
          return false
        })
      }
    },

    /**
     * Register a new account to the database
     * Log in on success
     * 
     * @returns True on success
     */
    async registerAccount(): Promise<boolean> {
      const feedbackStore = useFeedbackStore()
      this.fetchInProgress = true

      await registerAccount(this.registerData)
        .then(async res => {
          if (res.status == 201) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL)
          }

          this.loginData = {
            username: this.registerData.username,
            password: this.registerData.password
          }

          await this.login()
            .then(result => {
              this.fetchInProgress = false
              return true
            })
        })
        .catch((error) => {
          if (error.status == 400) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTREGISTERERROR)
          } else if (error.status == 409) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE)
          }

          this.fetchInProgress = false
          return false
        })

        return false
    },

    /**
     * Update values of an existing account on server
     */
    async updateAccount() {
      const feedbackStore = useFeedbackStore()

      await updateAccount(this.userAccount)
        .then(res => {
          if (res.status == 200) {
            feedbackStore.changeBanner(BannerStateEnum.ACCOUNTUPDATESUCCESSFUL)
          }
        })
    },

    /**
     * Logout user
     */
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
      this.fetchInProgress = true

      await fetchUserOrders(this.userAccount.id)
        .then(result => {
          this.orders = result.data
          this.fetchInProgress = false
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