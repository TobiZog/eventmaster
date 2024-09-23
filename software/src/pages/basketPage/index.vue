<script setup lang="ts">
import { useBasketStore } from '@/data/stores/basketStore';
import productsTable from './productsTable.vue';
import alertBanner from '@/components/alertBanner.vue';
import cardView from '@/components/cardView.vue';
import { useUserStore } from '@/data/stores/userStore';
import orderingDialog from './orderingDialog.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { ref } from 'vue';

const basketStore = useBasketStore()
const userStore = useUserStore()
const showOrderingDialog = ref()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <alert-banner />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <card-view :title="$t('menu.basket')" prepend-icon="mdi-cart">
          <v-card-subtitle v-if="basketStore.itemsInBasket.length > 0">
            <div v-if="basketStore.itemsInBasket.length == 1">
              {{ basketStore.itemsInBasket.length }} {{ $t('product.product') }}
            </div>
            <div v-else>
              {{ basketStore.itemsInBasket.length }} {{ $t('product.products') }}
            </div>
          </v-card-subtitle>

          <products-table v-if="basketStore.itemsInBasket.length > 0" />

          <v-empty-state v-else
            icon="mdi-basket-off"
            :title="$t('emptyBasketTitle')"
            :text="$t('emptyBasketText')"
          />

          <v-card-text class="text-right text-h5" v-if="basketStore.itemsInBasket.length > 0">
            {{ $t('totalPrice') }}: {{ basketStore.getTotalPrice }} €
          </v-card-text>

          <template #actions>
            <outlined-button
              prepend-icon="mdi-basket-check"
              :disabled="basketStore.itemsInBasket.length == 0 || userStore.userAccount.id == null"
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