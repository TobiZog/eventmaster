<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import confirmDialog from '@/components/basics/confirmDialog.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useAccountStore } from '@/stores/account.store';
import { ref } from 'vue';

const showConfirmDialog = ref(false)
const updateInProgress = ref(false)
const accountStore = useAccountStore()

function deleteAccount() {
  // todo
}

async function updateAccount() {
  updateInProgress.value = true

  await accountStore.updateAccount()

  updateInProgress.value = false
}
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
          @click="showConfirmDialog = true"
        >
          {{ $t("account.delete") }}
        </outlined-button>
      </v-col>

      <v-col class="d-flex justify-center align-center">
        <outlined-button
          prepend-icon="mdi-content-save"
          color="green"
          @click="updateAccount"
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
    :onConfirm="deleteAccount"
  />
</template>