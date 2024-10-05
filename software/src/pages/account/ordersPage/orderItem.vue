<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { OrderModel } from '@/data/models/ordering/orderModel';
import { useAccountStore } from '@/data/stores/accountStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';

const accountStore = useAccountStore()

defineProps({
  order: OrderModel
})

function formatDateTimeString(string: string) {
  let date = new Date(string)

  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ', ' + 
    date.getHours() + ':' + date.getMinutes()
}
</script>

<template>
  <card-view
    :title="$t('orderedAt') + ' ' + formatDateTimeString(order.orderedAt) + ' ' + $t('oclock')"
    :subtitle="$t('totalPrice') + ': ' + accountStore.getOrderTotalPrice(order.id) + ' €'"
  >
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
                <td>{{ orderItem }}</td>
                <td>{{ orderItem }}</td>
                <td>{{ orderItem }} €</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
  </card-view>
</template>