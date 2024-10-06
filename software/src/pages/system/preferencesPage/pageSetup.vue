<script setup lang="ts">
import { ThemeEnum } from '@/data/enums/themeEnums';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { i18n } from '@/plugins/i18n';
import cardView from '@/components/basics/cardView.vue';
import { usePreferencesStore } from '@/data/stores/preferencesStore';

const preferencesStore = usePreferencesStore()
const theme = useTheme()
const themeEnums = Object.values(ThemeEnum)

function changeTheme() {
  theme.global.name.value = preferencesStore.theme
}

function changeLanguage() {
  i18n.global.locale = preferencesStore.language
}
</script>

<template>
  <card-view :title="$t('preferences.pageSetup')" prepend-icon="mdi-view-dashboard" elevation="8">
    <v-row>
      <v-col>
        <v-select
          v-model="preferencesStore.theme"
          :items="themeEnums"
          :label="$t('preferences.selectedTheme')"
          @update:model-value="changeTheme"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-select v-model="preferencesStore.language" :items="$i18n.availableLocales" :label="$t('preferences.language')"
        @update:model-value="changeLanguage"
      />
      </v-col>
    </v-row>
  </card-view>
</template>