<script setup lang="ts">
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { useAccountStore } from '@/data/stores/accountStore';

const accountStore = useAccountStore()
</script>

<template>
  <card-view
    :title="$t('account.masterData')"
    icon="mdi-account"
  >
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