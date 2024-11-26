import { defineStore } from "pinia";
import { ref } from "vue";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { Composer } from 'vue-i18n';

/**
 * Logic of the bubble notifications
 * Includes an i18n object for translation
 * Includes a variable for redirecting to 404 page
 */
export const useFeedbackStore = defineStore("feedbackStore", {
  state: () => ({
    snackbars: ref<Array<{text: string, color: string, icon: string }>>([]),

    /** Show notification banner in top right corner */
    showSnackbar: ref(false),

    /** Programmatically access to language translation module */
    $i18n: {},

    /** Band, Location or concert on URL does not exist, redirect to 404 page */
    notFound: ref(false)
  }),

  getters: {
    i18n(): Composer {
      return this.$i18n.global as Composer
    }
  },

  actions: {
    addSnackbar(bannerState: BannerStateEnum) {
      this.snackbars.push({
        text: this.getSnackbarText(bannerState),
        color: this.getSnackbarColor(bannerState),
        icon: this.getSnackbarIcon(bannerState)
      })

      this.showSnackbar = true
    },

    getSnackbarText(bannerState: BannerStateEnum) {
      switch (bannerState) {
        ////////// System feedback //////////

        case BannerStateEnum.ERROR:
          return this.i18n.t('bannerMessages.error')

        case BannerStateEnum.BASKETTICKETADDED:
          return this.i18n.t('bannerMessages.basketTicketAdded')

        case BannerStateEnum.BASKETTICKETREMOVED:
          return this.i18n.t("bannerMessages.basketTicketRemoved")


        ////////// Exercise feedback //////////

        case BannerStateEnum.EXERCISESOLVED01: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [0, 1])
        

        case BannerStateEnum.EXERCISESOLVED02: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [0, 2])

        case BannerStateEnum.EXERCISESOLVED03:
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [0, 3])
        

        case BannerStateEnum.EXERCISESOLVED11: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [1, 1])
        

        case BannerStateEnum.EXERCISESOLVED12: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [1, 2])
        

        case BannerStateEnum.EXERCISESOLVED21: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 1])
        

        case BannerStateEnum.EXERCISESOLVED22: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 2])
        

        case BannerStateEnum.EXERCISESOLVED23: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 3])

        case BannerStateEnum.EXERCISESOLVED24: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 4])

        case BannerStateEnum.EXERCISESOLVED25: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 5])
        

        case BannerStateEnum.EXERCISESOLVED31: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [3, 1])
        

        case BannerStateEnum.EXERCISESOLVED32: 
          return this.i18n.t("bannerMessages.exerciseSolvedNr", [3, 2])
        


        ////////// API Endpoint /api //////////

        case BannerStateEnum.DATABASERESETSUCCESSFUL:
          return this.i18n.t('bannerMessages.databaseResetSuccessful')

        case BannerStateEnum.EXERCISEPROGRESSRESETSUCCESSFUL:
          return this.i18n.t('bannerMessages.exerciseProgressResetSuccessful')


        ////////// API Endpoint /accounts //////////

        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL: 
          return this.i18n.t('bannerMessages.loginSuccessful')

        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN: 
          return this.i18n.t('bannerMessages.wrongLogin')

        case BannerStateEnum.ACCOUNTLOGINERROR: 
          return this.i18n.t('bannerMessages.error')

        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL: 
          return this.i18n.t("bannerMessages.registerSuccessful")

        case BannerStateEnum.ACCOUNTREGISTERERROR:
          return this.i18n.t("bannerMessages.registerSuccessful")

        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEORMAILINUSE: 
          return this.i18n.t("bannerMessages.usernameOrMailInUse")

        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL: 
          return this.i18n.t("bannerMessages.accountUpdated")

        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL: 
          return this.i18n.t('bannerMessages.logoutSuccessful')
        
        case BannerStateEnum.ACCOUNTPASSWORDTOOSHORT:
          return this.i18n.t('bannerMessages.accountPasswordTooShort')

        case BannerStateEnum.ACCOUNTUSERNAMETOOSHORT:
          return this.i18n.t('bannerMessages.accountUsernameTooShort')

        case BannerStateEnum.ACCOUNTMAILADDRESSUNVALID:
          return this.i18n.t('bannerMessages.accountMailAddressUnvalid')
        

        ////////// API Endpoint /orders //////////

        case BannerStateEnum.ORDERPLACESUCCESSFUL: 
          return this.i18n.t('bannerMessages.orderPlaceSuccessfull')
        

        ////////// API Endpoint /bands //////////

        case BannerStateEnum.BANDDELETEERROR: 
          return this.i18n.t('bannerMessages.bandDeleteError')
        
        case BannerStateEnum.BANDDELETESUCCESSFUL: 
          return this.i18n.t('bannerMessages.bandDeleteSuccessful')

        case BannerStateEnum.BANDSAVEDERROR: 
          return this.i18n.t('bannerMessages.bandSavedError')

        case BannerStateEnum.BANDSAVEDSUCCESSFUL: 
          return this.i18n.t('bannerMessages.bandSavedSuccessful')
        

        ////////// API Endpoint /genres //////////

        case BannerStateEnum.GENREDELETEERROR: 
          return this.i18n.t('bannerMessages.genreDeleteError')

        case BannerStateEnum.GENREDELETESUCCESSFUL: 
          return this.i18n.t('bannerMessages.genreDeleteSuccessful')
        
        case BannerStateEnum.GENRESAVEDERROR: 
          return this.i18n.t('bannerMessages.genreSavedError')

        case BannerStateEnum.GENRESAVEDSUCCESSFUL: 
          return this.i18n.t('bannerMessages.genreSavedSuccessful')
      }
    },

    getSnackbarColor(bannerState: BannerStateEnum) {
      switch (bannerState) {
        case BannerStateEnum.ERROR:
        case BannerStateEnum.ACCOUNTLOGINERROR:
        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN:
        case BannerStateEnum.ACCOUNTREGISTERERROR:
        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEORMAILINUSE:
        case BannerStateEnum.ACCOUNTPASSWORDTOOSHORT:
        case BannerStateEnum.ACCOUNTUSERNAMETOOSHORT:
        case BannerStateEnum.ACCOUNTMAILADDRESSUNVALID:
        case BannerStateEnum.BANDDELETEERROR:
        case BannerStateEnum.BANDSAVEDERROR:
        case BannerStateEnum.GENREDELETEERROR:
        case BannerStateEnum.GENRESAVEDERROR:
          return "red"
        
        case BannerStateEnum.BASKETTICKETADDED:
        case BannerStateEnum.DATABASERESETSUCCESSFUL:
        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL:
        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL:
        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL:
        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL:
        case BannerStateEnum.ORDERPLACESUCCESSFUL:
        case BannerStateEnum.BANDDELETESUCCESSFUL:
        case BannerStateEnum.BANDSAVEDSUCCESSFUL:
        case BannerStateEnum.EXERCISEPROGRESSRESETSUCCESSFUL:
        case BannerStateEnum.GENREDELETESUCCESSFUL:
        case BannerStateEnum.GENRESAVEDSUCCESSFUL:
          return "green"

        case BannerStateEnum.EXERCISESOLVED01:
        case BannerStateEnum.EXERCISESOLVED02:
        case BannerStateEnum.EXERCISESOLVED03:
        case BannerStateEnum.EXERCISESOLVED11:
        case BannerStateEnum.EXERCISESOLVED12:
        case BannerStateEnum.EXERCISESOLVED21:
        case BannerStateEnum.EXERCISESOLVED22:
        case BannerStateEnum.EXERCISESOLVED23:
        case BannerStateEnum.EXERCISESOLVED24:
        case BannerStateEnum.EXERCISESOLVED25:
        case BannerStateEnum.EXERCISESOLVED31:
        case BannerStateEnum.EXERCISESOLVED32:
          return "purple"

        case BannerStateEnum.BASKETTICKETREMOVED:
          return "blue"
      }
    },


    getSnackbarIcon(bannerState: BannerStateEnum) {
      switch (bannerState) {
        case BannerStateEnum.ERROR:
          return "mdi-alert-circle"

        case BannerStateEnum.ACCOUNTLOGINERROR:
        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN:
        case BannerStateEnum.ACCOUNTREGISTERERROR:
        case BannerStateEnum.ACCOUNTPASSWORDTOOSHORT:
        case BannerStateEnum.ACCOUNTUSERNAMETOOSHORT:
        case BannerStateEnum.ACCOUNTMAILADDRESSUNVALID:
        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEORMAILINUSE:
          return "mdi-account"

        case BannerStateEnum.EXERCISESOLVED01:
        case BannerStateEnum.EXERCISESOLVED02:
        case BannerStateEnum.EXERCISESOLVED03:
        case BannerStateEnum.EXERCISESOLVED11:
        case BannerStateEnum.EXERCISESOLVED12:
        case BannerStateEnum.EXERCISESOLVED21:
        case BannerStateEnum.EXERCISESOLVED22:
        case BannerStateEnum.EXERCISESOLVED23:
        case BannerStateEnum.EXERCISESOLVED24:
        case BannerStateEnum.EXERCISESOLVED25:
        case BannerStateEnum.EXERCISESOLVED31:
        case BannerStateEnum.EXERCISESOLVED32:
          return "mdi-check-circle-outline"
      
        case BannerStateEnum.DATABASERESETSUCCESSFUL:
        case BannerStateEnum.EXERCISEPROGRESSRESETSUCCESSFUL:
          return "mdi-database-refresh"
        
        case BannerStateEnum.BASKETTICKETADDED:
        case BannerStateEnum.BASKETTICKETREMOVED:
          return "mdi-basket"

        case BannerStateEnum.ORDERPLACESUCCESSFUL:
          return "mdi-basket-check"

        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL:
          return "mdi-logout"

        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL:
          return "mdi-login"

        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL:
          return "mdi-account-plus"
        
        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL:
          return "mdi-account-reactivate"

        case BannerStateEnum.BANDDELETEERROR:
        case BannerStateEnum.BANDDELETESUCCESSFUL:
        case BannerStateEnum.BANDSAVEDERROR:
        case BannerStateEnum.BANDSAVEDSUCCESSFUL:
          return "mdi-guitar-electric"

        case BannerStateEnum.GENREDELETEERROR:
        case BannerStateEnum.GENREDELETESUCCESSFUL:
        case BannerStateEnum.GENRESAVEDERROR:
        case BannerStateEnum.GENRESAVEDSUCCESSFUL:
          return "mdi-music-clef-treble"
      }
    }
  }
})