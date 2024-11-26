<script setup lang="ts">
import { useBasketStore } from '@/stores/basket.store';
import { BasketItemModel } from '@/data/models/ordering/basketItemModel';
import { calcPrice } from '@/scripts/concertScripts';
import moment from 'moment';

const basketStore = useBasketStore()

function removeFromBasket(basketItem: BasketItemModel) {
  basketStore.removeItemFromBasket(basketItem)
}
</script>

<template>
  <v-table style="background-color: transparent;">
    <thead>
      <tr>
        <th>{{ $t('concert.date') }}</th>
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
        <!-- Concert date -->
        <td>
          {{ moment(basketItem.concert.date).format("DD.MM.YYYY") }}
        </td>

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
            {{ basketItem.price.toFixed(2) }} €
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
            color="error"
            variant="text"
            flat
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>