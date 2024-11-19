<script setup lang="ts">
import { ThemeEnum } from '@/data/enums/themeEnums';
import cardView from '@/components/basics/cardView.vue';
import { usePreferencesStore } from '@/stores/preferences.store';

const preferencesStore = usePreferencesStore()
const themeEnums = Object.values(ThemeEnum)
</script>

<template>
  <card-view
    :title="$t('preferences.pageSetup')"
    icon="mdi-view-dashboard"
  >
    <v-row>
      <v-col>
        <v-select
          v-model="preferencesStore.theme"
          :items="themeEnums"
          :label="$t('preferences.selectedTheme')"
          variant="outlined"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-select
          v-model="preferencesStore.language"
          :items="$i18n.availableLocales" 
          :label="$t('preferences.language')"
          variant="outlined"
          hide-details
        />
      </v-col>
    </v-row>
  </card-view>
</template>