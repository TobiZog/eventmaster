<script setup lang="ts">
import { ProductModel } from '@/data/models/productModel';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcProductPrice } from '@/scripts/productScripts';

const basketStore = useBasketStore()

defineProps({
  product: {
    type: ProductModel,
    required: true
  }
})

function removeProductFromBasket(product: ProductModel) {
  basketStore.removeProductFromBasket(product)
}
</script>

<template>
  <v-list-item
    :title="product.name"
    :subtitle="product.brand"
  >
    <template v-slot:prepend>
      <v-btn icon="mdi-delete" flat @click="removeProductFromBasket(product)"/>
    </template>

    <template v-slot:append>
      {{ calcProductPrice(product) }} €
    </template>
  </v-list-item>
</template>