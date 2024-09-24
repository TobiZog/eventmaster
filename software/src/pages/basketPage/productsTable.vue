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
        <!-- Category icon and name -->
        <td><v-icon :icon="basketItem.product.category.icon" />
          {{ basketItem.product.category.name }}
        </td>

        <!-- Product brand -->
        <td>
          {{ basketItem.product.brand.name }}
        </td>

        <!-- Name of product -->
        <td>
          {{ basketItem.product.name }}
        </td>

        <!-- Quantity -->
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

        <!-- Price per unit -->
        <td class="text-right">
          <div v-if="basketItem.product.discount > 0">
            <strong class="font-weight-bold text-body-1 text-red-lighten-1">
              {{ calcPrice(basketItem.product.price, basketItem.product.discount) }} €
            </strong>

            <div class="text-decoration-line-through ml-3 mt-1 text-caption">{{ basketItem.product.price }} €</div>
          </div>

          <div v-else>
            {{ basketItem.product.price }} €
          </div>
        </td>

        <!-- Total price -->
        <td class="text-right">
          <div v-if="basketItem.product.discount > 0">
            <strong class="font-weight-bold text-body-1 text-red-lighten-1">
              {{ calcPrice(basketItem.product.price, basketItem.product.discount, basketItem.quantity) }} €
            </strong>

            <div class="text-decoration-line-through ml-3 mt-1 text-caption">
              {{ calcPrice(basketItem.product.price, 0, basketItem.quantity) }} €
            </div>
          </div>

          <div v-else>
            {{ calcPrice(basketItem.product.price, 0, basketItem.quantity) }} €
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