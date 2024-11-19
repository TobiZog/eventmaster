<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import { useBasketStore } from '@/stores/basket.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { ModelRef, ref } from 'vue';
import { useAccountStore } from '@/stores/account.store';
import { AddressModel } from '@/data/models/user/addressModel';
import { PaymentModel } from '@/data/models/user/paymentModel';

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

function addressItemProps(item: AddressModel) {
  return {
    title: item.street + " " + item.houseNumber,
    subtitle: item.postalCode + " " + item.city
  }
}

function paymentItemProps(item: PaymentModel) {
  return {
    title: item.bankName,
    subtitle: item.iban
  }
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
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="basketStore.usedAddress"
            :items="accountStore.userAccount.addresses"
            :item-props="addressItemProps"
            :label="$t('account.userData.address')"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="basketStore.usedPayment"
            :items="accountStore.userAccount.payments"
            :item-props="paymentItemProps"
            :label="$t('account.userData.payment')"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>
    </v-container>

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