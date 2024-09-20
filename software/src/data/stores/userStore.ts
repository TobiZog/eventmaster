import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../enums/themeEnums";
import { LanguageEnum } from "../enums/languageEnum";
import { AccountModel } from "../models/accountModel";
import { loginAccount, registerAccount, updateAccount } from "../api/accountApi";
import { useFeedbackStore } from "./feedbackStore";
import { BannerStateEnum } from "../enums/bannerStateEnum";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    theme: useLocalStorage<ThemeEnum>("hackmycart/userStore/theme", ThemeEnum.DARKRED),
    language: useLocalStorage<LanguageEnum>("hackmycart/userStore/language", LanguageEnum.GERMAN),
    userAccount: useLocalStorage<AccountModel>("hackmycart/userStore/userAccount", new AccountModel()),
    loggedIn: useLocalStorage<Boolean>("hackmycart/userStore/loggedIn", false)
  }),

  actions: {
    async login(username: string, password: string) {
      const feedbackStore = useFeedbackStore()

      await loginAccount(username, password)
        .then(result => {
          this.userAccount = result.data.account
          this.loggedIn = true

          feedbackStore.changeBanner(BannerStateEnum.ACCOUNTLOGINSUCCESSFUL)
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