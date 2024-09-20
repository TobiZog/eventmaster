<script setup lang="ts">
import { useUserStore } from '@/data/stores/userStore';

const userStore = useUserStore()

function getDotColor(order, step: number) {
  if (order.shippingProgress == step)
  {
    return "orange"
  } else if (order.shippingProgress >= step) 
  {
    return "green"
  } else 
  {
    return "grey"
  }
}

function formatDateTimeString(string: string) {
  let date = new Date(string)

  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ', ' + 
    date.getHours() + ':' + date.getMinutes()
}
</script>

<template>
  <v-container>
    <v-row v-for="order in userStore.orders">
      <v-col>
        <v-card
          :title="$t('orders.orderFrom') + ' ' + formatDateTimeString(order.createdAt) + ' ' + $t('oclock')"
          :subtitle="$t('totalPrice') + ': ' + order.totalPrice + ' €'"
        >
          <v-timeline direction="horizontal" side="start">
            <v-timeline-item :dot-color="getDotColor(order, 1)" icon="mdi-basket-check">
              {{ $t('orders.ordered') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 2)" icon="mdi-package-variant">
              {{ $t('orders.preparingForShipping') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 3)" icon="mdi-truck-fast">
              {{ $t('orders.shipped') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 4)" icon="mdi-package-check">
              {{ $t('orders.delivered') }}
            </v-timeline-item>
          </v-timeline>

          <v-table class="bg-surface-light">
            <thead>
              <tr>
                <th>{{ $t('quantity') }}</th>
                <th>{{ $t('product.brand') }}</th>
                <th>{{ $t('product.productName') }}</th>
                <th>{{ $t('product.productPrice') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orderItem in order.orderItem">
                <td>{{ orderItem.quantity }}x</td>
                <td>{{ orderItem.product.brand }}</td>
                <td>{{ orderItem.product.name }}</td>
                <td>{{ orderItem.product.price }} €</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>