<script setup lang="ts">
import { ThemeEnum } from '@/data/enums/themeEnums';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from '@/data/stores/userStore';
import { i18n } from '@/plugins/i18n';

const userStore = useUserStore()
const theme = useTheme()
const themeEnums = Object.values(ThemeEnum)

function changeTheme() {
  theme.global.name.value = userStore.theme
}

function changeLanguage() {
  i18n.global.locale = userStore.language
}
</script>

<template>
  <v-card :title="$t('preferences.pageSetup')" prepend-icon="mdi-view-dashboard" elevation="8">
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="userStore.theme"
            :items="themeEnums"
            :label="$t('preferences.selectedTheme')"
            @update:model-value="changeTheme"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select v-model="userStore.language" :items="$i18n.availableLocales" :label="$t('preferences.language')"
          @update:model-value="changeLanguage"
        />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>