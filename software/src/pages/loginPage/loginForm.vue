<script setup lang="ts">
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
      <a
        class="text-secondary text-decoration-none"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        {{ $t('noAccountRegister') }} <v-icon icon="mdi-chevron-right"/>
      </a>
    </v-card-text>
  </v-card>
</template>