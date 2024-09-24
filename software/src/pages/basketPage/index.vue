<script setup lang="ts">
import { useBasketStore } from '@/data/stores/basketStore';
import productsTable from './productsTable.vue';
import cardView from '@/components/cardView.vue';
import orderingDialog from './orderingDialog.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { ref } from 'vue';
import { useAccountStore } from '@/data/stores/accountStore';

const basketStore = useBasketStore()
const accountStore = useAccountStore()
const showOrderingDialog = ref()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <card-view
          :title="$t('menu.basket')"
          :subtitle="basketStore.itemsInBasket.length + ' ' + 
            $tc('product.product', basketStore.itemsInBasket.length)"
          v-model="showOrderingDialog"
          icon="mdi-cart"
        >
          <template #withoutContainer>
            <!-- Display items if card is not empty -->
            <products-table v-if="basketStore.itemsInBasket.length > 0" />

            <!-- Display empty state if card is empty -->
            <v-empty-state v-else
              icon="mdi-basket-off"
              :title="$t('emptyBasketTitle')"
              :text="$t('emptyBasketText')"
            />

            <v-card-text class="text-right text-h5" v-if="basketStore.itemsInBasket.length > 0">
              {{ $t('totalPrice') }}: {{ basketStore.getTotalPrice }} €
            </v-card-text>
          </template>

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