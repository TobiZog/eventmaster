import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { AccountModel } from "../models/accountModel";
import { OrderModel } from "../models/orderModel";
import { useFeedbackStore } from "./feedbackStore";
import { loginAccount, registerAccount, updateAccount } from "../api/accountApi";
import { getUserOrders } from "../api/orderApi";
import { BannerStateEnum } from "../enums/bannerStateEnum";

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
          this.loggedIn = true

          feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINSUCCESSFUL)

          await getUserOrders(result.data.id)
            .then(result => {
              this.orders = result.data
            })
        })
        .catch(error => {
          this.loggedIn = false

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
    }
  }
})