<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ProductModel } from '@/data/models/productModel';
import { CategoryModel } from '@/data/models/categoryModel';
import { ref } from 'vue';

const showDialog = defineModel("showDialog", { type: Boolean })
const nrOfArticles = ref(1)

defineProps({
  product: ProductModel,
  productCategory: CategoryModel
})
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
            />
          </v-col>

          <v-col>
            {{ nrOfArticles * product.price }} €
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn prepend-icon="mdi-cart-plus" >Zum Einkaufswagen hinzufügen</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>