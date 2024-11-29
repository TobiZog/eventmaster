<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { getIbanRules, getStringRules } from '@/scripts/validationRules';
import { useAccountStore } from '@/stores/account.store';
import cardViewOneLine from '@/components/basics/cardViewOneLine.vue';
import { ref } from 'vue';

const valid = ref(false)

const accountStore = useAccountStore()
</script>

<template>
  <action-dialog
    v-model="accountStore.showEditDialog"
    max-width="800"
    :title="$t('account.payments.editPayment')"
  >
    <v-container>
      <v-row>
        <v-col>
          <card-view-one-line
            color="warning"
            prepend-icon="mdi-alert"
            :title="$t('account.noRealPaymentsNeeded')"
          />
        </v-col>
      </v-row>

      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('account.userData.bankName')"
              v-model="accountStore.payment.bankName"
              :rules="getStringRules(8)"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :label="$t('account.userData.iban')"
              v-model="accountStore.payment.iban"
              :rules="getIbanRules()"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-form>

    </v-container>

    <template #actions>
      <outlined-button
        color="success"
        prepend-icon="mdi-content-save"
        :disabled="!valid"
        :loading="accountStore.fetchInProgress"
        @click="accountStore.savePayment"
      >
        {{ $t('misc.actions.save') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>