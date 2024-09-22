<script setup lang="ts">
import { useUserStore } from '@/data/stores/userStore';
import ordersCard from './ordersCard.vue';

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
  <v-container max-width="1000">
    <v-row v-for="order in userStore.orders">
      <v-col>
        <orders-card :order="order" />
      </v-col>
    </v-row>
  </v-container>
</template>