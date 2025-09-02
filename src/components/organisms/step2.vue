<script setup lang="ts">
import { ThemeEnum } from '@/data/enums/themeEnums';
import { usePreferencesStore } from '@/stores/preferences.store';

const preferencesStore = usePreferencesStore()

const themeEnums = Object.values(ThemeEnum)
</script>

<template>
  <v-container width="600" class="text-h4 text-center">
    <v-row>
      <v-col>
        <v-icon icon="mdi-palette" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        {{ $t('misc.firstStartup.lookAndFeel') }}
      </v-col>
    </v-row>

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
  </v-container>
</template>