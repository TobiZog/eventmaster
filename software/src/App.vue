<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { i18n } from './plugins/i18n';
import { ref, watch } from 'vue';
import vuetify from './plugins/vuetify';
import navigationItems from './components/navigationItems.vue';
import { useProductStore } from './data/stores/productStore';
import { useCategoryStore } from './data/stores/categoryStore';
import { usePreferencesStore } from './data/stores/preferencesStore';

const preferencesStore = usePreferencesStore()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const theme = useTheme()
const navRail = ref(vuetify.display.mobile)

theme.global.name.value = preferencesStore.theme

productStore.fetchAllProducts()
categoryStore.fetchAllCategories()

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
      <!-- Here changes the router the content -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
