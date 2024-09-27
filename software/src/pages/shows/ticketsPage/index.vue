<script setup lang="ts">
import tourCard from "./tourCard.vue"
import { ref, watch } from "vue";
import filterNavDrawer from "./filterNavDrawer.vue";
import { useTourStore } from "@/data/stores/tourStore";

const tourStore = useTourStore()

const showProductDetails = ref(false)
// const dialogProduct = ref(new ProductModel())

// function showProductDialog(product: ProductModel) {
//   dialogProduct.value = product
//   showProductDetails.value = true
// }

// watch(() => productStore.filteredCategory, async () => { productStore.filterProducts() })
// watch(() => productStore.sortOrder, async () => { productStore.sortProducts() })
// watch(() => productStore.onlyDiscounts, async () => { productStore.filterProducts() })
</script>

<template>
  <v-container max-width="1200">
    <v-row dense>
      <v-col
        v-if="tourStore.tours.length > 0"
        v-for="tour in tourStore.tours"
        cols="12"
      >
        <tour-card
          :tour="tour"
        />
      </v-col>
      
      <v-col v-else>
        <v-empty-state
          icon="mdi-magnify"
          headline="Keine Artikel gefunden"
        />
      </v-col>
    </v-row>
  </v-container>

  <filter-nav-drawer />

  <!-- <product-details
    v-model="showProductDetails"
    :product="dialogProduct"
  /> -->
</template>