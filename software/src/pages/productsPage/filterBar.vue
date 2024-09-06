<script setup lang="ts">
import { CategoryModel } from '@/data/models/categoryModel';
import { FilterModel } from '@/data/models/filterModel';
import axios from 'axios';
import { Ref, ref } from 'vue';

// Parameters
defineProps({
  numberOfItems: {
    type: Number,
    default: 0
  }
})

// Constants
const categories: Ref<Array<CategoryModel>> = ref([new CategoryModel()])
const selectedCategory: Ref<CategoryModel> = ref(new CategoryModel())

const sortBy: Array<FilterModel> = [
  { icon: "mdi-sort-ascending", name: "Price: Low to high" }, 
  { icon: "mdi-sort-descending", name: "Price: High to low" },
  { icon: "mdi-sort-alphabetical-ascending", name: "Name: A to Z" }, 
  { icon: "mdi-sort-alphabetical-descending", name: "Name: Z to A" },
]
const sortedBy = ref(sortBy[0])


// Request from the database
axios.get("http://127.0.0.1:3000/categories")
  .then(function (response) { 
    for (let categoryItem of response.data) {
      categories.value.push(categoryItem)
    }
})
</script>

<template>
  <v-card title="Filter" prepend-icon="mdi-filter">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-left align-center">
          <div v-if="numberOfItems == 1">
            {{ numberOfItems }} Produkt
          </div>
          <div v-else>
            {{ numberOfItems }} Produkte
          </div>
        </v-col>

        <v-spacer />
        <v-col class="d-flex justify-center align-center">
          <v-checkbox label="Angebote" />
        </v-col>

        <v-col>
          <v-select :items="categories" label="Categories" v-model="selectedCategory" >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>

            <template v-slot:selection="{ item }">
              <v-list-item :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>
          </v-select>
        </v-col>

        <v-col>
          <v-select label="Sortieren nach" :items="sortBy" v-model="sortedBy" >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>

            <template v-slot:selection="{ item }">
              <v-list-item :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>