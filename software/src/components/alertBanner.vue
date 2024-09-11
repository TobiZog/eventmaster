<script setup lang="ts">
import { BannerStateEnum } from '@/data/enums/bannerStateEnum';
import BannerModel from '@/data/models/bannerModel';
import { getBannerMessage } from '@/scripts/contentScripts';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n()
const alertBanner = defineModel("alertBanner", { required: true, type: BannerModel })

const title = ref("")
const color = ref("")
const icon = ref("")

function refreshBanner() {
  switch (alertBanner.value.bannerState) {
    case BannerStateEnum.ERROR: {
      title.value = i18n.t('bannerMessages.error'); break;
    }
    case BannerStateEnum.DATABASERESETSUCCESSFUL: {
      title.value = i18n.t('bannerMessages.databaseResetSuccessful'); break;
    }
    case BannerStateEnum.LOGINSUCCESSFUL: {
      title.value = i18n.t('bannerMessages.loginSuccessful'); break;
    }
    case BannerStateEnum.WRONGLOGIN: {
      title.value = i18n.t('bannerMessages.wrongLogin'); break;
    }
  }

  switch (alertBanner.value.bannerState) {
    case BannerStateEnum.ERROR:
    case BannerStateEnum.WRONGLOGIN:
      color.value = "red"
      icon.value = "mdi-alert-circle"
      break;
    
    case BannerStateEnum.DATABASERESETSUCCESSFUL:
    case BannerStateEnum.LOGINSUCCESSFUL:
      color.value = "green"
      icon.value = "mdi-check-circle"
      break
  }
}

watch(() => alertBanner.value.bannerState, () => {
  refreshBanner()
})

refreshBanner()
</script>

<template>
  <v-expand-transition>
    <v-row v-if="alertBanner.show">
      <v-col>
        <v-alert v-model="alertBanner.show" :color="color" :icon="icon" closable>
          {{ title }}
        </v-alert>
      </v-col>
    </v-row>
  </v-expand-transition>
</template>