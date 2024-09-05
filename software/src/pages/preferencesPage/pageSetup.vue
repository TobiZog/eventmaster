<script setup lang="ts">
import { ThemeEnum } from '@/data/enums/themeEnums';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from '@/data/stores/userStore';

const userStore = useUserStore()
const theme = useTheme()
const themeEnums = Object.values(ThemeEnum)

function changeTheme() {
  theme.global.name.value = userStore.theme
}
</script>

<template>
  <v-card title="Page Setup" prepend-icon="mdi-view-dashboard">
    <v-container>
      <v-row>
        <v-col>
          <v-select v-model="userStore.theme" :items="themeEnums" label="Selected theme" @update:model-value="changeTheme" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>