<script setup lang="ts">
</script>

<template>
  <v-app-bar-title class="pr-5">
    <!-- todo: Brand logo -->
    <v-btn variant="plain" to="/" flat>HackMyCart</v-btn>
  </v-app-bar-title>

  <v-divider vertical />

  <v-btn
    to="/shows/events"
    prepend-icon="mdi-ticket"
    height="100%"
    :rounded="false"
  >
    {{ $t('menu.shopping.allEvents', 2) }}
  </v-btn>

  <v-divider vertical />


  <v-btn
    variant="text"
    to="/shows/locations"
    prepend-icon="mdi-city"
    height="100%"
    :rounded="false"
  >
    {{ $t('menu.shopping.allLocations', 2) }}
  </v-btn>

  <v-divider vertical />


  <v-btn
    variant="text"
    to="/shows/genres"
    prepend-icon="mdi-music-clef-treble"
    height="100%"
    :rounded="false"
  >
    {{ $t('menu.shopping.allGenres', 2) }}
  </v-btn>

  <v-divider vertical />
</template>