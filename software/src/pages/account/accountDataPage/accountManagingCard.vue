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
    :title="$t('account.managingAccount')"
    icon="mdi-account-edit"
  >
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <outlined-button
          prepend-icon="mdi-delete"
          color="red"
          :loading="accountStore.fetchInProgress"
          @click="showConfirmDialog = true"
        >
          {{ $t("account.delete") }}
        </outlined-button>
      </v-col>

      <v-col class="d-flex justify-center align-center">
        <outlined-button
          prepend-icon="mdi-content-save"
          color="green"
          :loading="accountStore.fetchInProgress"
          @click="accountStore.updateAccount()"
        >
          {{ $t("save") }}
        </outlined-button>
      </v-col>
    </v-row>
  </card-view>

  <confirm-dialog
    v-model="showConfirmDialog"
    :title="$t('dialog.deleteAccount.title')"
    :description="$t('dialog.deleteAccount.description')"
  />
    <!-- todo :onConfirm="deleteAccount" -->
</template>