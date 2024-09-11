<script setup lang="ts">
import { useUserStore } from '@/data/stores/userStore';
import axios from 'axios';
import { ref } from 'vue';

const userStore = useUserStore()
const orders = ref([])

axios.get("http://127.0.0.1:3000/orders", { 
  params: {
    accountId: userStore.userAccountId
  }
})
  .then(res => {
    orders.value = res.data
  })
</script>

<template>
  <v-container>
    <v-row v-for="order in orders">
      <v-col>
        <v-card
          :title="'Bestellung vom ' + order.createdAt"
          :subtitle="$t('totalPrice') + ': ' + order.totalPrice + ' €'"
        >
          <v-table>
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