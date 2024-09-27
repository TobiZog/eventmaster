<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { i18n } from './plugins/i18n';
import { watch } from 'vue';
import navigationAppendItems from './components/navigation/navigationAppendItems.vue';
import navigationPrependItems from './components/navigation/navigationPrependItems.vue';
import { usePreferencesStore } from './data/stores/preferencesStore';
import { useFeedbackStore } from './data/stores/feedbackStore';
import { useTourStore } from './data/stores/tourStore';

const preferencesStore = usePreferencesStore()
const tourStore = useTourStore()
const feedbackStore = useFeedbackStore()

const theme = useTheme()

theme.global.name.value = preferencesStore.theme

tourStore.fetchAllTours()

// Global watcher
watch(() => preferencesStore.language, () => {
  i18n.global.locale = preferencesStore.language
}, { immediate: true })
</script>

<template>
  <v-app>
    <v-app-bar
      height="80"
      color="primary" 
      class="px-5"
    >
      <template #prepend>
        <navigation-prepend-items />
      </template>

      <template #append>
        <navigation-append-items />
      </template>
    </v-app-bar>


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
      <v-container max-width="1200">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
