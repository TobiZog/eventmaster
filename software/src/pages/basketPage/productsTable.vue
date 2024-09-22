<script setup lang="ts">
import { BasketItemModel } from '@/data/models/basketItemModel';
import { useBasketStore } from '@/data/stores/basketStore';
import { calcPrice } from '@/scripts/productScripts';

const basketStore = useBasketStore()

function removeFromBasket(basketItem: BasketItemModel) {
  basketStore.removeItemFromBasket(basketItem)
}

function editQuantity(basketItem: BasketItemModel) {
  // todo
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th>{{ $t('product.category') }}</th>
        <th>{{ $t('product.brand') }}</th>
        <th>{{ $t('product.products') }}</th>
        <th class="text-center">{{ $t('quantity') }}</th>
        <th class="text-right">{{ $t('product.productPrice') }}</th>
        <th class="text-right">{{ $t('totalPrice') }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="basketItem in basketStore.itemsInBasket">
        <td><v-icon :icon="basketItem.categoryIcon" />
          {{ basketItem.categoryName }}
        </td>

        <td>
          {{ basketItem.brand }}
        </td>

        <td>
          {{ basketItem.name }}
        </td>

        <td class="text-center">
          {{ basketItem.quantity }}x
          <v-btn
            icon="mdi-pencil" 
            @click="editQuantity(basketItem)" 
            color="orange" 
            variant="text"
            flat 
          />
        </td>

        <td class="text-right">
          <div v-if="basketItem.discount > 0">
            <strong class="font-weight-bold text-body-1 text-red-lighten-1">
              {{ calcPrice(basketItem.price, basketItem.discount) }} €
            </strong>

            <div class="text-decoration-line-through ml-3 mt-1 text-caption">{{ basketItem.price }} €</div>
          </div>

          <div v-else>
            {{ basketItem.price }} €
          </div>
        </td>

        <td class="text-right">
          <div v-if="basketItem.discount > 0">
            <strong class="font-weight-bold text-body-1 text-red-lighten-1">
              {{ calcPrice(basketItem.price, basketItem.discount, basketItem.quantity) }} €
            </strong>

            <div class="text-decoration-line-through ml-3 mt-1 text-caption">
              {{ calcPrice(basketItem.price, 0, basketItem.quantity) }} €
            </div>
          </div>

          <div v-else>
            {{ calcPrice(basketItem.price, 0, basketItem.quantity) }} €
          </div>
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