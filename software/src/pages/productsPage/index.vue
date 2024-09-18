<script setup lang="ts">
import productCard from "./productCard.vue"
import productDetails from "./productDetails.vue"
import filterBar from "./filterBar.vue"
import { Ref, ref, watch } from "vue";
import { ProductModel } from "@/data/models/productModel";
import { CategoryModel } from "@/data/models/categoryModel";
import { FilterModel } from "@/data/models/filterModel";
import { useProductStore } from "@/data/stores/productStore";

const productStore = useProductStore()

const categories: Ref<Array<CategoryModel>> = ref<Array<CategoryModel>>([new CategoryModel()])
const showProductDetails = ref(false)
const dialogProduct = ref(new ProductModel())

const sortBy: Array<FilterModel> = [
  { icon: "mdi-sort-ascending", name: "Price: Low to high" }, 
  { icon: "mdi-sort-descending", name: "Price: High to low" },
  { icon: "mdi-sort-alphabetical-ascending", name: "Name: A to Z" }, 
  { icon: "mdi-sort-alphabetical-descending", name: "Name: Z to A" },
]


// todo axios.get("http://127.0.0.1:3000/categories")
//   .then(function (response) {
//     for (let category of response.data) {
//       categories.value.push(category)
//     }
//   })

function getCategoryById(id: number) {
  return categories.value.find(category => 
    category.id === id
  )
}

function showProductDialog(product: ProductModel) {
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
        <filter-bar
          :number-of-items="productStore.filteredProducts.length"
          :categories="categories"
          :sort-by="sortBy"
        />
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
          :category="getCategoryById(product.categoryId)"
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
    :productCategory="getCategoryById(dialogProduct.categoryId)"
  />
</template>