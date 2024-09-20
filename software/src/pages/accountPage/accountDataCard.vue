<script setup lang="ts">
import { useUserStore } from '@/data/stores/userStore';

const userStore = useUserStore()
</script>

<template>
  <v-card title="Account">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('account.username')"
            v-model="userStore.userAccount.username"
            disabled
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('account.password')"
            v-model="userStore.userAccount.password"
            type="password"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.firstName')"
            v-model="userStore.userAccount.firstName"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.lastName')"
            v-model="userStore.userAccount.lastName"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.street')"
            v-model="userStore.userAccount.street"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.houseNumber')"
            v-model="userStore.userAccount.houseNumber"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :label="$t('userInfo.postalCode')"
            v-model="userStore.userAccount.postalCode"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('userInfo.city')"
            v-model="userStore.userAccount.city"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-btn @click="userStore.updateAccount()" >Save</v-btn>
    </v-card-actions>
  </v-card>
</template>