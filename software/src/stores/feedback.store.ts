import { defineStore } from "pinia";
import { ref } from "vue";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { Composer } from 'vue-i18n';

/**
 * Logic of the bubble notifications
 * Includes an i18n object for translation
 */
export const useFeedbackStore = defineStore("feedbackStore", {
  state: () => ({
    showBanner: ref(false),
    title: ref(""),
    color: ref(""),
    icon: ref(""),
    $i18n: {}
  }),

  getters: {
    i18n(): Composer {
      return this.$i18n.global as Composer
    }
  },

  actions: {
    changeBanner(bannerState: BannerStateEnum) {
      // Banner message
      switch (bannerState) {
        ////////// System feedback //////////

        case BannerStateEnum.ERROR: {
          this.title = this.i18n.t('bannerMessages.error'); break;
        }

        case BannerStateEnum.BASKETPRODUCTADDED: {
          this.title = this.i18n.t('bannerMessages.basketTicketAdded'); break;
        }

        case BannerStateEnum.BASKETPRODUCTREMOVED: {
          this.title = this.i18n.t("bannerMessages.basketTicketRemoved"); break;
        }


        ////////// Exercise feedback //////////

        case BannerStateEnum.EXERCISESOLVED01: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [0, 1]); break;
        }

        case BannerStateEnum.EXERCISESOLVED02: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [0, 2]); break;
        }

        case BannerStateEnum.EXERCISESOLVED11: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [1, 1]); break;
        }

        case BannerStateEnum.EXERCISESOLVED12: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [1, 2]); break;
        }

        case BannerStateEnum.EXERCISESOLVED13: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [1, 3]); break;
        }

        case BannerStateEnum.EXERCISESOLVED21: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 1]); break;
        }

        case BannerStateEnum.EXERCISESOLVED22: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 2]); break;
        }

        case BannerStateEnum.EXERCISESOLVED23: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [2, 3]); break;
        }

        case BannerStateEnum.EXERCISESOLVED31: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [3, 1]); break;
        }

        case BannerStateEnum.EXERCISESOLVED32: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [3, 2]); break;
        }

        case BannerStateEnum.EXERCISESOLVED33: {
          this.title = this.i18n.t("bannerMessages.exerciseSolvedNr", [3, 3]); break;
        }


        ////////// API Endpoint /api //////////

        case BannerStateEnum.DATABASERESETSUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.databaseResetSuccessful'); break;
        }


        ////////// API Endpoint /accounts //////////

        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.loginSuccessful'); break;
        }

        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN: {
          this.title = this.i18n.t('bannerMessages.wrongLogin'); break;
        }

        case BannerStateEnum.ACCOUNTLOGINERROR: {
          this.title = this.i18n.t('bannerMessages.error'); break;
        }

        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL: {
          this.title = this.i18n.t("bannerMessages.registerSuccessful"); break;
        }

        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE: {
          this.title = this.i18n.t("bannerMessages.usernameInUse"); break;
        }

        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL: {
          this.title = this.i18n.t("bannerMessages.accountUpdated"); break;
        }

        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.logoutSuccessful'); break;
        }


        ////////// API Endpoint /orders //////////

        case BannerStateEnum.ORDERPLACESUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.orderPlaceSuccessfull'); break;
        }


        ////////// API Endpoint /bands //////////

        case BannerStateEnum.BANDDELETEERROR: {
          this.title = this.i18n.t('bannerMessages.bandDeleteError'); break;
        }

        case BannerStateEnum.BANDDELETESUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.bandDeleteSuccessful'); break;
        }

        case BannerStateEnum.BANDSAVEDERROR: {
          this.title = this.i18n.t('bannerMessages.bandSavedError'); break;
        }

        case BannerStateEnum.BANDSAVEDSUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.bandSavedSuccessful'); break;
        }
      }


      // Banner color

      switch (bannerState) {
        case BannerStateEnum.ERROR:
        case BannerStateEnum.ACCOUNTLOGINERROR:
        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN:
        case BannerStateEnum.ACCOUNTREGISTERERROR:
        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE:
        case BannerStateEnum.BANDDELETEERROR:
        case BannerStateEnum.BANDSAVEDERROR:
          this.color = "red"
          break;
        
        case BannerStateEnum.BASKETPRODUCTADDED:
        case BannerStateEnum.DATABASERESETSUCCESSFUL:
        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL:
        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL:
        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL:
        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL:
        case BannerStateEnum.ORDERPLACESUCCESSFUL:
        case BannerStateEnum.BANDDELETESUCCESSFUL:
        case BannerStateEnum.BANDSAVEDSUCCESSFUL:
        case BannerStateEnum.EXERCISEPROGRESSRESETSUCCESSFUL:
          this.color = "green"
          break;

        case BannerStateEnum.EXERCISESOLVED01:
        case BannerStateEnum.EXERCISESOLVED02:
        case BannerStateEnum.EXERCISESOLVED11:
        case BannerStateEnum.EXERCISESOLVED12:
        case BannerStateEnum.EXERCISESOLVED13:
        case BannerStateEnum.EXERCISESOLVED21:
        case BannerStateEnum.EXERCISESOLVED22:
        case BannerStateEnum.EXERCISESOLVED23:
        case BannerStateEnum.EXERCISESOLVED31:
        case BannerStateEnum.EXERCISESOLVED32:
        case BannerStateEnum.EXERCISESOLVED33:
          this.color = "purple"
          break;

        case BannerStateEnum.BASKETPRODUCTREMOVED:
          this.color = "blue"
      }


      // Banner icon

      switch (bannerState) {
        case BannerStateEnum.ERROR:
          this.icon = "mdi-alert-circle"
          break;

        case BannerStateEnum.ACCOUNTLOGINERROR:
        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN:
        case BannerStateEnum.ACCOUNTREGISTERERROR:
        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE:
          this.icon = "mdi-account"
          break;

        case BannerStateEnum.EXERCISESOLVED01:
        case BannerStateEnum.EXERCISESOLVED02:
        case BannerStateEnum.EXERCISESOLVED11:
        case BannerStateEnum.EXERCISESOLVED12:
        case BannerStateEnum.EXERCISESOLVED13:
        case BannerStateEnum.EXERCISESOLVED21:
        case BannerStateEnum.EXERCISESOLVED22:
        case BannerStateEnum.EXERCISESOLVED23:
        case BannerStateEnum.EXERCISESOLVED31:
        case BannerStateEnum.EXERCISESOLVED32:
        case BannerStateEnum.EXERCISESOLVED33:
          this.icon = "mdi-check-circle-outline"
          break;
        
      
        case BannerStateEnum.DATABASERESETSUCCESSFUL:
          this.icon = "mdi-database-refresh"
          break;
        
        case BannerStateEnum.BASKETPRODUCTADDED:
        case BannerStateEnum.BASKETPRODUCTREMOVED:
          this.icon = "mdi-basket"
          break;

        case BannerStateEnum.ORDERPLACESUCCESSFUL:
          this.icon = "mdi-basket-check"
          break;

        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL:
          this.icon = "mdi-logout"
          break;

        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL:
          this.icon = "mdi-login"
          break;

        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL:
          this.icon = "mdi-account-plus"
          break;
        
        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL:
          this.icon = "mdi-account-reactivate"
          break;

        case BannerStateEnum.BANDDELETEERROR:
        case BannerStateEnum.BANDDELETESUCCESSFUL:
        case BannerStateEnum.BANDSAVEDERROR:
        case BannerStateEnum.BANDSAVEDSUCCESSFUL:
          this.icon = "mdi-guitar-electric"
          break;
      }

      this.showBanner = true
    }
  }
})