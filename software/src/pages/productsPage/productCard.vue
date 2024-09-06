<script setup lang="ts">
import { CategoryModel } from '@/data/models/categoryModel';
import { ProductModel } from '@/data/models/productModel';

defineProps({
  product: {
    required: true,
    type: ProductModel
  },
  category: {
    type: CategoryModel
  },
})
</script>

<template>
  <v-card link>
    <v-img
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      cover
      max-height="200"
      class="align-end text-white"
    >
      <v-card-title>
        {{ product.name }}
      </v-card-title>

      <v-card-subtitle class="mb-2">
        <div><v-icon :icon="category.icon" /> {{ category.name }}</div>
      </v-card-subtitle>
    </v-img>
    
    <v-card-text>
      <v-rating
        size="medium"
        :model-value="product.rating"
        active-color="yellow-darken-1"
        color="grey-darken-1"
        half-increments
      />


      <div v-if="product.discount == 0" class="font-weight-bold text-body-1">{{ product.price }} €</div>
      <div v-else class="">
        <div class="d-flex justify-left flex-row">
          <strong class="font-weight-bold text-body-1 text-red-lighten-1">
            {{ (product.price * ( 100 - product.discount) / 100).toFixed(2) }} €
          </strong>

          <div class="text-decoration-line-through ml-3 mt-1">{{ product.price }} €</div>
          <div class="ml-4 mb-1 bg-red">-{{ product.discount }} %</div>
        </div>
      </div>
      
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card :deep(img) {
  filter: brightness(40%)
}

.v-card:hover :deep(img) {
  filter: brightness(70%)
}
</style>