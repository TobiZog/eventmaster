<script setup lang="ts">
import productCard from "./productCard.vue"
import productDetails from "./productDetails.vue"
import filterBar from "./filterBar.vue"
import axios from "axios";
import { Ref, ref, watch } from "vue";
import { ProductModel } from "@/data/models/productModel";
import { CategoryModel } from "@/data/models/categoryModel";
import { FilterModel } from "@/data/models/filterModel";

const products: Ref<Array<ProductModel>> = ref<Array<ProductModel>>([])
const filteredProducts: Ref<Array<ProductModel>> = ref<Array<ProductModel>>([])
const categories: Ref<Array<CategoryModel>> = ref<Array<CategoryModel>>([new CategoryModel()])
const selectedCategory: Ref<CategoryModel> = ref<CategoryModel>(new CategoryModel())
const sortedBy: Ref<FilterModel> = ref<FilterModel>()
const onlyDiscounts: Ref<boolean> = ref(false)
const showProductDetails = ref(false)
const dialogProduct = ref(new ProductModel())

const sortBy: Array<FilterModel> = [
  { icon: "mdi-sort-ascending", name: "Price: Low to high" }, 
  { icon: "mdi-sort-descending", name: "Price: High to low" },
  { icon: "mdi-sort-alphabetical-ascending", name: "Name: A to Z" }, 
  { icon: "mdi-sort-alphabetical-descending", name: "Name: Z to A" },
]

sortedBy.value = sortBy[0]

axios.get("http://127.0.0.1:3000/categories")
  .then(function (response) {
    for (let category of response.data) {
      categories.value.push(category)
    }
  })

axios.get("http://127.0.0.1:3000/products")
  .then(function (response) {
    products.value = response.data
    filteredProducts.value = response.data

    sortProducts()
  })

function getCategoryById(id: number) {
  return categories.value.find(category => 
    category.id === id
  )
}


function sortProducts() {
  switch (sortedBy.value.name) {
    case sortBy[0].name: {
      filteredProducts.value.sort((a, b) =>
        a.price - b.price
      )
      break;
    }
    case sortBy[1].name: {
      filteredProducts.value.sort((a, b) =>
        b.price - a.price
      )
      break;
    }
    case sortBy[2].name: {
      filteredProducts.value.sort((a, b) => {
        if (b.name > a.name) {
          return -1
        }
        else {
          return 1
        }
      })
      break;
    }
    case sortBy[3].name: {
      filteredProducts.value.sort((a, b) => {
        if (b.name < a.name) {
          return -1
        }
        else {
          return 1
        }
      })
      break;
    }
  }
}

function filterProducts() {
  if (selectedCategory.value.id == -1) {
    filteredProducts.value = products.value
  } else {
    filteredProducts.value = products.value.filter(product => 
      product.categoryId == selectedCategory.value.id
    )
  }
  
  if (onlyDiscounts.value) {
    filteredProducts.value = filteredProducts.value.filter(product => 
      product.discount > 0
    )
  }
}

function showProductDialog(product: ProductModel) {
  dialogProduct.value = product
  showProductDetails.value = true
}

watch(() => selectedCategory.value, () => { filterProducts() })
watch(() => sortedBy.value, () => { sortProducts() })
watch(() => onlyDiscounts.value, () => { filterProducts() })
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <filter-bar
          :number-of-items="filteredProducts.length"
          :categories="categories"
          :sort-by="sortBy"
          v-model:selected-category="selectedCategory"
          v-model:sorted-by="sortedBy"
          v-model:only-discounts="onlyDiscounts"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-if="filteredProducts.length > 0" v-for="product in filteredProducts" cols="12" sm="6" lg="4" xl="3">
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

  <product-details v-model="showProductDetails" :product="dialogProduct" :productCategory="getCategoryById(dialogProduct.categoryId)" />
</template>