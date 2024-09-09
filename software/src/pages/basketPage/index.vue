<script setup lang="ts">
import { useBasketStore } from '@/data/stores/basketStore';
import basketItem from './basketItem.vue';

const basketStore = useBasketStore()
</script>

<template>
  <v-container max-width="800">
    <v-row>
      <v-col>
        <v-card title="Warenkorb" >
          <v-card-subtitle>
            {{ basketStore.productsInBasket.length }} Artikel
          </v-card-subtitle>

          <v-list>
            <basket-item
              v-for="product in basketStore.productsInBasket"
              :product="product"
            />
          </v-list>

          <v-card-text class="text-right">
            Total: {{ basketStore.getTotalPrice }} €
          </v-card-text>

          <v-card-actions>
            <v-btn prepend-icon="mdi-basket-check">Bestellen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>