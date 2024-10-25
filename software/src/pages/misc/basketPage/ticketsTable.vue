<script setup lang="ts">
import { useBasketStore } from '@/stores/basket.store';
import { BasketItemModel } from '@/data/models/ordering/basketItemModel';
import { calcPrice } from '@/scripts/concertScripts';

const basketStore = useBasketStore()

function removeFromBasket(basketItem: BasketItemModel) {
  basketStore.removeItemFromBasket(basketItem)
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th>{{ $t('band.band') }}</th>
        <th>{{ $t('concert.concert') }}</th>
        <th class="text-center">{{ $t('misc.quantity') }}</th>
        <th class="text-right">{{ $t('misc.price') }}</th>
        <th class="text-right">{{ $t('misc.totalPrice') }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="basketItem in basketStore.itemsInBasket">
        <!-- Band name -->
        <td>
          {{ basketItem.band.name }}
        </td>

        <!-- Concert name -->
        <td>
          {{ basketItem.concert.name }}
        </td>

        <!-- Quantity -->
        <td class="text-center">
          {{ basketItem.seats.length }}x
        </td>

        <!-- Price per event -->
        <td class="text-right">
          <div v-if="basketItem.seats">
            {{ basketItem.price }} €
          </div>
        </td>

        <!-- Total price -->
        <td class="text-right">
          {{ (calcPrice(basketItem.concert.price, basketItem.seats.length)).toFixed(2) }} €
        </td>

        <td class="text-right">
          <v-btn
            icon="mdi-delete"
            @click="removeFromBasket(basketItem)"
            color="red"
            variant="text"
            flat
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>