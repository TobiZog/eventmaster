<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import confirmDialog from '@/components/confirmDialog.vue';
import { ref } from 'vue';

const showConfirmDialog = ref(false)

function deleteAccount() {
  // todo
}
</script>

<template>
  <card-view :title="$t('account.managingAccount')">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-btn
            prepend-icon="mdi-delete"
            variant="outlined"
            color="red"
            @click="showConfirmDialog = true"
          >
            {{ $t("account.delete") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </card-view>

  <confirm-dialog
    v-model="showConfirmDialog"
    :title="$t('dialog.deleteAccount.title')"
    :description="$t('dialog.deleteAccount.description')"
    :onConfirm="deleteAccount"
  />
</template>