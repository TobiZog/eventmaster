<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useAccountStore } from '@/stores/account.store';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { PaymentModel } from '@/data/models/user/paymentModel';
import { getIbanRules, getStringRules } from '@/scripts/validationRules';
import cardViewOneLine from '@/components/basics/cardViewOneLine.vue';

const accountStore = useAccountStore()
</script>

<template>
  <card-view 
    icon="mdi-currency-usd"
    :title="$t('account.userData.payment')"
  >
    <v-row>
      <v-col>
        <card-view-one-line
          color="amber"
          prepend-icon="mdi-alert"
          :title="$t('account.noRealPaymentsNeeded')"
        />
      </v-col>
    </v-row>

    <v-row v-if="accountStore.userAccount.payments.length > 0">
      <v-col>
        <v-expansion-panels>
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
                    :label="$t('account.userData.bankName')"
                    v-model="payment.bankName"
                    :rules="getStringRules()"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('account.userData.iban')"
                    v-model="payment.iban"
                    :rules="getIbanRules()"
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
                    {{ $t('misc.actions.remove') }}
                  </outlined-button>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-empty-state
          :title="$t('account.noPayments')"
          icon="mdi-currency-usd-off"
        />
      </v-col>
    </v-row>



    <template #actions>
      <outlined-button
        @click="accountStore.userAccount.payments.push(new PaymentModel())"
        prepend-icon="mdi-plus"
        color="green"
      >
        {{ $t('misc.actions.add') }}
      </outlined-button>
    </template>
  </card-view>
</template>