import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../enums/themeEnums";
import { LanguageEnum } from "../enums/languageEnum";

export const useUserStore = defineStore('user', {
  state: () => ({
    theme: useLocalStorage<ThemeEnum>("hackmycart/userStore/theme", ThemeEnum.DARKRED),
    language: useLocalStorage<LanguageEnum>("hackmycart/userStore/language", LanguageEnum.GERMAN),
    userAccountId: useLocalStorage<number>("hackmycart/userStore/userAccountId", -1)
  })
})