<script setup lang="ts">
import { useBasketStore } from '@/stores/basketStore';
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
        <th>{{ $t('band') }}</th>
        <th>{{ $t('event') }}</th>
        <th class="text-center">{{ $t('quantity') }}</th>
        <th class="text-right">{{ $t('product.productPrice') }}</th>
        <th class="text-right">{{ $t('totalPrice') }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="basketItem in basketStore.itemsInBasket">
        <!-- Band name -->
        <td>
          {{ basketItem.band.name }}
        </td>

        <!-- Event name -->
        <td>
          {{ basketItem.event.name }}
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

        <td>
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