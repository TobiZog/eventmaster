<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import outlinedButton from '@/components/outlinedButton.vue';
import { PaymentModel } from '@/data/models/paymentModel';

const accountStore = useAccountStore()

</script>

<template>
  <card-view 
    icon="mdi-currency-usd"
    :title="$t('account.payments')"
  >
    <v-expansion-panels
      v-if="accountStore.userAccount.payments.length > 0"
    >
      <v-expansion-panel
        v-for="payment in accountStore.userAccount.payments"
        color="primary"
      >
        <template #title>
          {{ payment.bankName }}
        </template>
        <template #text>
          <v-row class="pt-5">
            <v-col>
              <v-text-field
                :label="$t('userInfo.bankName')"
                v-model="payment.bankName"
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('userInfo.iban')"
                v-model="payment.iban"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-center align-center">
              <outlined-button
                @click="accountStore.removePayment(payment)"
                color="red"
                prepend-icon="mdi-delete"
              >
                {{ $t('remove') }}
              </outlined-button>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-empty-state
      v-else
      :title="$t('account.noPayments')"
      icon="mdi-currency-usd-off"
    />

    <template #actions>
      <outlined-button
        @click="accountStore.userAccount.payments.push(new PaymentModel())"
        prepend-icon="mdi-plus"
        color="green"
      >
        {{ $t('add') }}
      </outlined-button>
    </template>
  </card-view>
</template>