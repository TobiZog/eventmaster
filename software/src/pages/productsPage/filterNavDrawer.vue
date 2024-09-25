<script setup lang="ts">
import { SortOrder } from '@/data/enums/sortOrderEnum';
import { useProductStore } from '@/data/stores/productStore';

const productStore = useProductStore()
const sortOrderItems = Object.values(SortOrder)
</script>

<template>
  <v-navigation-drawer location="right" width="300" permanent>
    <v-list>
      <v-list-subheader>Filter</v-list-subheader>

      <v-list-item>
        <v-checkbox :label="$t('offers')" v-model="productStore.onlyDiscounts" />
      </v-list-item>

      <v-list-item>
        <v-select
          :items="productStore.categories"
          :label="$t('category', 2)"
          v-model="productStore.filteredCategory"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :prepend-icon="item.raw.icon" :title="item.raw.name" />
          </template>

          <template v-slot:selection="{ item }">
            <v-list-item :prepend-icon="item.raw.icon" :title="item.raw.name" />
          </template>
        </v-select>
      </v-list-item>

      <v-divider />
      <v-list-subheader>Sort</v-list-subheader>

      <v-list-item>
        <v-select :label="$t('sortBy')" :items="sortOrderItems" v-model="productStore.sortOrder" >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item.title" />
          </template>

          <template v-slot:selection="{ item }">
            <v-list-item :title="item.title" />
          </template>
        </v-select>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>