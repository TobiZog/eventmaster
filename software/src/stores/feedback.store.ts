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
          this.title = this.i18n.t('bannerMessages.basketProductAdded'); break;
        }

        case BannerStateEnum.BASKETPRODUCTREMOVED: {
          this.title = this.i18n.t("bannerMessages.basketProductRemoved"); break;
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


        ////////// API Endpoint /categories //////////

        case BannerStateEnum.CATEGORYCREATESUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.categoryCreateSuccessful'); break;
        }

        case BannerStateEnum.CATEGORYDELETESUCESSFUL: {
          this.title = this.i18n.t('bannerMessages.categoryDeleteSuccessful'); break;
        }

        case BannerStateEnum.CATEGORYCREATEERROR: {
          this.title = this.i18n.t('bannerMessages.categoryCreateError'); break;
        }

        case BannerStateEnum.CATEGORYDELETEERROR: {
          this.title = this.i18n.t('bannerMessages.categoryDeleteError'); break;
        }


        ////////// API Endpoint /orders //////////

        case BannerStateEnum.ORDERPLACESUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.orderPlaceSuccessfull'); break;
        }


        ////////// API Endpoint /products //////////

        case BannerStateEnum.PRODUCTCREATESUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.productCreateSuccessful'); break;
        }

        case BannerStateEnum.PRODUCTCREATEERROR: {
          this.title = this.i18n.t('bannerMessages.productCreateError'); break;
        }

        case BannerStateEnum.PRODUCTDELETESUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.productDeleteSuccessful'); break;
        }

        case BannerStateEnum.PRODUCTDELETEERROR: {
          this.title = this.i18n.t('bannerMessages.productDeleteError'); break;
        }
      }


      // Banner color

      switch (bannerState) {
        case BannerStateEnum.ERROR:
        case BannerStateEnum.ACCOUNTLOGINERROR:
        case BannerStateEnum.ACCOUNTLOGINWRONGLOGIN:
        case BannerStateEnum.ACCOUNTREGISTERERROR:
        case BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE:
        case BannerStateEnum.CATEGORYCREATEERROR:
        case BannerStateEnum.CATEGORYDELETEERROR:
        case BannerStateEnum.PRODUCTDELETESUCCESSFUL:
        case BannerStateEnum.PRODUCTDELETEERROR:
          this.color = "red"
          break;
        
        case BannerStateEnum.BASKETPRODUCTADDED:
        case BannerStateEnum.DATABASERESETSUCCESSFUL:
        case BannerStateEnum.ACCOUNTLOGINSUCCESSFUL:
        case BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL:
        case BannerStateEnum.ACCOUNTUPDATESUCCESSFUL:
        case BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL:
        case BannerStateEnum.CATEGORYCREATESUCCESSFUL:
        case BannerStateEnum.CATEGORYDELETESUCESSFUL:
        case BannerStateEnum.ORDERPLACESUCCESSFUL:
        case BannerStateEnum.PRODUCTCREATESUCCESSFUL:
        case BannerStateEnum.PRODUCTCREATEERROR:
          this.color = "green"
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

        case BannerStateEnum.CATEGORYCREATEERROR:
        case BannerStateEnum.CATEGORYDELETEERROR:
        case BannerStateEnum.CATEGORYCREATESUCCESSFUL:
        case BannerStateEnum.CATEGORYDELETESUCESSFUL:
          this.icon = "mdi-label"
          break;

        case BannerStateEnum.PRODUCTDELETESUCCESSFUL:
        case BannerStateEnum.PRODUCTDELETEERROR:
        case BannerStateEnum.PRODUCTCREATESUCCESSFUL:
        case BannerStateEnum.PRODUCTCREATEERROR:
          this.icon = "mdi-store"
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
      }

      this.showBanner = true
    }
  }
})