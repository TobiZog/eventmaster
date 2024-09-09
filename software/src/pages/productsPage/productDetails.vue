<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ProductModel } from '@/data/models/productModel';
import { CategoryModel } from '@/data/models/categoryModel';
import { ModelRef, ref } from 'vue';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcProductPrice, productToBasketItem } from '@/scripts/productScripts';

const showDialog: ModelRef<boolean> = defineModel()
const nrOfArticles = ref(1)
const basketStore = useBasketStore()

const props = defineProps({
  product: ProductModel,
  productCategory: CategoryModel
})

function addProductToBasket() {
  basketStore.addItemToBasket(productToBasketItem(props.product, props.productCategory, nrOfArticles.value))
  nrOfArticles.value = 1
  showDialog.value = false
}
</script>

<template>
  <v-dialog max-width="800" v-model="showDialog">
    <v-card :title="product.name" :subtitle="product.brand" >
      <v-img :src="product.imageUrl" max-height="300" />

      <v-card-text>
        <v-row>
          <v-col>
            <v-icon :icon="productCategory.icon" />
            {{ productCategory.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            {{ product.description }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-number-input
              :reverse="false"
              controlVariant="default"
              label="Anzahl"
              :hideInput="false"
              :inset="false"
              v-model="nrOfArticles"
              :min="1"
              :max="10"
              density="comfortable"
            />
          </v-col>

          <v-spacer />

          <v-col cols="2" class="justify-center d-flex">
            {{ calcProductPrice(product, nrOfArticles) }} €
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
          prepend-icon="mdi-cart-plus"
          @click="addProductToBasket"
        >
          Zum Einkaufswagen hinzufügen
        </v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>