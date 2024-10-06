<script setup lang="ts">
import { AccountModel } from '@/data/models/user/accountModel';
import { ref } from 'vue';
import cardView from '@/components/basics/cardView.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import { getEmailRules, getPasswordRules, getStringRules } from '@/scripts/validationRules';

const newUser = ref(new AccountModel())
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const accountStore = useAccountStore()
const registerInProgress = ref(false)

async function registerAccount() {
  registerInProgress.value = true

  await accountStore.registerAccount(newUser.value)
  registerInProgress.value = false
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
          :label="$t('account.username')"
          prepend-icon="mdi-account"
          v-model="newUser.username"
          clearable
          :rules="getStringRules()"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.password')"
          prepend-icon="mdi-key"
          type="password"
          v-model="newUser.password"
          clearable
          :rules="getPasswordRules()"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.email')"
          prepend-icon="mdi-mail"
          v-model="newUser.email"
          :rules="getEmailRules()"
          clearable
        />
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button
        prepend-icon="mdi-arrow-left" 
        @click="showRegisterCard = false"
        :disabled="registerInProgress"
      >
        {{ $t('account.backToLogin') }}
      </outlined-button>

      <outlined-button
        prepend-icon="mdi-account-plus"
        @click="registerAccount"
        :loading="registerInProgress"
      >
        {{ $t('account.register') }}
      </outlined-button>
    </template>
  </card-view>
</template>