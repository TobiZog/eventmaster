<script setup lang="ts">
import productCard from "./productCard.vue"
import productDetails from "./productDetails.vue"
import filterBar from "./filterBar.vue"
import { ref, watch } from "vue";
import { FilterModel } from "@/data/models/filterModel";
import { useProductStore } from "@/data/stores/productStore";
import { ProductWithCategoryModel } from "@/data/models/productWithCategoryModel";
import alertBanner from "@/components/alertBanner.vue";

const productStore = useProductStore()

const showProductDetails = ref(false)
const dialogProduct = ref(new ProductWithCategoryModel())

const sortBy: Array<FilterModel> = [
  { icon: "mdi-sort-ascending", name: "Price: Low to high" }, 
  { icon: "mdi-sort-descending", name: "Price: High to low" },
  { icon: "mdi-sort-alphabetical-ascending", name: "Name: A to Z" }, 
  { icon: "mdi-sort-alphabetical-descending", name: "Name: Z to A" },
]

function showProductDialog(product: ProductWithCategoryModel) {
  dialogProduct.value = product
  showProductDetails.value = true
}

watch(() => productStore.filteredCategory, async () => { productStore.filterProducts() })
watch(() => productStore.sortOrder, async () => { productStore.sortProducts() })
watch(() => productStore.onlyDiscounts, async () => { productStore.filterProducts() })
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <alert-banner />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <filter-bar />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        v-if="productStore.filteredProducts.length > 0"
        v-for="product in productStore.filteredProducts"
        cols="12" sm="6" lg="4" xl="3"
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

  <product-details
    v-model="showProductDetails"
    :product="dialogProduct"
  />
</template>