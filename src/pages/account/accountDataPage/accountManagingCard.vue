<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import confirmDialog from '@/components/basics/confirmDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useAccountStore } from '@/stores/account.store';
import { ref } from 'vue';

const showConfirmDialog = ref(false)
const accountStore = useAccountStore()
</script>

<template>
  <card-view
    :title="$t('account.accountManagement')"
    icon="mdi-account-edit"
  >
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
          prepend-icon="mdi-delete"
          color="error"
          :loading="accountStore.fetchInProgress"
          @click="showConfirmDialog = true"
        >
          {{ $t("account.deleteAccount.deleteAccount") }}
        </outlined-button>
      </v-col>

      <v-col class="d-flex justify-center align-center">
        <outlined-button
          prepend-icon="mdi-content-save"
          color="success"
          :loading="accountStore.fetchInProgress"
          @click="accountStore.updateAccount()"
        >
          {{ $t("misc.actions.save") }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>

  <confirm-dialog
    v-model="showConfirmDialog"
    :title="$t('account.deleteAccount.dialog.title')"
    :description="$t('account.deleteAccount.dialog.description')"
    :on-confirm="() => accountStore.deleteAccount(accountStore.userAccount)"
  />
</template>