<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { useAccountStore } from '@/data/stores/accountStore';

const accountStore = useAccountStore()
</script>

<template>
  <card-view title="Account">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('account.username')"
            v-model="accountStore.userAccount.username"
            disabled
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('account.password')"
            v-model="accountStore.userAccount.password"
            type="password"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.firstName')"
            v-model="accountStore.userAccount.firstName"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.lastName')"
            v-model="accountStore.userAccount.lastName"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.street')"
            v-model="accountStore.userAccount.addresses[0].street"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.houseNumber')"
            v-model="accountStore.userAccount.addresses[0].houseNumber"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.postalCode')"
            v-model="accountStore.userAccount.addresses[0].postalCode"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.city')"
            v-model="accountStore.userAccount.addresses[0].city"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.bankName')"
            v-model="accountStore.userAccount.payments[0].bankName"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.iban')"
            v-model="accountStore.userAccount.payments[0].iban"
          />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <outlined-button
        @click="accountStore.updateAccount()"
        prepend-icon="mdi-content-save"
        color="green"
      >
        Save
      </outlined-button>
    </template>
  </card-view>
</template>