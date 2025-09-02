<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store';
import dataLayout from '@/layouts/dataLayout.vue';
import { useFeedbackStore } from '@/stores/feedback.store';

const accountStore = useAccountStore()
const feedbackStore = useFeedbackStore()

const headers = [
  { title: feedbackStore.i18n.t('account.userData.username'), value: "username" },
  { title: feedbackStore.i18n.t('account.userData.email'), value: "email" },
  { title: feedbackStore.i18n.t('account.userData.firstName'), value: "firstName" },
  { title: feedbackStore.i18n.t('account.userData.lastName'), value: "lastName" },
  { title: feedbackStore.i18n.t('account.accountRole'), value: "accountRole.name" },
  { title: "", value: "edit", width: 130 }
]

accountStore.getAllAccounts()
</script>

<template>
  <data-layout
    :add-button-string="$t('account.addNewAccount')"
    :fetch-in-progress="accountStore.fetchInProgress"
  >
    <v-data-table
      :items="accountStore.accounts"
      :loading="accountStore.fetchInProgress"
      :headers="headers"
    >
      <template #item.edit="{ item }">
        <!-- todo <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="accountStore.editAccount(item)"
        /> -->

        <!-- todo <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="accountStore.deleteAccount(item)"
        /> -->
      </template>
    </v-data-table>
  </data-layout>
</template>