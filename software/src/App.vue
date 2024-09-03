<script setup>
import { ref } from 'vue';
import axios from 'axios';

const showDrawer = ref(true)
const testResponse = ref("")


axios.get('http://127.0.0.1:3000/api')
  .then(function (response) {
    console.log(response)
    testResponse.value = response.data
  })
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
      {{ testResponse }}
      <!-- todo -->
    </v-main>
  </v-app>
</template>
