<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useAccountStore } from '@/stores/account.store';
import { getEmailRules, getPasswordRules, getStringRules } from '@/scripts/validationRules';

const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const accountStore = useAccountStore()

async function registerAccount() {
  accountStore.registerAccount()
    .then(result => {
      console.log(result)
      if (result) {
        showRegisterCard.value = false
      }
    })
}
</script>

<template>
  <card-view
    :title="$t('account.register')"
    icon="mdi-account-plus"
  >
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.userData.username')"
          prepend-icon="mdi-account"
          v-model="accountStore.registerData.username"
          clearable
          variant="outlined"
          :rules="getStringRules()"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.userData.password')"
          prepend-icon="mdi-key"
          type="password"
          v-model="accountStore.registerData.password"
          clearable
          variant="outlined"
          :rules="getPasswordRules()"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.userData.email')"
          prepend-icon="mdi-mail"
          v-model="accountStore.registerData.email"
          :rules="getEmailRules()"
          variant="outlined"
          clearable
        />
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button
        prepend-icon="mdi-arrow-left" 
        @click="showRegisterCard = false"
        :disabled="accountStore.fetchInProgress"
      >
        {{ $t('account.login.backToLogin') }}
      </outlined-button>

      <outlined-button
        prepend-icon="mdi-account-plus"
        @click="registerAccount"
        :loading="accountStore.fetchInProgress"
        color="success"
      >
        {{ $t('account.register') }}
      </outlined-button>
    </template>
  </card-view>
</template>