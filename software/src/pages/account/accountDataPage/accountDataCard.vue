<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useAccountStore } from '@/data/stores/accountStore';
import { useFeedbackStore } from '@/data/stores/feedbackStore';

const accountStore = useAccountStore()
const feedbackStore = useFeedbackStore()

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
    if (value?.length >= 3) {
      return true
    } else {
      return feedbackStore.i18n.t('notEnoughChars')
    }
  }
]
</script>

<template>
  <card-view
    :title="$t('account.masterData')"
    icon="mdi-account"
  >
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.email')"
          v-model="accountStore.userAccount.email"
          disabled
        />
      </v-col>
    </v-row>
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
          :rules="passwordRules"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('userInfo.firstName')"
          v-model="accountStore.userAccount.firstName"
          :rules="stringRules"
        />
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('userInfo.lastName')"
          v-model="accountStore.userAccount.lastName"
          :rules="stringRules"
        />
      </v-col>
    </v-row>
  </card-view>
</template>