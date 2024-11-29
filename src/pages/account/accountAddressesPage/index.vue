<script setup lang="ts">
import dataLayout from '@/layouts/dataLayout.vue';
import { useAccountStore } from '@/stores/account.store';
import { useFeedbackStore } from '@/stores/feedback.store';
import addressEditDialog from './addressEditDialog.vue';

const accountStore = useAccountStore()
const feedbackStore = useFeedbackStore()

const headers = [
  { title: feedbackStore.i18n.t('account.userData.street'), value: "street" },
  { title: feedbackStore.i18n.t('account.userData.houseNumber'), value: "houseNumber" },
  { title: feedbackStore.i18n.t('account.userData.postalCode'), value: "postalCode" },
  { title: feedbackStore.i18n.t('account.userData.placeOfResidence'), value: "city" },
  { title: "Aktionen", value: "actions", width: 130 }
]

accountStore.refreshAccount()
</script>

<template>
  <data-layout
    :add-button-string="$t('misc.actions.add')"
    :fetch-in-progress="accountStore.fetchInProgress"
    :on-add-click="() => { accountStore.newAddress() }"
  >
    <v-data-table
      :headers="headers"
      :items="accountStore.userAccount.addresses"
      :loading="accountStore.fetchInProgress"
    >
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="accountStore.editAddress(item)"
        />

        <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="accountStore.removeAddress(item)"
        />
      </template>
    </v-data-table>
  </data-layout>

  <address-edit-dialog />
</template>