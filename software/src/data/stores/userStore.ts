import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../enums/themeEnums";
import { LanguageEnum } from "../enums/languageEnum";
import { AccountModel } from "../models/accountModel";
import { login, register } from "../api/accountApi";
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

      await login(username, password)
        .then(result => {
          if (result.data.loginSuccessful) {
            this.userAccount = result.data.account
            this.loggedIn = true

            feedbackStore.changeBanner(BannerStateEnum.LOGINSUCCESSFUL)
          }
        })
        .catch(error => {
          this.userAccount = new AccountModel()
          this.loggedIn = false

          feedbackStore.changeBanner(BannerStateEnum.WRONGLOGIN)
        })
    },

    async registerAccount(account: AccountModel) {
      const feedbackStore = useFeedbackStore()

      await register(account)
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            feedbackStore.changeBanner(BannerStateEnum.REGISTERSUCCESSFUL)
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.status == 400) {
            feedbackStore.changeBanner(BannerStateEnum.USERNAMEINUSE)
          }
        })
    },

    logout() {
      this.userAccount = new AccountModel()
      this.loggedIn = false
    }
  }
})