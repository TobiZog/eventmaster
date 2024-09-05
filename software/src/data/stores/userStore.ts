import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../enums/themeEnums";

export const useUserStore = defineStore('user', {
  state: () => ({
    theme: useLocalStorage<ThemeEnum>("hackmycart/userStore/theme", ThemeEnum.DARKRED)
  })
})