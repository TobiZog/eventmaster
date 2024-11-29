<script setup lang="ts">
import dataLayout from '@/layouts/dataLayout.vue';
import { useAccountStore } from '@/stores/account.store';
import { useFeedbackStore } from '@/stores/feedback.store';
import PaymentEditDialog from './paymentEditDialog.vue';

const accountStore = useAccountStore()
const feedbackStore = useFeedbackStore()

const headers = [
  { title: feedbackStore.i18n.t('account.userData.bankName'), value: "bankName" },
  { title: feedbackStore.i18n.t('account.userData.iban'), value: "iban" },
  { title: "Aktionen", value: "actions", width: 130 }
]

accountStore.refreshAccount()
</script>

<template>
  <data-layout
    :add-button-string="$t('misc.actions.add')"
    :fetch-in-progress="accountStore.fetchInProgress"
    :on-add-click="() => { accountStore.newPayment() }"
  >
    <v-data-table
      :headers="headers"
      :items="accountStore.userAccount.payments"
      :loading="accountStore.fetchInProgress"
    >
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="accountStore.editPayment(item)"
        />

        <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="accountStore.removePayment(item)"
        />
      </template>
    </v-data-table>
  </data-layout>

  <payment-edit-dialog />
</template>