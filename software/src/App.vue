<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from './data/stores/userStore';

const userStore = useUserStore()
const categories = ref([])
const theme = useTheme()

theme.global.name.value = userStore.theme

function requestAllCategories() {
  axios.get('http://127.0.0.1:3000/categories')
    .then(function (response) {
      console.log(response)
      categories.value = response.data
    })
}

requestAllCategories()
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon />

      <v-app-bar-title>HackMyCart</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer permanent>
      <v-list>
        <v-list-subheader>Shop Kategorien</v-list-subheader>
        <v-list-item v-for="category in categories" link :prepend-icon="category.icon" to="/">
          {{ category.name }}
        </v-list-item>

        <v-list-subheader>Account</v-list-subheader>
        <v-list-item title="Login" prepend-icon="mdi-login" to="/login" link />
        <v-list-item title="Account" prepend-icon="mdi-account" to="/account" link />
        <v-list-item title="Bestellungen" prepend-icon="mdi-cart-check" to="/orders" link />

        <v-list-subheader>System & Hilfe</v-list-subheader>
        <v-list-item title="Einstellungen" prepend-icon="mdi-cog" to="/preferences" link />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- Here changes the router the content -->
      <v-container>
        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
