<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { OrderModel } from '@/data/models/orderModel';
import { useAccountStore } from '@/data/stores/accountStore';

const accountStore = useAccountStore()

defineProps({
  order: OrderModel
})

function getDotColor(order: OrderModel, step: number) {
  if (order.shippingProgress >= step)
  {
    return "green"
  } else if (order.shippingProgress + 1 == step) 
  {
    return "blue"
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
  <card-view
    :title="$t('orders.orderFrom') + ' ' + formatDateTimeString(order.orderedAt) + ' ' + $t('oclock')"
    :subtitle="$t('totalPrice') + ': ' + accountStore.getOrderTotalPrice(order.id) + ' €'"
  >
    <template #withoutContainer>
      <v-row>
        <v-col>
          <v-timeline direction="horizontal" side="start" size="x-large">
            <v-timeline-item :dot-color="getDotColor(order, 1)" icon="mdi-basket-check">
              {{ $t('orders.ordered') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 2)" icon="mdi-package-variant">
              {{ $t('orders.preparingForShipping') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 3)" icon="mdi-send">
              {{ $t('orders.shipped') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 4)" icon="mdi-truck-fast">
              {{ $t('orders.inDelivery') }}
            </v-timeline-item>

            <v-timeline-item :dot-color="getDotColor(order, 5)" icon="mdi-package-check">
              {{ $t('orders.delivered') }}
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card variant="outlined" class="ml-5 pa-3">
            <div class="text-h6">
              <v-icon icon="mdi-home" />
              {{ $t('account.address', 1) }}
            </div>

            <div class="pl-9">{{ order.address.street }} {{ order.address.houseNumber }}</div>
            <div class="pl-9">{{ order.address.postalCode }} {{ order.address.city }}</div>
          </v-card>
        </v-col>

        <v-col>
          <v-card variant="outlined" class="mr-5 pa-3">
            <div class="text-h6">
              <v-icon icon="mdi-currency-usd" />
              {{ $t('account.payment', 1) }}
            </div>
            <div class="pl-9">{{ order.payment.bankName }}</div>
            <div class="pl-9">{{ order.payment.iban }}</div>
          </v-card>
        </v-col>

        
      </v-row>

      <v-row>
        <v-col>
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
              <tr v-for="orderItem in order.orderItems">
                <td>{{ orderItem.quantity }}x</td>
                <td>{{ orderItem.product.brand.name }}</td>
                <td>{{ orderItem.product.name }}</td>
                <td>{{ orderItem.product.price }} €</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </template>
  </card-view>
</template>