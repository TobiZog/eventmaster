<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useAccountStore } from '@/stores/account.store';
import { useFeedbackStore } from '@/stores/feedback.store';

const accountStore = useAccountStore()
const feedbackStore = useFeedbackStore()

const passwordRules = [
  value => {
    if (value) {
      return true
    } else {
      return feedbackStore.i18n.t('misc.validation.required')
    }
  },
  value => {
    if (value?.length >= 8) {
      return true
    } else {
      return feedbackStore.i18n.t('misc.validation.notEnoughChars')
    }
  }
]

const stringRules = [
  value => {
    if (value) {
      return true
    } else {
      return feedbackStore.i18n.t('misc.validation.required')
    }
  },
  value => {
    if (/[^0-9]/.test(value)) {
      return true
    } else {
      return feedbackStore.i18n.t('misc.validation.noDigitsAllowed')
    }
  },
  value => {
    if (value?.length >= 3) {
      return true
    } else {
      return feedbackStore.i18n.t('misc.validation.notEnoughChars')
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
          :label="$t('account.userData.email')"
          v-model="accountStore.userAccount.email"
          variant="outlined"
          hide-details
          disabled
        />
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('account.userData.username')"
          v-model="accountStore.userAccount.username"
          variant="outlined"
          hide-details
          disabled
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('account.userData.firstName')"
          v-model="accountStore.userAccount.firstName"
          variant="outlined"
          :rules="stringRules"
        />
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('account.userData.lastName')"
          v-model="accountStore.userAccount.lastName"
          variant="outlined"
          :rules="stringRules"
        />
      </v-col>
    </v-row>
  </card-view>
</template>