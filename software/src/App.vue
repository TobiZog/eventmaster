<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from './data/stores/userStore';
import vuetify from './plugins/vuetify';

const userStore = useUserStore()
const categories = ref([])
const theme = useTheme()
const navRail = ref(vuetify.display.mobile)

theme.global.name.value = userStore.theme

function requestAllCategories() {
  axios.get('http://127.0.0.1:3000/categories')
    .then(function (response) {
      categories.value = response.data
    })
}

requestAllCategories()
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="navRail = !navRail" />

      <v-app-bar-title>HackMyCart</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer :rail="navRail" permanent>
      <v-list>
        <v-list-subheader>
          <div v-if="!navRail">Einkaufen</div>
          <div v-else></div>
        </v-list-subheader>
        <v-list-item title="Produkte" prepend-icon="mdi-store" to="/products" link />
        <v-list-item title="Warenkorb" prepend-icon="mdi-cart" to="/basket" link />

        <v-divider />

        <v-list-subheader>
          <div v-if="!navRail">Account</div>
          <div v-else></div>
        </v-list-subheader>
        <v-list-item title="Login" prepend-icon="mdi-login" to="/login" link />
        <v-list-item title="Account" prepend-icon="mdi-account" to="/account" link />
        <v-list-item title="Bestellungen" prepend-icon="mdi-cart-check" to="/orders" link />

        <v-divider />
        
        <v-list-subheader>
          <div v-if="!navRail">System & Hilfe</div>
          <div v-else></div>
        </v-list-subheader>
        <v-list-item title="Hilfestellung" prepend-icon="mdi-chat-question" to="/help" link />
        <v-list-item title="Einstellungen" prepend-icon="mdi-cog" to="/preferences" link />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <!-- Here changes the router the content -->
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
