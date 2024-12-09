<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import orderItem from './orderItem.vue';
import accountSubPageLayout from '@/layouts/accountSubPageLayout.vue';
import circularProgressIndeterminate from '@/components/basics/circularProgressIndeterminate.vue';
import { useOrderStore } from '@/stores/order.store';

const accountStore = useAccountStore()
const orderStore = useOrderStore()

orderStore.getOrdersOfAccount(accountStore.userAccount, accountStore.userAccountToken)
</script>

<template>
  <account-sub-page-layout>
    <!-- During fetching state -->
    <v-row
      v-if="orderStore.fetchInProgress"
    >
      <v-col class="text-center">
        <circular-progress-indeterminate />
      </v-col>
    </v-row>

    <!-- Display all orders -->
    <v-row
      v-else-if="orderStore.orders.length > 0"
      v-for="order in orderStore.orders"
    >
      <v-col>
        <order-item
          :order="order"
        />
      </v-col>
    </v-row>

    <!-- No orders -->
    <v-row v-else>
      <v-col>
        <v-empty-state
          icon="mdi-basket-off"
          :title="$t('order.noOrders')"
          :text="$t('order.noOrdersText')"
        />
      </v-col>
    </v-row>
  </account-sub-page-layout>
</template>