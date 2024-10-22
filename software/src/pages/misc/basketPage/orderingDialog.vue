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
    :title="$t('ordering.ordering')"
    icon="mdi-basket-check"
    v-model="showDialog"
    max-width="800"
    persistent
  >
    <v-list class="pa-0">
      <v-list-subheader>
        {{ $t('account.address', accountStore.userAccount.addresses.length) }}
      </v-list-subheader>

      <v-list-item>
        <v-radio-group
          v-model="basketStore.usedAddress"
          :error="addressError"
        >
          <v-radio
            v-for="address in accountStore.userAccount.addresses"
            :value="address"
            :label="address.street + ' ' + address.houseNumber + ', ' + address.postalCode + ' ' + address.city"
            
          />
        </v-radio-group>
      </v-list-item>

      <v-list-subheader>
        {{ $t('account.payment', accountStore.userAccount.payments.length) }}
      </v-list-subheader>

      <v-list-item>
        <v-radio-group
          v-model="basketStore.usedPayment"
        >
          <v-radio
            v-for="payment in accountStore.userAccount.payments"
            :value="payment"
            :label="payment.bankName + ': ' + payment.iban"
            :error="paymentError"
          />
        </v-radio-group>
      </v-list-item>
    </v-list>

    <template #actions>
      <outlined-button 
        @click="showDialog = false"
        prepend-icon="mdi-close"
        color="orange"
        :disabled="orderingInProgress"
      >
        {{ $t('dialog.cancel') }}
      </outlined-button>

      <outlined-button
        @click="doOrder"
        :loading="orderingInProgress"
        prepend-icon="mdi-send"
        color="green"
      >
        {{ $t('ordering.takeOrder') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>