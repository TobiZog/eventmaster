import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../data/enums/themeEnums";
import { LanguageEnum } from "../data/enums/languageEnum";
import { ref } from "vue";
import { fetchFileNames, fetchServerState, resetDatabase, resetExerciseProgress } from "@/data/api/mainApi";
import { ServerStateEnum } from "@/data/enums/serverStateEnum";
import { BannerStateEnum } from "@/data/enums/bannerStateEnum";
import { useFeedbackStore } from "./feedback.store";
import { useBasketStore } from "./basket.store";

export const usePreferencesStore = defineStore('preferencesStore', {
  state: () => ({
    /** Selected theme by user */
    theme: useLocalStorage<ThemeEnum>("hackmycart/preferencesStore/theme", ThemeEnum.DARK),

    /** Selected language by user */
    language: useLocalStorage<LanguageEnum>("hackmycart/preferencesStore/language", LanguageEnum.GERMAN),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    /** State of the server */
    serverState: ref<ServerStateEnum>(ServerStateEnum.PENDING),

    /** Show the "Delete DB?" confirm dialog */
    showDeleteDbDialog: ref(false),

    /** Show the "Delete Exercise progress?" confirm dialog */
    showDeleteExerciseDialog: ref(false),

    /** Show the "Factory reset" confirm dialog */
    showFactoryResetDialog: ref(false),

    /** List of files on the server */
    staticFiles: ref([]),

    /** Marks the first run of the app */
    firstStartup: useLocalStorage<Boolean>("hackmycart/preferencesStore/firstStartup", true),

    /** Full name of student */
    studentName: useLocalStorage<string>("hackmycart/preferencesStore/studentName", ""),

    /** Matrikel number */
    registrationNumber: useLocalStorage<string>("hackmycart/preferencesStore/registrationNumber", "")
  }),

  actions: {
    /**
     * Request the state of the backend server
     */
    async getServerState() {
      this.fetchInProgress = true

      fetchServerState()
        .then(result => {
          if (result.status == 200) {
            this.serverState = ServerStateEnum.ONLINE
          } else {
            this.serverState = ServerStateEnum.OFFLINE
          }

          this.fetchInProgress = false
        })
        .catch(error => {
          this.serverState = ServerStateEnum.OFFLINE
          this.fetchInProgress = false
        })
    },

    /**
     * Resets the database (without exercise tables)
     */
    async resetDb() {
      const feedbackStore = useFeedbackStore()
      this.serverState = ServerStateEnum.PENDING
      this.fetchInProgress = true

      await resetDatabase()
        .then(result => {
          if (result.status == 200) {
            feedbackStore.changeBanner(BannerStateEnum.DATABASERESETSUCCESSFUL)
            this.serverState = ServerStateEnum.ONLINE
          }

          this.fetchInProgress = false
          this.showDeleteDbDialog = false
        })
    },

    /**
     * Resets the exercise progress
     */
    async resetExerciseProg() {
      const feedbackStore = useFeedbackStore()
      this.serverState = ServerStateEnum.PENDING
      this.fetchInProgress = true

      await resetExerciseProgress()
        .then(result => {
          if (result.status == 200) {
            feedbackStore.changeBanner(BannerStateEnum.EXERCISEPROGRESSRESETSUCCESSFUL)
            this.serverState = ServerStateEnum.ONLINE
          }

          this.fetchInProgress = false
          this.showDeleteExerciseDialog = false
        })
    },

    async getStaticFiles() {
      this.fetchInProgress = true

      fetchFileNames()
        .then(res => {
          this.staticFiles = res.data
          this.fetchInProgress = false
        })
    },

    resetToFactorySettings() {
      const basketStore = useBasketStore()

      this.firstStartup = true
      this.studentName = ""
      this.registrationNumber = ""
      this.theme = "dark"
      this.language = LanguageEnum.GERMAN
      basketStore.itemsInBasket = []
      
      this.showFactoryResetDialog = false
    }
  }
})