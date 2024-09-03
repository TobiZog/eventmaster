<script setup>
import { ref } from 'vue';

const showDrawer = ref(true)
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer"/>

      <v-app-bar-title>HackMyCart</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="showDrawer">
      <!-- todo -->
    </v-navigation-drawer>

    <v-main>
      <!-- todo -->
    </v-main>
  </v-app>
</template>
