<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useAccountStore } from '@/stores/account.store';
import { getEmailRules, getPasswordRules, getStringRules } from '@/scripts/validationRules';
import { useRouter } from 'vue-router';

const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const accountStore = useAccountStore()
const router = useRouter()

async function registerAccount() {
  accountStore.registerAccount()
    .then(result => {
      if (result) {
        router.push("/account/home")
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
      >
        {{ $t('account.register') }}
      </outlined-button>
    </template>
  </card-view>
</template>