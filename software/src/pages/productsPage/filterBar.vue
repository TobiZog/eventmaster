<script setup lang="ts">
import { SortOrder } from '@/data/enums/sortOrderEnum';
import { CategoryModel } from '@/data/models/categoryModel';
import { FilterModel } from '@/data/models/filterModel';
import { useProductStore } from '@/data/stores/productStore';

const productStore = useProductStore()
const sortOrderItems = Object.values(SortOrder)
</script>

<template>
  <v-card>
    <v-card-title>
      <div v-if="productStore.filteredProducts.length == 1">
        {{ productStore.filteredProducts.length }} {{ $t('product.product') }}
      </div>
      <div v-else>
        {{ productStore.filteredProducts.length }} {{ $t('product.products') }}
      </div>
    </v-card-title>
    <v-container class="pb-0">
      <v-row>
        <v-spacer />
        <v-col class="d-flex justify-center align-center">
          <v-checkbox :label="$t('offers')" v-model="productStore.onlyDiscounts" />
        </v-col>

        <v-col class="d-flex justify-left align-center">
          <!-- todo <v-select :items="categories" :label="$t('categories')" v-model="selectedCategory" >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>

            <template v-slot:selection="{ item }">
              <v-list-item :prepend-icon="item.raw.icon" :title="item.raw.name" />
            </template>
          </v-select> -->
        </v-col>

        <v-col class="d-flex justify-left align-center">
          <v-select :label="$t('sortBy')" :items="sortOrderItems" v-model="productStore.sortOrder" >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :title="item.title" />
            </template>

            <template v-slot:selection="{ item }">
              <v-list-item :title="item.title" />
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>