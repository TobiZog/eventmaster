<script setup lang="ts">
import { useAccountStore } from '@/data/stores/accountStore';
import ordersCard from './ordersCard.vue';

const accountStore = useAccountStore()

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
  <v-container max-width="1000">
    <v-row
      v-if="accountStore.orders.length > 0"
      v-for="order in accountStore.orders"
    >
      <v-col>
        <orders-card :order="order" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-empty-state
          icon="mdi-basket-off"
          :title="$t('noOrders')"
          :text="$t('noOrdersText')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>