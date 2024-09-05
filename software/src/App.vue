<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const showDrawer = ref(true)
const categories = ref([])
const newCategory = ref("")

function requestAllCategories() {
  axios.get('http://127.0.0.1:3000/categories')
    .then(function (response) {
      console.log(response)
      categories.value = response.data
    })
}

function addCategory() {
  axios.post("http://127.0.0.1:3000/categories", {
    name: newCategory.value
  })
  .then(requestAllCategories)
}

function resetDb() {
  axios.post("http://127.0.0.1:3000/api/resetdatabase")
  requestAllCategories()
}

requestAllCategories()
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon />

      <v-app-bar-title>HackMyCart</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-subheader>Shop Kategorien</v-list-subheader>
        <v-list-item v-for="category in categories" link :prepend-icon="category.icon">
          {{ category.name }}
        </v-list-item>

        <v-list-subheader>Account & Hilfe</v-list-subheader>
        <v-list-item title="Account" link prepend-icon="mdi-account" />
        <v-list-item title="Bestellungen" link prepend-icon="mdi-cart-check" />
        <v-list-item title="Einstellungen" link prepend-icon="mdi-cog" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field label="Category name" v-model="newCategory" />
          </v-col>
          <v-col cols="2">
            <v-btn @click="addCategory" >Hinzufügen</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn @click="resetDb">Datenbank zurücksetzen</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!-- todo -->
    </v-main>
  </v-app>
</template>
