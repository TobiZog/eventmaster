<script setup lang="ts">
import productCard from "./productCard.vue"
import filterBar from "./filterBar.vue"
import axios from "axios";
import { Ref, ref } from "vue";
import { ProductModel } from "@/data/models/productModel";
import { CategoryModel } from "@/data/models/categoryModel";

const products: Ref<Array<ProductModel>> = ref<Array<ProductModel>>([])
const categories: Ref<Array<CategoryModel>> = ref<Array<CategoryModel>>([])


axios.get("http://127.0.0.1:3000/categories")
  .then(function (response) {
    categories.value = response.data
  })

axios.get("http://127.0.0.1:3000/products")
  .then(function (response) {
    products.value = response.data
  })

function getCategoryById(id: number) {
  return categories.value.find(category => 
    category.id === id
  )
}
</script>

<template>
  <v-row>
    <v-col>
      <filter-bar :number-of-items="products.length" />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col v-for="product in products" cols="6" lg="4" xl="3">
      <product-card :product="product" :category="getCategoryById(product.categoryId)" />
    </v-col>
  </v-row>
</template>