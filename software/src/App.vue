<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from './data/stores/userStore';
import { i18n } from './plugins/i18n';
import { ref } from 'vue';
import vuetify from './plugins/vuetify';
import navigationItems from './components/navigationItems.vue';
import { useProductStore } from './data/stores/productStore';

const userStore = useUserStore()
const productStore = useProductStore()
const theme = useTheme()
const navRail = ref(vuetify.display.mobile)

theme.global.name.value = userStore.theme
i18n.global.locale = userStore.language

productStore.fetchAllProducts()
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
