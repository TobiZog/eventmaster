<script setup lang="ts">
const showRegisterCard = defineModel("showRegisterCard", { type: Boolean, default: false })
</script>

<template>
  <v-card :title="$t('menu.login')" prepend-icon="mdi-login" elevation="8">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field :label="$t('username')" prepend-icon="mdi-account" clearable />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field :label="$t('password')" prepend-icon="mdi-key" type="password" clearable />
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-btn variant="outlined" @click="showRegisterCard = true" color="primary" prepend-icon="mdi-plus">
        {{ $t('noAccountRegister') }}
      </v-btn>
      <v-spacer />
      <v-btn variant="outlined" append-icon="mdi-arrow-right" color="primary">{{ $t('login') }}</v-btn>
    </v-card-actions>

  </v-card>
</template>