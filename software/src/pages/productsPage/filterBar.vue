<script setup lang="ts">
import { CategoryModel } from '@/data/models/categoryModel';
import { FilterModel } from '@/data/models/filterModel';

// Parameters
defineProps({
  numberOfItems: {
    type: Number,
    default: 0
  },
  categories: {
    type: Array<CategoryModel>,
    required: true
  },
  sortBy: {
    type: Array<FilterModel>,
    required: true
  }
})

// Constants
const selectedCategory = defineModel("selectedCategory", { required: true, type: CategoryModel, default: new CategoryModel() })
const sortedBy = defineModel("sortedBy", { required: true, type: FilterModel })
const onlyDiscounts = defineModel("onlyDiscounts", { required: true, type: Boolean })
</script>

<template>
  <v-card>
    <v-card-title>
      <div v-if="numberOfItems == 1">
            {{ numberOfItems }} Produkt
          </div>
          <div v-else>
            {{ numberOfItems }} Produkte
          </div>
    </v-card-title>
    <v-container class="pb-0">
      <v-row>
        <v-spacer />
        <v-col class="d-flex justify-center align-center">
          <v-checkbox label="Angebote" v-model="onlyDiscounts" />
        </v-col>

        <v-col class="d-flex justify-left align-center">
          <v-select :items="categories" label="Categories" v-model="selectedCategory" >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>

            <template v-slot:selection="{ item }">
              <v-list-item :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>
          </v-select>
        </v-col>

        <v-col class="d-flex justify-left align-center">
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