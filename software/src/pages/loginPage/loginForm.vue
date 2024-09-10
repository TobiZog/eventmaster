<script setup lang="ts">
const showRegisterDialog = defineModel("showRegisterDialog", { type: Boolean, default: false })
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

      <v-row>
        <v-col>
          <!-- todo -->
          <v-btn prepend-icon="mdi-send" color="primary" block>{{ $t('login') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-card-text class="text-center">
      <v-btn flat append-icon="mdi-chevron-right" @click="showRegisterDialog = true">
        {{ $t('noAccountRegister') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>