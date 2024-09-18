<script setup lang="ts">
import { ProductWithCategoryModel } from '@/data/models/productWithCategoryModel';

defineProps({
  product: {
    required: true,
    type: ProductWithCategoryModel
  }
})
</script>

<template>
  <v-card link>
    <v-img
      :src="'http://127.0.0.1:3000/static/' + product.imageUrl"
      cover
      max-height="200"
      class="align-end text-white"
    >
      <v-card-title>
        {{ product.name }}
      </v-card-title>

      <v-card-subtitle class="mb-2">
        <div>
          <v-icon :icon="product.category.icon" />
          {{ product.category.name }}
        </div>
      </v-card-subtitle>
    </v-img>
    
    <v-card-text>
      <div class="d-flex justify-left flex-row pb-2">
        <v-rating
          size="medium"
          :model-value="product.rating"
          active-color="yellow-darken-1"
          color="grey-darken-1"
          half-increments
          readonly
        />

        {{ product.rating }}/5
      </div>


      <div v-if="product.discount == 0" class="font-weight-bold text-body-1">{{ product.price }} €</div>
      <div v-else>
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