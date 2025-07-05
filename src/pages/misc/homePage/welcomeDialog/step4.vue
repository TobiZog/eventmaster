<script setup lang="ts">
import { getRegisterNumberRules, getStringRules } from '@/scripts/validationRules';
import { usePreferencesStore } from '@/stores/preferences.store';

const preferencesStore = usePreferencesStore()
</script>

<template>
  <v-container class="px-0 py-2"  width="600">
    <v-row>
      <v-col class="text-h4 text-center">
        <v-icon icon="mdi-account" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-h4 text-center">
        {{ $t('misc.firstStartup.userData') }}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-alert color="warning" icon="mdi-alert">
          {{ $t('misc.firstStartup.enterYourPersonalData') }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          variant="outlined"
          :label="$t('misc.yourFullName')"
          v-model="preferencesStore.studentName"
          :rules="getStringRules(4)"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          variant="outlined"
          :label="$t('misc.registrationNumber')"
          v-model="preferencesStore.registrationNumber"
          :rules="getRegisterNumberRules()"
          hide-details
        />
      </v-col>
    </v-row>
  </v-container>
</template>