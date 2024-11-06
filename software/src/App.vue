<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { i18n } from './plugins/i18n';
import { watch } from 'vue';
import navigationAppendItems from './components/navigation/navigationAppendItems.vue';
import navigationPrependItems from './components/navigation/navigationPrependItems.vue';
import { usePreferencesStore } from './stores/preferences.store';
import { useFeedbackStore } from './stores/feedback.store';
import companyFooter from './components/navigation/companyFooter.vue';
import urlBar from './components/navigation/urlBar.vue';
import { useRouter } from 'vue-router';
import actionDialog from './components/basics/actionDialog.vue';
import CircularProgressIndeterminate from './components/basics/circularProgressIndeterminate.vue';

const preferencesStore = usePreferencesStore()
const feedbackStore = useFeedbackStore()
const theme = useTheme()
const router = useRouter()

theme.global.name.value = preferencesStore.theme


// First startup
if (preferencesStore.firstStartup) {
  preferencesStore.firstStartupRoutine()
}


// Global watcher
watch(() => preferencesStore.language, () => {
  i18n.global.locale = preferencesStore.language
}, { immediate: true })

watch(() => feedbackStore.notFound, () => {
  if (feedbackStore.notFound) {
    feedbackStore.notFound = false
    router.push("/404")
  }
})
</script>

<template>
  <v-app>
    <!-- Browser Navigation bar replica -->
    <url-bar />
    
    <!-- Navigaion bar of page -->
    <v-app-bar
      height="80"
      color="primary" 
      class="px-5"
      elevation="0"
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
      <v-container max-width="1400" min-height="1000" class="py-0" height="100%">
        <v-sheet color="sheet" height="100%">
          <router-view></router-view>
        </v-sheet>
      </v-container>

      <company-footer />
    </v-main>
  </v-app>

  <action-dialog
    v-model="preferencesStore.firstStartup"
    :title="$t('misc.firstStartup.title')"
    persistent
    max-width="600"
  >
    <v-row>
      <v-col>
        {{ $t('misc.firstStartup.description') }}
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center pa-8">
        <circular-progress-indeterminate />
      </v-col>
    </v-row>
  </action-dialog>
</template>