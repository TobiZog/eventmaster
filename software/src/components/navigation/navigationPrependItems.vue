<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <v-card
    :link="true"
    rounded="0"
    elevation="0"
    class="mr-5"
    to="/"
  >
    <v-img src="logo.png" width="80" />
  </v-card>

  <v-divider vertical />

  <v-btn
    to="/bands"
    prepend-icon="mdi-guitar-electric"
    height="100%"
    :rounded="false"
  >
    {{ $t('band.allBands', 2) }}
  </v-btn>

  <v-divider vertical />

  <v-btn
    to="/concerts"
    prepend-icon="mdi-ticket"
    height="100%"
    :rounded="false"
  >
    {{ $t('concert.allConcerts', 2) }}
  </v-btn>

  <v-divider vertical />


  <v-btn
    to="/locations"
    prepend-icon="mdi-city"
    height="100%"
    :rounded="false"
  >
    {{ $t('location.allLocations', 2) }}
  </v-btn>

  <v-divider vertical />
</template>