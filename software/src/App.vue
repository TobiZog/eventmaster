<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { i18n } from './plugins/i18n';
import { ref, watch } from 'vue';
import vuetify from './plugins/vuetify';
import navigationItems from './components/navigationItems.vue';
import { usePreferencesStore } from './data/stores/preferencesStore';
import { useFeedbackStore } from './data/stores/feedbackStore';
import { useTourStore } from './data/stores/tourStore';

const preferencesStore = usePreferencesStore()
const tourStore = useTourStore()
const feedbackStore = useFeedbackStore()
const theme = useTheme()
const navRail = ref(vuetify.display.mobile)

theme.global.name.value = preferencesStore.theme

tourStore.fetchAllTours()

// Global watcher
watch(() => preferencesStore.language, () => {
  i18n.global.locale = preferencesStore.language
}, { immediate: true })
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="navRail = !navRail" />

      <v-app-bar-title>HackMyCart</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer :rail="navRail" permanent>
      <navigation-items v-model:nav-rail="navRail" />
    </v-navigation-drawer>

    <v-main>
      <!-- Snackbar in the top right corner for user feedback -->
      <v-snackbar
        v-model="feedbackStore.showBanner"
        timeout="3000"
        location="top right"
        :color="feedbackStore.color"
        close
      >
        <v-icon :icon="feedbackStore.icon" />
        {{ feedbackStore.title }}

        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="feedbackStore.showBanner = false"
            icon="mdi-close"
          />
        </template>
      </v-snackbar>

      <!-- Here changes the router the content -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
