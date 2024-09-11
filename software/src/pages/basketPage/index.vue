<script setup lang="ts">
import { useBasketStore } from '@/data/stores/basketStore';
import productsTable from './productsTable.vue';

const basketStore = useBasketStore()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <v-card :title="$t('menu.basket')" prepend-icon="mdi-cart">
          <v-card-subtitle v-if="basketStore.itemsInBasket.length > 0">
            <div v-if="basketStore.itemsInBasket.length == 1">
              {{ basketStore.itemsInBasket.length }} {{ $t('product.product') }}
            </div>
            <div v-else>
              {{ basketStore.itemsInBasket.length }} {{ $t('product.products') }}
            </div>
          </v-card-subtitle>

          <products-table v-if="basketStore.itemsInBasket.length > 0" />

          <v-empty-state v-else
            icon="mdi-basket-off"
            :title="$t('emptyBasketTitle')"
            :text="$t('emptyBasketText')"
          />

          <v-card-text class="text-right" v-if="basketStore.itemsInBasket.length > 0">
            {{ $t('totalPrice') }}: {{ basketStore.getTotalPrice }} €
          </v-card-text>

          <v-card-actions>
            <v-btn
              prepend-icon="mdi-basket-check"
              :disabled="basketStore.itemsInBasket.length == 0"
            >
              {{ $t('orderNow') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>