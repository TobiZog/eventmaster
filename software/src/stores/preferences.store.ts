import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../data/enums/themeEnums";
import { LanguageEnum } from "../data/enums/languageEnum";
import { ref } from "vue";

export const usePreferencesStore = defineStore('preferencesStore', {
  state: () => ({
    /** Selected theme by user */
    theme: useLocalStorage<ThemeEnum>("hackmycart/preferencesStore/theme", ThemeEnum.DARKBLUE),

    /** Selected language by user */
    language: useLocalStorage<LanguageEnum>("hackmycart/preferencesStore/language", LanguageEnum.GERMAN),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),
})