import { defineStore } from "pinia";
import { ref } from "vue";
import { BannerStateEnum } from "../enums/bannerStateEnum";
import { Composer } from 'vue-i18n';

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
      switch (bannerState) {
        case BannerStateEnum.ERROR: {
          this.title = this.i18n.t('bannerMessages.error'); break;
        }
        case BannerStateEnum.DATABASERESETSUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.databaseResetSuccessful'); break;
        }
        case BannerStateEnum.LOGINSUCCESSFUL: {
          this.title = this.i18n.t('bannerMessages.loginSuccessful'); break;
        }
        case BannerStateEnum.WRONGLOGIN: {
          this.title = this.i18n.t('bannerMessages.wrongLogin'); break;
        }
        case BannerStateEnum.REGISTERSUCCESSFUL: {
          this.title = this.i18n.t("bannerMessages.registerSuccessful"); break;
        }
        case BannerStateEnum.USERNAMEINUSE: {
          this.title = this.i18n.t("bannerMessages.usernameInUse"); break;
        }
      }

      switch (bannerState) {
        case BannerStateEnum.ERROR:
        case BannerStateEnum.WRONGLOGIN:
        case BannerStateEnum.USERNAMEINUSE:
          this.color = "red"
          this.icon = "mdi-alert-circle"
          break;
        
        case BannerStateEnum.DATABASERESETSUCCESSFUL:
        case BannerStateEnum.LOGINSUCCESSFUL:
        case BannerStateEnum.REGISTERSUCCESSFUL:
          this.color = "green"
          this.icon = "mdi-check-circle"
          break
      }

      this.showBanner = true
    }
  }
})