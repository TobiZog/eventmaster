<script setup lang="ts">
import productCard from "./productCard.vue"
import productDetails from "./productDetailsDialog.vue"
import { ref, watch } from "vue";
import { useProductStore } from "@/data/stores/productStore";
import filterNavDrawer from "./filterNavDrawer.vue";
import { ProductModel } from '@/data/models/productModel';

const productStore = useProductStore()

const showProductDetails = ref(false)
const dialogProduct = ref(new ProductModel())

function showProductDialog(product: ProductModel) {
  dialogProduct.value = product
  showProductDetails.value = true
}

watch(() => productStore.filteredCategory, async () => { productStore.filterProducts() })
watch(() => productStore.sortOrder, async () => { productStore.sortProducts() })
watch(() => productStore.onlyDiscounts, async () => { productStore.filterProducts() })
</script>

<template>
  <v-container max-width="1000">
    <v-row dense>
      <v-col
        v-if="productStore.filteredProducts.length > 0"
        v-for="product in productStore.filteredProducts"
        cols="12"
      >
        <product-card
          :product="product"
          @click="showProductDialog(product)"
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

  <product-details
    v-model="showProductDetails"
    :product="dialogProduct"
  />
</template>