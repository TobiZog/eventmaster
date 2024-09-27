<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import confirmDialog from '@/components/confirmDialog.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { ref } from 'vue';

const showConfirmDialog = ref(false)

function deleteAccount() {
  // todo
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
    </v-row>
  </card-view>

  <confirm-dialog
    v-model="showConfirmDialog"
    :title="$t('dialog.deleteAccount.title')"
    :description="$t('dialog.deleteAccount.description')"
    :onConfirm="deleteAccount"
  />
</template>