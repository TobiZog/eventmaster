import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../enums/themeEnums";
import { LanguageEnum } from "../enums/languageEnum";

export const usePreferencesStore = defineStore('preferencesStore', {
  state: () => ({
    theme: useLocalStorage<ThemeEnum>("hackmycart/preferencesStore/theme", ThemeEnum.DARKRED),
    language: useLocalStorage<LanguageEnum>("hackmycart/preferencesStore/language", LanguageEnum.GERMAN)
  }),
})