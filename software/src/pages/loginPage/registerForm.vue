<script setup lang="ts">
import { AccountModel } from '@/data/models/accountModel';
import { ref } from 'vue';
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';
import { useAccountStore } from '@/data/stores/accountStore';

const newUser = ref(new AccountModel())
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const accountStore = useAccountStore()
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
        />
      </v-col>

      <v-col>
        <v-text-field
          :label="$t('account.password')"
          prepend-icon="mdi-key"
          type="password"
          v-model="newUser.password"
          clearable
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
        />
      </v-col>

      <v-col>
        <v-text-field :label="$t('userInfo.lastName')" v-model="newUser.lastName" clearable />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          :label="$t('userInfo.street')"
          prepend-icon="mdi-numeric"
          v-model="newUser.addresses[0].street"
          clearable
        />
      </v-col>
      <v-col cols="4">
        <v-text-field :label="$t('userInfo.houseNumber')" v-model="newUser.addresses[0].houseNumber" clearable />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field
          :label="$t('userInfo.postalCode')"
          prepend-icon="mdi-city"
          v-model="newUser.addresses[0].postalCode"
          clearable
        />
      </v-col>
      <v-col>
        <v-text-field :label="$t('userInfo.city')" v-model="newUser.addresses[0].city" clearable />
      </v-col>
    </v-row>

    <template #actions>
      <outlined-button
        prepend-icon="mdi-arrow-left" 
        @click="showRegisterCard = false"
      >
        {{ $t('account.backToLogin') }}
      </outlined-button>

      <outlined-button
        prepend-icon="mdi-account-plus"
        @click="accountStore.registerAccount(newUser)"
      >
        {{ $t('account.register') }}
      </outlined-button>
    </template>
  </card-view>
</template>