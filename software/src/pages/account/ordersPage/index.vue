<script setup lang="ts">
import { useAccountStore } from '@/data/stores/accountStore';
import orderItem from './orderItem.vue';
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { getUserOrders } from '@/data/api/orderApi';
import { ref } from 'vue';
import { OrderApiModel } from '@/data/models/ordering/orderApiModel';

const accountStore = useAccountStore()
const router = useRouter()
const orders = ref<Array<OrderApiModel>>([])

getUserOrders(accountStore.userAccount.id)
  .then(result => {
    orders.value = result.data
  })
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
      v-if="orders.length > 0"
      v-for="order in orders"
    >
      <v-col>
        <order-item
          :order="order"
        />
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