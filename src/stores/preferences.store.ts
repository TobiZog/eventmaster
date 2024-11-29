import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ThemeEnum } from "../data/enums/themeEnums";
import { LanguageEnum } from "../data/enums/languageEnum";
import { ref } from "vue";
import { fetchServerState,resetDatabase, resetExerciseProgress } from "@/data/api/mainApi";
import { ServerStateEnum } from "@/data/enums/serverStateEnum";
import { BannerStateEnum } from "@/data/enums/bannerStateEnum";
import { useFeedbackStore } from "./feedback.store";
import { useBasketStore } from "./basket.store";
import { useExerciseStore } from "./exercise.store";
import { useAccountStore } from "./account.store";
import { AccountApiModel } from "@/data/models/user/accountApiModel";

export const usePreferencesStore = defineStore('preferencesStore', {
  state: () => ({
    /** Selected theme by user */
    theme: useLocalStorage<ThemeEnum>("eventMaster/preferencesStore/theme", ThemeEnum.DARK),

    /** Selected language by user */
    language: useLocalStorage<LanguageEnum>("eventMaster/preferencesStore/language", LanguageEnum.GERMAN),

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

    /** Marks the first run of the app */
    firstStartup: useLocalStorage<Boolean>("eventMaster/preferencesStore/firstStartup", true),

    /** Full name of student */
    studentName: useLocalStorage<string>("eventMaster/preferencesStore/studentName", ""),

    /** Matrikel number */
    registrationNumber: useLocalStorage<string>("eventMaster/preferencesStore/registrationNumber", "")
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
      const accountStore = useAccountStore()

      this.serverState = ServerStateEnum.PENDING
      this.fetchInProgress = true

      // Logout user
      accountStore.logout()

      await resetDatabase()
        .then(result => {
          if (result.status == 200) {
            feedbackStore.addSnackbar(BannerStateEnum.DATABASERESETSUCCESSFUL)
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
      const exerciseStore = useExerciseStore()

      this.serverState = ServerStateEnum.PENDING
      this.fetchInProgress = true

      await resetExerciseProgress()
        .then(result => {
          if (result.status == 200) {
            feedbackStore.addSnackbar(BannerStateEnum.EXERCISEPROGRESSRESETSUCCESSFUL)
            this.serverState = ServerStateEnum.ONLINE

            exerciseStore.getAllExercises()
          }

          this.fetchInProgress = false
          this.showDeleteExerciseDialog = false
        })
    },

    /**
     * Reset all store values to factory state
     */
    resetToFactorySettings() {
      const basketStore = useBasketStore()
      const accountStore = useAccountStore()

      this.firstStartup = true
      this.studentName = ""
      this.registrationNumber = ""
      this.theme = "dark"
      this.language = LanguageEnum.GERMAN
      basketStore.itemsInBasket = []
      accountStore.userAccountToken = ""
      accountStore.userAccount = new AccountApiModel()


      
      this.showFactoryResetDialog = false
    }
  }
})