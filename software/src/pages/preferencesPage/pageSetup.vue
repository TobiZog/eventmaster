<script setup lang="ts">
import { ThemeEnum } from '@/data/enums/themeEnums';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from '@/data/stores/userStore';
import { LanguageEnum } from '@/data/enums/languageEnum';

const userStore = useUserStore()
const theme = useTheme()
const themeEnums = Object.values(ThemeEnum)
const languages = Object.values(LanguageEnum)

function changeTheme() {
  theme.global.name.value = userStore.theme
}

function changeLanguage() {
  // todo
}
</script>

<template>
  <v-card title="Page Setup" prepend-icon="mdi-view-dashboard" elevation="8">
    <v-container>
      <v-row>
        <v-col>
          <v-select v-model="userStore.theme" :items="themeEnums" label="Selected theme" @update:model-value="changeTheme" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select v-model="userStore.language" :items="languages" label="Sprache" @update:model-value="changeLanguage" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>