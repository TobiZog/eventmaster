<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import orderItem from './orderItem.vue';
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/basics/outlinedButton.vue';

const accountStore = useAccountStore()
const router = useRouter()

accountStore.refreshOrders()
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