<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { i18n } from './plugins/i18n';
import { ref, watch } from 'vue';
import { usePreferencesStore } from './stores/preferences.store';
import { useFeedbackStore } from './stores/feedback.store';
import companyFooter from './components/navigation/companyFooter.vue';
import urlBar from './components/navigation/urlBar.vue';
import { useRouter } from 'vue-router';
import NavigationBar from './components/navigation/navigationBar.vue';
import { BannerStateEnum } from './data/enums/bannerStateEnum';

const preferencesStore = usePreferencesStore()
const feedbackStore = useFeedbackStore()
const theme = useTheme()
const router = useRouter()

theme.global.name.value = preferencesStore.theme

// Global watcher
// Watch for language change
watch(() => preferencesStore.language, () => {
  i18n.global.locale = preferencesStore.language
}, { immediate: true })

// Watch for theme change
watch(() => preferencesStore.theme, () => {
  theme.global.name.value = preferencesStore.theme
})

// Watch for 404 page directions
watch(() => feedbackStore.notFound, () => {
  if (feedbackStore.notFound) {
    feedbackStore.notFound = false
    router.push("/404")
  }
})

// Watch for snackbar disappear
watch(() => feedbackStore.showSnackbar, () => {
  if (!feedbackStore.showSnackbar) {
    feedbackStore.snackbars = []
  }
})

function calcMargin(i) {
  return (i * 60) + 10 + 'px'
}
</script>

<template>
  <v-app>
    <!-- Browser Navigation bar replica -->
    <url-bar />
    
    <!-- Navigaion bar of page -->
    <navigation-bar />


    <v-main>
      <!-- Snackbar in the top right corner for user feedback -->
      <v-snackbar
        v-for="(s, i) in feedbackStore.snackbars"
        v-model="feedbackStore.showSnackbar"
        :key="i"
        timeout="3000"
        location="top right"
        :color="s.color"
        :style="{ 'margin-top': calcMargin(i) }"
        :icon="s.icon"
        close
      >
        <v-icon :icon="s.icon" />
        {{ s.text }}
      </v-snackbar>

      <!-- Here changes the router the content -->
      <v-container max-width="1400" min-height="1000" class="py-0" height="100%">
        <v-sheet color="sheet" height="100%">
          <router-view></router-view>
        </v-sheet>

      </v-container>

      <v-btn
        fab
        dark
        fixed
        bottom
        right
        color="primary"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>

      <company-footer />
    </v-main>
  </v-app>

  <!-- Test Environment sticker in bottom right corner -->
  <v-sheet
    color="error"
    position="fixed" 
    location="bottom right" 
    class="pa-3 mb-12 mr-n16 text-center text-h5"
    width="300"
    style="rotate: 315deg; z-index: 1008;"
  >
    {{ $t('misc.testEnvironment') }}
  </v-sheet>
</template>