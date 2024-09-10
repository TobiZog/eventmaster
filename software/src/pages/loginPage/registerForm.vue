<script setup lang="ts">
import actionDialog from '@/components/actionDialog.vue';

const showRegisterDialog = defineModel("showRegisterDialog", { type: Boolean, required: true })
</script>

<template>
  <action-dialog v-model="showRegisterDialog" :title="$t('register')">
    <template #content>
      <v-row>
        <v-col>
          <v-text-field :label="$t('username')" prepend-icon="mdi-account" clearable />
        </v-col>

        <v-col>
          <v-text-field :label="$t('password')" prepend-icon="mdi-key" type="password" clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field :label="$t('userInfo.firstName')" prepend-icon="mdi-card-account-details" clearable />
        </v-col>

        <v-col>
          <v-text-field :label="$t('userInfo.lastName')" clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field :label="$t('userInfo.street')" prepend-icon="mdi-numeric" clearable />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('userInfo.houseNumber')"  clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field :label="$t('userInfo.postalCode')" prepend-icon="mdi-city" clearable />
        </v-col>
        <v-col>
          <v-text-field :label="$t('userInfo.city')" clearable />
        </v-col>
      </v-row>

    </template>

    <template #actions>
      <v-btn prepend-icon="mdi-account-plus" color="primary" variant="outlined">{{ $t('register') }}</v-btn>
    </template>
  </action-dialog>
</template>