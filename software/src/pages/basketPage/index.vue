<script setup lang="ts">
import { useBasketStore } from '@/data/stores/basketStore';
import productsTable from './productsTable.vue';

const basketStore = useBasketStore()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <v-card title="Warenkorb" >
          <v-card-subtitle v-if="basketStore.itemsInBasket.length > 0">
            {{ basketStore.itemsInBasket.length }} Artikel
          </v-card-subtitle>

          <products-table v-if="basketStore.itemsInBasket.length > 0" />

          <v-empty-state v-else
            icon="mdi-basket-off"
            title="Keine Artikel im Warenkorb"
            text="Gehe zu unseren Produkten und lege Artikel in den Warenkorb"
          />

          <v-card-text class="text-right" v-if="basketStore.itemsInBasket.length > 0">
            Total: {{ basketStore.getTotalPrice }} €
          </v-card-text>

          <v-card-actions>
            <v-btn
              prepend-icon="mdi-basket-check"
              :disabled="basketStore.itemsInBasket.length == 0"
            >
              Bestellen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>