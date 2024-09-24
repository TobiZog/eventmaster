<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import outlinedButton from '@/components/outlinedButton.vue';

const accountStore = useAccountStore()
</script>

<template>
  <card-view 
    icon="mdi-currency-usd"
    :title="$t('account.payments')"
  >
    <v-expansion-panels>
      <v-expansion-panel
        v-for="payment in accountStore.userAccount.payments"
        :title="payment.bankName"
        color="grey"
      >
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
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <template #actions>
      <outlined-button
        @click="accountStore.updateAccount()"
        prepend-icon="mdi-content-save"
        color="green"
      >
        Save
      </outlined-button>
    </template>
  </card-view>
</template>