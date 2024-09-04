<script setup>
import { ref } from 'vue';
import axios from 'axios';

const showDrawer = ref(true)
const apiCategories = ref([])
const newCategory = ref("")

function requestAllCategories() {
  axios.get('http://127.0.0.1:3000/categories')
    .then(function (response) {
      console.log(response)
      apiCategories.value = response.data
    })
}

function addCategory() {
  axios.post("http://127.0.0.1:3000/categories", {
    name: newCategory.value
  })
  .then(requestAllCategories)
}

requestAllCategories()
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
      <v-container>
        <v-row>
          <v-col>
            <v-text-field label="Category name" v-model="newCategory" />
          </v-col>
          <v-col>
            <v-btn @click="addCategory" >Hinzufügen</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-list>
            <v-list-item v-for="category in apiCategories">
              {{ category.name }}
            </v-list-item>
          </v-list>
        </v-row>
      </v-container>
      <!-- todo -->
    </v-main>
  </v-app>
</template>
