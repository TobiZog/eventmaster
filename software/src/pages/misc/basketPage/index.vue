<script setup lang="ts">
import { useBasketStore } from '@/stores/basket.store';
import cardView from '@/components/basics/cardView.vue';
import orderingDialog from './orderingDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { ref } from 'vue';
import { useAccountStore } from '@/stores/account.store';
import ticketsTable from './ticketsTable.vue';

const basketStore = useBasketStore()
const accountStore = useAccountStore()
const showOrderingDialog = ref()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <card-view
          :title="$t('basket')"
          :subtitle="basketStore.itemsInBasket.length + ' ' + 
            $tc('product.product', basketStore.itemsInBasket.length)"
          v-model="showOrderingDialog"
          icon="mdi-cart"
        >
          <!-- Display items if basket is not empty -->
          <tickets-table v-if="basketStore.itemsInBasket.length > 0"/>

          <!-- Display empty state if card is empty -->
          <v-empty-state v-else
            icon="mdi-basket-off"
            :title="$t('emptyBasketTitle')"
            :text="$t('emptyBasketText')"
          />

          <v-card-text class="text-right text-h5" v-if="basketStore.itemsInBasket.length > 0">
            {{ $t('totalPrice') }}: {{ (basketStore.getTotalPrice).toFixed(2) }} €
          </v-card-text>
          

          <template #actions>
            <outlined-button
              prepend-icon="mdi-basket-check"
              :disabled="basketStore.itemsInBasket.length == 0 || accountStore.userAccount.id == null"
              variant="outlined"
              color="green"
              @click="showOrderingDialog = true"
            >
              {{ $t('orderNow') }}
            </outlined-button>
          </template>
        </card-view>
      </v-col>
    </v-row>
  </v-container>

  <ordering-dialog v-model="showOrderingDialog" />
</template>