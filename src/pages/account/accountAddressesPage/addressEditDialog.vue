<script setup lang="ts">
import actionDialog from '@/components/basics/actionDialog.vue';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { getIbanRules, getNumberStartRules, getPostalRules, getStringRules } from '@/scripts/validationRules';
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
    :title="$t('account.payments.editAddress')"
  >
    <v-container>
      <v-form v-model="valid">
        <v-row class="pt-5">
            <v-col>
              <v-text-field
                :label="$t('account.userData.street')"
                v-model="accountStore.address.street"
                :rules="getStringRules()"
                variant="outlined"
                clearable
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('account.userData.houseNumber')"
                v-model="accountStore.address.houseNumber"
                :rules="getNumberStartRules()"
                variant="outlined"
                clearable
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                :label="$t('account.userData.postalCode')"
                v-model="accountStore.address.postalCode"
                :rules="getPostalRules()"
                variant="outlined"
                clearable
              />
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('account.userData.placeOfResidence')"
                v-model="accountStore.address.city"
                :rules="getStringRules()"
                variant="outlined"
                clearable
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
        @click="accountStore.saveAddress"
      >
        {{ $t('misc.actions.save') }}
      </outlined-button>
    </template>
  </action-dialog>
</template>