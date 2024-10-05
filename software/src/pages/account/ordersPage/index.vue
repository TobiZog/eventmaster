<script setup lang="ts">
import { useAccountStore } from '@/data/stores/accountStore';
import ordersCard from './orderItem.vue';
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/outlinedButton.vue';

const accountStore = useAccountStore()
const router = useRouter()

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
    <v-row>
      <v-col>
        <outlined-button prepend-icon="mdi-arrow-left" @click="router.back()" >
          {{ $t('onePageBack') }}
        </outlined-button>
      </v-col>
    </v-row>

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