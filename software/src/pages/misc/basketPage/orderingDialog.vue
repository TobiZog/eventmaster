<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import { useBasketStore } from '@/stores/basket.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { ModelRef, ref } from 'vue';
import { useAccountStore } from '@/stores/account.store';

const basketStore = useBasketStore()
const accountStore = useAccountStore()
const showDialog: ModelRef<boolean> = defineModel()
const orderingInProgress = ref(false)
const addressError = ref(false)
const paymentError = ref(false)

async function doOrder() {
  orderingInProgress.value = true
  addressError.value = false
  paymentError.value = false

  if (basketStore.usedAddress == null) {
    addressError.value = true
  }

  if (basketStore.usedPayment == null){
    paymentError.value = true
  }

  if (basketStore.usedAddress != null && basketStore.usedPayment != null) {
    await basketStore.takeOrder()
    showDialog.value = false
  }
  
  orderingInProgress.value = false
}
</script>

<template>
  <action-dialog
    :title="$t('order.ordering')"
    icon="mdi-basket-check"
    v-model="showDialog"
    max-width="800"
    persistent
  >
    <v-radio-group class="pa-0" v-model="basketStore.usedAddress">
      <v-list-subheader>
        {{ $t('account.userData.address', accountStore.userAccount.addresses.length) }}
      </v-list-subheader>

      <v-list-item
        v-for="address in accountStore.userAccount.addresses"
      >
        
        <v-list-item-title>
          <v-radio :label="address.street + '' + address.houseNumber" />
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ address.postalCode }} {{ address.city }}
        </v-list-item-subtitle>

        <!-- <v-radio-group
          v-model="basketStore.usedAddress"
          :error="addressError"
        >
          <v-radio
            v-for="address in accountStore.userAccount.addresses"
            :value="address"
            :label="address.street + ' ' + address.houseNumber + ', ' + address.postalCode + ' ' + address.city"
            
          />
        </v-radio-group> -->
      </v-list-item>
    </v-radio-group>

    <v-list>
      <v-list-subheader>
        {{ $t('account.userData.payment', accountStore.userAccount.payments.length) }}
      </v-list-subheader>

      <v-list-item v-for="payment in accountStore.userAccount.payments">
        <template #prepend="{ isActive }">
          <v-list-item-action start>
            <v-radio :model-value="isActive" />
          </v-list-item-action>
        </template>

        <v-list-item-title>{{ payment.bankName }}</v-list-item-title>

        <v-list-item-subtitle>{{ payment.iban }}</v-list-item-subtitle>
        <!-- <v-radio-group
          v-model="basketStore.usedPayment"
        >
          <v-radio
            
            :value="payment"
            :label="payment.bankName + ': ' + payment.iban"
            :error="paymentError"
          />
        </v-radio-group> -->
      </v-list-item>
    </v-list>

    <template #actions>
      <outlined-button 
        @click="showDialog = false"
        prepend-icon="mdi-close"
        color="orange"
        :disabled="orderingInProgress"
      >
        {{ $t('misc.actions.cancel') }}
      </outlined-button>

      <outlined-button
        @click="doOrder"
        :loading="orderingInProgress"
        prepend-icon="mdi-send"
        color="green"
      >
        {{ $t('order.takeOrder') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>