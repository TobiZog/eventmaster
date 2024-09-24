<script setup lang="ts">
import { AccountModel } from '@/data/models/accountModel';
import { ref } from 'vue';
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import { i18n } from '@/plugins/i18n';
import { useFeedbackStore } from '@/data/stores/feedbackStore';

const newUser = ref(new AccountModel())
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const accountStore = useAccountStore()
const feedbackStore = useFeedbackStore()
const registerInProgress = ref(false)

const stringRules = [
  value => {
    if (value) {
      return true
    } else {
      return feedbackStore.i18n.t('required')
    }
  },
  value => {
    if (/[^0-9]/.test(value)) {
      return true
    } else {
      return feedbackStore.i18n.t('noDigitsAllowed')
    }
  },
  value => {
    if (value?.length >= 4) {
      return true
    } else {
      return feedbackStore.i18n.t('notEnoughChars')
    }
  }
]

const passwordRules = [
  value => {
    if (value) {
      return true
    } else {
      return feedbackStore.i18n.t('required')
    }
  },
  value => {
    if (value?.length >= 8) {
      return true
    } else {
      return feedbackStore.i18n.t('passwordToShort')
    }
  }
]

const postalRules = [
  value => {
    if (/[0-9]/.test(value)) {
      return true
    } else {
      return feedbackStore.i18n.t('onlyDigitsAllowed')
    }
  },
  value => {
    if (value?.length == 5) {
      return true
    } else {
      return feedbackStore.i18n.t('notEnoughChars')
    }
  }
]

const numberRules = [
  value => {
    if (value) {
      return true
    } else {
      return feedbackStore.i18n.t('required')
    }
  },
  value => {
    if (/[0-9]/.test(value)) {
      return true
    } else {
      return feedbackStore.i18n.t('onlyDigitsAllowed')
    }
  },
]

async function registerAccount() {
  registerInProgress.value = true

  await accountStore.registerAccount(newUser.value)
  registerInProgress.value = false
}
</script>

<template>
  <card-view :title="$t('account.register')">
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.username')"
          prepend-icon="mdi-account"
          v-model="newUser.username"
          clearable
          :rules="stringRules"
        />
      </v-col>

      <v-col>
        <v-text-field
          :label="$t('account.password')"
          prepend-icon="mdi-key"
          type="password"
          v-model="newUser.password"
          clearable
          :rules="passwordRules"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('userInfo.firstName')"
          prepend-icon="mdi-card-account-details"
          v-model="newUser.firstName"
          clearable
          :rules="stringRules"
        />
      </v-col>

      <v-col>
        <v-text-field
          :label="$t('userInfo.lastName')"
          v-model="newUser.lastName"
          clearable
          :rules="stringRules"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('userInfo.street')"
          prepend-icon="mdi-numeric"
          v-model="newUser.addresses[0].street"
          clearable
          :rules="stringRules"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          :label="$t('userInfo.houseNumber')"
          v-model="newUser.addresses[0].houseNumber"
          clearable
          :rules="numberRules"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field
          :label="$t('userInfo.postalCode')"
          prepend-icon="mdi-city"
          v-model="newUser.addresses[0].postalCode"
          clearable
          :rules="postalRules"
        />
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('userInfo.city')"
          v-model="newUser.addresses[0].city"
          clearable
          :rules="stringRules"
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