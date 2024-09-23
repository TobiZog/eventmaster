<script setup lang="ts">
import { AccountModel } from '@/data/models/accountModel';
import { useUserStore } from '@/data/stores/userStore';
import { ref } from 'vue';
import cardView from '@/components/cardView.vue';
import outlinedButton from '@/components/outlinedButton.vue';

const newUser = ref(new AccountModel())
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
const userStore = useUserStore()
</script>

<template>
  <card-view :title="$t('account.register')">
    <v-container>
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
            v-model="newUser.street"
            clearable
          />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('userInfo.houseNumber')" v-model="newUser.houseNumber" clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            :label="$t('userInfo.postalCode')"
            prepend-icon="mdi-city"
            v-model="newUser.postalCode"
            clearable
          />
        </v-col>
        <v-col>
          <v-text-field :label="$t('userInfo.city')" v-model="newUser.city" clearable />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <outlined-button
        prepend-icon="mdi-arrow-left" 
        @click="showRegisterCard = false"
      >
        {{ $t('account.backToLogin') }}
      </outlined-button>

      <outlined-button
        prepend-icon="mdi-account-plus"
        @click="userStore.registerAccount(newUser)"
      >
        {{ $t('account.register') }}
      </outlined-button>
    </template>
  </card-view>
</template>